import { Button, Modal } from "antd";
import RoundedCloseIcon from "src/components/Icons/RoundedCloseIcon";
import image from "src/assets/images/payment_process.jpg";
import { IDonateInput, IDonateInputData, IDonateResponse } from "src/model/donate";
import { UseFormGetValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectAuth } from "src/store/states/auth";
import { ICampaignFullInfo } from "src/model/campaign";
import { useDonateMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { RouteName } from "src/constants/routes";
import { useNavigate } from "react-router-dom";

interface IProps {
    open: boolean;
    campaign: ICampaignFullInfo;
    handleClose: () => void;

    getValues: UseFormGetValues<IDonateInputData>;
}
export default function ConfirmationModal({ handleClose, open, getValues, campaign }: IProps) {
    const authData = useSelector(selectAuth).user;
    const navigate = useNavigate();
    const { showError } = useNotificationContext();
    const [donateAction, { isLoading }] = useDonateMutation();
    const onSubmit = async () => {
        try {
            const input = getData();
            const response: IDonateResponse = await donateAction(input).unwrap();
            if (response?.error) showError({ message: response.error?.data?.detail ?? "Network error" });
            else if (response === null) showError({ message: "Something went wrong" });
            else if (response?.status_code < 300) navigate(RouteName.checkOut, { state: { pay_via: input.pay_via, ...response.data } });
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };

    const getData = (): IDonateInput => {
        const data: IDonateInput = {
            amount: getValues("amount"),
            currency: getValues("currency"),
            isAnonymous: getValues("isAnonymous"),
            pay_via: getValues("payment_method"),
            campaign_id: campaign.campaign_id,
            grantee_id: campaign.grantee_id,
        } as IDonateInput;
        if ((getValues("comment")?.trim().length ?? 0) > 0) data.comment = getValues("comment")!;
        return data;
    };

    return (
        <Modal open={open} footer={null} closeIcon={null} closable={false} centered style={{ maxWidth: "525px" }} width="100%">
            <div className="w-full mx-auto max-w-[410px] flex flex-col gap-y-5 py-2 md:px-7">
                <div className="w-full flex justify-end items-center">
                    <button onClick={handleClose} className="outline-none">
                        <RoundedCloseIcon />
                    </button>
                </div>
                <h1 className="text-secondary text-lg xs:text-2xl md:text-[32px] font-medium text-center">Confirm Details</h1>
                <div className="w-full flex flex-col gap-y-4">
                    <img src={image} alt="" className="w-full rounded-2xl" />
                    <p className="text-black font-normal text-sm xs:text-base">You’re supporting</p>
                    <p className="text-black font-semibold text-base xs:text-[20px]">
                        {campaign.title} <span className="font-normal text-base">with donation amount</span> ${getValues("amount")}{" "}
                        {getValues("currency")}
                    </p>
                </div>
                <div className="w-full flex flex-col gap-y-6 text-sm xs:text-base md:text-lg font-semibold">
                    <div className="flex items-center justify-between">
                        <p className="text[#23262F]">Payment method: </p>
                        <p className="text-[#000000b3] text-sm xs:text-base capitalize">
                            {getValues("payment_method")?.toLocaleLowerCase()}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text[#23262F]">Full name: </p>
                        <p className="text-[#000000b3] text-sm xs:text-base">
                            {" "}
                            {authData?.firstname} {authData?.middlename} {authData?.lastname}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text[#23262F]">Email: </p>
                        <p className="text-[#000000b3] text-sm xs:text-base">{authData?.email}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text[#23262F]">Phone number: </p>
                        <p className="text-[#000000b3] text-sm xs:text-base">{authData?.phone}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text[#23262F]">Address: </p>
                        <p className="text-[#000000b3] text-sm xs:text-base">{authData?.address}</p>
                    </div>
                </div>
                <Button
                    loading={isLoading}
                    onClick={onSubmit}
                    className="text-[#FCFCFD] text-base hover-white xs:text-[20px] font-semibold bg-primary w-full flex justify-center items-center rounded-[50px] text-center h-[56px]">
                    <span className="text-white">Confirm</span>
                </Button>
            </div>
        </Modal>
    );
}
