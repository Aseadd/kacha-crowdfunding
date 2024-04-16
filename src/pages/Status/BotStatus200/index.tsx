import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SuccessIcon from "src/components/Icons/SuccessIcon";

export default function BotStatus200() {
    const state: any = useLocation().state;
    const ref: any = useRef();

    useEffect(() => {
        if (ref.current) ref.current.click();
    });

    return (
        <div className="w-full h-full min-h-screen flex justify-center items-center px-4 py-4">
            <div className="w-full max-w-[490px]">
                <div className="w-full flex flex-col gap-y-16">
                    <div className="w-full flex flex-col gap-y-7">
                        <div className="w-auto relative flex justify-center items-center">
                            <span className="relative top-0 bottom-0 left-0 right-0 block">
                                <SuccessIcon />
                            </span>
                            <h1 className="text-[81.246px] absolute top-0 font-bold right-[10%] pt-8">200</h1>
                        </div>
                        <div className="w-full flex flex-col gap-y-12">
                            <h1 className="text-black text-[40px] font-black leading-10 text-center">Success</h1>
                        </div>
                        <div className="w-full text-sm md:text-base text-center text-black font-normal">{state?.message}</div>
                    </div>
                    <a
                        ref={ref}
                        href={`whatsapp://send?phone=${state?.phone}`}
                        className="mx-auto bg-secondary max-w-[400px] w-full flex justify-center items-center py-3 px-4 text-sm md:text-xl text-white font-semibold rounded-[40px]">
                        Go back to WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}
