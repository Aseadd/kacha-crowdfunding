import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useAddFavouriteMutation,
  useCampaignByIdMutation,
  useCurrenciesMutation,
  useCurrentTimeMutation,
  useRemoveFavouriteMutation,
} from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import {
  ICampaignFullInfo,
  ICampaignResponse,
  ICurrency,
  ICurrencyResponse,
} from "src/model/campaign";
import { ICommentWithUser } from "src/model/comment";
import { IDonateInputData } from "src/model/donate";
import { selectAuth } from "src/store/states/auth";
import { openLoginModal } from "src/store/states/modal";
import { selectTags } from "src/store/states/tag";
import Helper from "src/utilities/helper";
import donateValidator from "src/validator/donate";

export default function useDonate() {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IDonateInputData>({
    resolver: yupResolver(donateValidator),
  });
  const auth = useSelector(selectAuth);
  const [addFavouriteAction] = useAddFavouriteMutation();
  const [removeFavouriteAction] = useRemoveFavouriteMutation();
  const { showError, showSuccess } = useNotificationContext();
  const id = useParams().id ?? "";
  const [campaign, setCampaign] = useState<ICampaignFullInfo>();
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [date, setDate] = useState<string>(new Date().toUTCString());
  const [campaignByIdAction] = useCampaignByIdMutation();
  const [currencyAction] = useCurrenciesMutation();
  const [currentTimeAction] = useCurrentTimeMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCampaign();
    fetchCurrency();
    // eslint-disable-next-line
  }, [id]);

  const fetchCurrentTime = async () => {
    try {
      const response = await currentTimeAction("").unwrap();
      setDate(response?.datetime ?? new Date().toUTCString());
    } catch (error) {}
  };

  const fetchCampaign = async () => {
    try {
      const response: ICampaignResponse = await campaignByIdAction(id).unwrap();
      const comments = organizeComment(response.data.comments);
      setCampaign({ ...response.data, comments });
      fetchCurrentTime();
    } catch (error: any) {
      showError({ message: error?.data?.detail ?? "Network error" });
    }
  };

  const fetchCurrency = async () => {
    try {
      const response: ICurrencyResponse = await currencyAction("").unwrap();
      setCurrencies(response.data);
      setValue("currency", response.data[0].currency_code);
    } catch (error: any) {
      showError({ message: error?.data?.detail ?? "Network error" });
    }
  };

  const organizeComment = (data: ICommentWithUser[]) => {
    const temp: { [key: string]: ICommentWithUser } = {};
    for (let comment of data) {
      temp[comment._id] = { ...comment, replies: [] };
    }
    for (let key in temp) {
      const parentId = temp[key].parent_id;
      if (parentId && temp[parentId]) temp[parentId].replies.push(temp[key]);
    }
    const comments: ICommentWithUser[] = [];
    for (let key in temp) if (!temp[key].isReply) comments.push(temp[key]);
    return comments;
  };

  const handleAddToFavourite = async () => {
    try {
      if (campaign?.is_favourite) {
        const { message } = await removeFavouriteAction(id).unwrap();
        setCampaign((prev) => ({ ...prev!, is_favourite: false }));
        showSuccess({ message });
      } else {
        const { message } = await addFavouriteAction(id).unwrap();
        setCampaign((prev) => ({ ...prev!, is_favourite: true }));
        showSuccess({ message });
      }
    } catch (error: any) {
      showError({ message: error?.data?.detail ?? "Something went wrong" });
    }
  };

  const [openProcess, setOpenProcess] = useState<boolean>(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const tags = useSelector(selectTags);

  const handleOpenProcess = () => {
    if (!auth.isLoggedIn) {
      dispatch(openLoginModal());
      showError({ message: "You must be logged in first." });
    } else setOpenProcess(true);
  };
  const handleCloseProcess = () => setOpenProcess(false);
  const handleOpenConfirmation = () => setOpenConfirmation(true);
  const handleCloseConfirmation = () => setOpenConfirmation(false);
  const onSubmit = (_: IDonateInputData) => handleOpenConfirmation();
  const tag = useMemo(
    () => tags.find((value) => value._id === campaign?.tag_id),
    [campaign, tags]
  );
  const handleShare = async () => {
    const response = await Helper.handleCopy(window.location.href);
    if (response.status === "error") showError({ message: response.message });
    else showSuccess({ message: "Link copied to clipboard successfully" });
  };

  return {
    handleShare,
    handleCloseConfirmation,
    handleCloseProcess,
    onSubmit,
    tag,
    handleOpenProcess,
    openConfirmation,
    openProcess,
    handleAddToFavourite,
    control,
    handleSubmit,
    errors,
    getValues,
    setValue,
    campaign,
    currencies,
    auth,
    date,
    fetchCampaign,
  };
}
