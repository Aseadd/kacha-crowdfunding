import { yupResolver } from "@hookform/resolvers/yup";
import { getOrientation } from "get-orientation/browser";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation, useGetUserMutation, useRemoveProfileImageMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { IUserUpdateInput, IUserResponse, IUser, IUpdateInput } from "src/model/auth";
import { selectAuth, setAuth, updateUser } from "src/store/states/auth";
import Helper from "src/utilities/helper";
import { getRotatedImage } from "src/utilities/image";
import userUpdateValidator from "src/validator/userUpdate";

const ORIENTATION_TO_ANGLE: { [key: string]: number } = {
    "3": 180,
    "6": 90,
    "8": -90,
};

export default function useProfile() {
    const dispatch = useDispatch();
    const { user } = useSelector(selectAuth);
    const { showError, showSuccess } = useNotificationContext();
    const [updateProfileApi, { isLoading }] = useUpdateProfileMutation();
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [changeProfile, setChangeProfile] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [getUserInfo] = useGetUserMutation();
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [updateProfileImageAction, { isLoading: removeProfileLoading }] = useRemoveProfileImageMutation();
    const { control, handleSubmit, setValue } = useForm<IUserUpdateInput>({
        resolver: yupResolver(userUpdateValidator),
        defaultValues: {
            email: user?.email,
            address: user?.address,
            phone: user?.phone,
            fullName: `${user?.firstname ?? ""} ${user?.lastname ?? ""} ${user?.middlename ?? ""}`,
        },
    });

    useEffect(() => {
        if (user?.firstname) setLoading(false);
        else fetchUserInfo();
        // eslint-disable-next-line
    }, []);

    const fetchUserInfo = async () => {
        try {
            const { data }: IUserResponse = await getUserInfo(Helper.userId() ?? "").unwrap();
            if (data) {
                setLoading(false);
                setUser(data);
            }
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };

    const setUser = (data: IUser) => {
        dispatch(setAuth(data));
        setValue("address", data.address);
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("fullName", `${data?.firstname ?? ""} ${data?.lastname ?? ""} ${data?.middlename ?? ""}`);
    };

    const onSubmit = async (input: IUserUpdateInput) => {
        try {
            const query = convertToUpdateData(input);
            console.log(query);
            const response: IUserResponse = await updateProfileApi(query).unwrap();
            setUser(response.data);
            dispatch(updateUser(response.data));
            showSuccess({ message: "Successfully Updated" });
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Something went wrong" });
        }
    };

    const convertToUpdateData = (input: IUserUpdateInput): IUpdateInput => {
        const fullName = Helper.disperseFullName(input.fullName);
        return {
            email: input.email,
            phone: Helper.formatPhone(input.phone),
            address: input.address,
            ...fullName,
            channel: "WEB",
        };
    };
    const handleOpenChangePassword = () => setChangePassword(true);
    const handleCloseChangePassword = () => setChangePassword(false);
    const handleCloseChangeProfile = () => setChangeProfile(false);
    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl: string = await readFile(file);

            try {
                // apply rotation if needed
                const orientation = await getOrientation(file);
                const rotation = ORIENTATION_TO_ANGLE[orientation];
                if (rotation) {
                    imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
                }
            } catch (e) {
                showError({ message: "failed to detect the orientation" });
            }

            setImageSrc(imageDataUrl);
            setChangeProfile(true);
        }
    };
    const readFile = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result as string), false);
            reader.readAsDataURL(file);
        });
    };
    const removeProfileImage = async () => {
        const response: IUserResponse = await updateProfileImageAction("").unwrap();
        console.log(response);
    };
    return {
        loading,
        user,
        onFileChange,
        imageSrc,
        changeProfile,
        handleCloseChangeProfile,
        removeProfileImage,
        removeProfileLoading,
        control,
        handleCloseChangePassword,
        handleSubmit,
        onSubmit,
        isLoading,
        changePassword,
        handleOpenChangePassword,
    };
}
