import ErrorIcon from "src/components/Icons/ErrorIcon";

export default function CheckoutConfirmVisaError() {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] px-4 py-14 flex justify-center items-center">
            <div className="w-full flex h-full justify-center items-center p-10 mx-auto flex-col gap-y-5">
                <p className="text-black text-xl text-center md:text-2xl font-bold right-0">Visa transaction failed.</p>
                <div className="flex items-center relative">
                    <ErrorIcon />
                </div>
            </div>
        </div>
    );
}
