import discover from "src/assets/svg/discover.svg";
import witness from "src/assets/svg/witness.svg";
import market from "src/assets/svg/market.svg";
import UpArchArrow from "src/components/Icons/UpArchArrow";
import DownArchArrow from "src/components/Icons/DownArchArrow";

export default function Section2() {
    return (
        <section className="py-5 xs:py-[70px] md:py-[112.5px] px-3 xs:px-8 md:px-0 w-full bg-[#FBFBFC]">
            <div className="max-w-[1224px] mx-auto flex flex-col gap-y-3 xs:gap-y-10 md:gap-y-16">
                <h1 className="text-secondary text-center text-base xs:text-2xl md:text-[34px] font-bold uppercase">path for Chance</h1>
                <div className="w-full relative">
                    <div className="absolute flex">
                        <div className=""></div>
                    </div>
                    <div className="flex flex-col xs:flex-row items-start justify-start relative">
                        <div className="w-full flex items-center flex-col p-2 gap-y-1 xs:gap-y-4 md:gap-y-6 text-center">
                            <div className="w-20 h-20 md:w-[100px] md:h-[100px]">
                                <img
                                    src={discover}
                                    alt=""
                                    className="md:w-[100px] md:h-[100px] w-14 xs:w-16 h-14 xs:h-16"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-y-[5px] md:gap-y-2">
                                <div className="text-primary text-sm xs:text-base md:text-2xl font-bold">Discover Inspiring Projects</div>
                                <div className="text-[#423D3D]  font-normal text-[10px] xs:text-xs md:text-sm px-2 max-xs:w-[182.86px] w-full mx-auto">
                                    Explore a world of impactful projects across various causes. From education to healthcare, you'll find
                                    initiatives that resonate with your values.
                                </div>
                            </div>
                        </div>
                        <div className="absolute w-full flex justify-evenly max-xs:hidden">
                            <div className="grow-[5] md:grow-[4]"></div>
                            <div className="w-[80px] md:w-[100px]"></div>
                            <div className="pt-[70px]">
                                <UpArchArrow />
                            </div>
                            <div className="grow"></div>
                            <div className="w-[70px] md:w-[100px]"></div>
                            <div className="grow"></div>
                            <div>
                                <DownArchArrow />
                            </div>
                            <div className="w-[80px] md:w-[100px]"></div>
                            <div className="grow-[6] md:grow-[4]"></div>
                        </div>
                        <div className="w-full flex items-center flex-col p-2 gap-y-1 xs:gap-y-4 md:gap-y-6 text-center">
                            <div className="w-20 h-20 md:w-[100px] md:h-[100px]">
                                <img
                                    src={market}
                                    alt=""
                                    className="md:w-[100px] md:h-[100px] w-14 xs:w-16 h-14 xs:h-16"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-y-[5px] md:gap-y-2">
                                <div className="text-primary text-sm xs:text-base md:text-2xl font-bold">Make Your Contribution</div>
                                <div className="text-[#423D3D]  font-normal text-[10px] xs:text-xs md:text-sm px-2 max-xs:w-[182.86px] w-full mx-auto">
                                    Select a project that speaks to you and choose your preferred donation amount. Your contribution, no
                                    matter the size, has the power to create positive change.
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center flex-col p-2 gap-y-1 xs:gap-y-4 md:gap-y-6 text-center">
                            <div className="w-20 h-20 md:w-[100px] md:h-[100px]">
                                <img
                                    src={witness}
                                    alt=""
                                    className="md:w-[100px] md:h-[100px] w-14 xs:w-16 h-14 xs:h-16"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-y-[5px] md:gap-y-2">
                                <div className="text-primary text-sm xs:text-base md:text-2xl font-bold">Witness Transformation</div>
                                <div className="text-[#423D3D]  font-normal text-[10px] xs:text-xs md:text-sm px-2 max-xs:w-[182.86px] w-full mx-auto">
                                    Watch as your support transforms into real-world impact. Receive updates, see milestones achieved, and
                                    be part of the journey you've helped shape.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
