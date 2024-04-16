import { Link } from "react-router-dom";
import success from "src/assets/svg/success.svg";

export default function Status200() {
    return (
        <div className="w-full h-full min-h-screen flex justify-center items-center px-4 py-4">
            <div className="w-full max-w-[490px]">
                <div className="w-full flex flex-col gap-y-16">
                    <div className="w-full flex flex-col gap-y-7">
                        <div className="w-auto relative flex justify-center items-center">
                            <img src={success} alt="" className="relative top-0 bottom-0 left-0 right-0" />
                            <h1 className="text-[81.246px] absolute top-0 font-bold right-[10%] pt-8">200</h1>
                        </div>
                        <div className="w-full flex flex-col gap-y-12">
                            <h1 className="text-black text-[40px] font-black leading-10 text-center">Successful</h1>
                        </div>
                        <div className="w-full text-sm md:text-base text-center text-black font-normal">
                            Lorem ipsum dolor sit amet consectetur. Ornare auctor integer sed fringilla adipiscing ipsum dui. Dolor sagittis
                            laoreet purus nibh accumsan.
                        </div>
                    </div>
                    <Link
                        to="/"
                        className="mx-auto bg-secondary max-w-[400px] w-full flex justify-center items-center py-3 px-4 text-sm md:text-xl text-white font-semibold rounded-[40px]">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
