import Modal from "antd/es/modal/Modal";
import { Button, Collapse, Radio } from "antd";
import RoundedCloseIcon from "src/components/Icons/RoundedCloseIcon";
import image from "src/assets/images/payment_process.jpg";
import teleBirr from "src/assets/images/tele_birr.jpg";
import awash from "src/assets/images/awash.png";
import VisaIcon from "src/components/Icons/VisaIcon";
import MasterCardIcon from "src/components/Icons/MasterCardIcon";
import JengaIcon from "src/components/Icons/JengaIcon";
import RoundedPlusIcon from "src/components/Icons/RoundedPlusIcon";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";
import { IDonateInputData } from "src/model/donate";
import DonateAmountInput from "src/components/Form/DonateAmountInput";
import RadioGroupInput from "src/components/Form/RadioGroupInput";
import CheckboxInput from "src/components/Form/CheckboxInput";
import TextAreaInput from "src/components/Form/TextAreaInput";
import { ICurrency } from "src/model/campaign";

interface IProps {
    open: boolean;
    handleClose: () => void;
    control: Control<IDonateInputData, any>;
    handleSubmit: UseFormHandleSubmit<IDonateInputData, undefined>;
    setValue: UseFormSetValue<IDonateInputData>;
    onSubmit: (input: IDonateInputData) => void;
    errors: FieldErrors<IDonateInputData>;
    currencies: ICurrency[];
}

export default function PaymentProcessModal({ handleClose, errors, open, control, handleSubmit, setValue, onSubmit, currencies }: IProps) {
    return (
        <Modal open={open} footer={null} closeIcon={null} closable={false} centered style={{ maxWidth: "676px" }} width="100%">
            <div className="w-full">
                <div className="w-full flex justify-end items-center md:px-9">
                    <button onClick={handleClose} className="outline-none">
                        <RoundedCloseIcon />
                    </button>
                </div>
                <div className="w-full mx-auto max-w-[482px]">
                    <h1 className="text-secondary font-normal text-2xl md:text-[32px] text-center">Payment Process</h1>
                    <div className="w-full mt-8 flex gap-x-8 items-center">
                        <div className="rounded-2xl overflow-hidden w-full max-w-[140px] h-[105px]">
                            <img src={image} alt="" className="w-full h-full" />
                        </div>
                        <div className="w-full max-md:max-w-[143px]">
                            <p className="text-black text-base font-normal">You’re supporting</p>
                            <p className="text-black text-base md:text-lg font-semibold">Urgent Help for Praveen's Family</p>
                        </div>
                    </div>
                    <div className="w-full mt-8 flex flex-col gap-y-[27px]">
                        <h3 className="text-[#23262F] text-base font-medium">Payment Method</h3>
                        <RadioGroupInput control={control} name="payment_method">
                            <Radio value={"VISA"} className="flex items-center payment">
                                <VisaIcon />
                            </Radio>
                            <Radio value={"MASTERCARD"} className="flex items-center payment">
                                <MasterCardIcon />
                            </Radio>
                            <Radio value={"JENGA"} className="flex items-center payment">
                                <JengaIcon />
                            </Radio>
                            <Radio value={"TELEBIRR"} className="flex items-center payment">
                                <img src={teleBirr} alt="" className="w-full max-w-[20px] h-5" style={{ width: "20px" }} />
                            </Radio>
                            <Radio value={"AWASH"} className="flex items-center payment">
                                <img src={awash} alt="" className="w-full max-w-[20px] h-5" style={{ width: "20px" }} />
                            </Radio>
                            <Radio value={"OTHER"} className="flex items-center payment">
                                <span className="text-black text-sm font-normal">Others</span>
                            </Radio>
                        </RadioGroupInput>
                        <div className="w-full flex gap-x-3 items-center flex-wrap gap-y-3">
                            {[10, 50, 100, 200, 300, 400, 500].map((value, index) => (
                                <Button
                                    onClick={() => setValue("amount", value)}
                                    key={index}
                                    className="py-2 px-4 h-auto text-[#726C6C] text-sm font-normal border-[#E4E4E4] rounded-[30px]">
                                    {value}
                                </Button>
                            ))}
                        </div>
                        <div className="w-full flex flex-col">
                            <DonateAmountInput
                                options={currencies.map((item) => ({ label: item.currency_code, value: item.currency_code }))}
                                control={control}
                                placeholder="Enter Amount"
                            />
                            <div className="mt-[2px] text-xs text-red-500">{errors.amount?.message}</div>
                            <div className="mt-[2px] text-xs text-red-500">{errors.currency?.message}</div>
                        </div>
                        <CheckboxInput control={control} name="isAnonymous">
                            <span className="text-[#000000b3] font-normal text-[15px]">Donate Anonymously</span>
                        </CheckboxInput>

                        <Collapse
                            bordered={false}
                            size="small"
                            items={[
                                {
                                    key: "1",
                                    label: <p className="text-[#000000b3] text-base font-normal">Words of support (Optional)</p>,
                                    children: (
                                        <div className="w-full pt-3">
                                            <TextAreaInput control={control} name="comment" />
                                        </div>
                                    ),
                                },
                            ]}
                            expandIcon={(_) => <RoundedPlusIcon />}
                            style={{ background: "#fff" }}
                            className="p-0"
                        />
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            className="text-[#FCFCFD] text-[20px] font-semibold bg-primary w-full flex justify-center items-center rounded-[50px] text-center h-[56px]">
                            <span className="text-white">Proceed</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
