import SuccessIcon from "src/components/Icons/SuccessIcon";

export default function CheckoutConfirmVisaSuccess() {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] px-4 py-14 flex justify-center items-center">
            <div className="w-full flex h-full justify-center items-center p-10 mx-auto flex-col gap-y-5">
                <p className="text-primary text-xl text-center md:text-2xl font-bold right-0">Visa transaction successful.</p>
                <div className="flex items-center relative">
                    <SuccessIcon />
                </div>
            </div>
        </div>
    );
}
