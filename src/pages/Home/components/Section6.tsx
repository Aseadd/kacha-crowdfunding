import { Link } from "react-router-dom";
import smile from "src/assets/svg/smile.svg";
import childDrink from "src/assets/images/child_drinking.png";
import childrenSmile from "src/assets/images/children_smile.png";
import { RouteName } from "src/constants/routes";

export default function Section6() {
    return (
        <section className="px-2 xs:px-8 md:px-0 md:pt-[126px] pb-6 md:pb-20 w-full bg-white">
            <div className="w-full max-w-[1200px] rounded-[40px] bg-[#FBFBFC] px-4 py-10 md:py-0 mx-auto">
                <div className="w-full flex flex-col md:flex-row gap-x-4 gap-y-6 justify-between items-center">
                    <div className="relative w-full max-w-[180px] xs:max-w-[334px] md:max-w-[454px] h-[146px] xs:h-[271px] md:h-[345px]">
                        <div className="absolute w-full h-full top-0 right-0 flex justify-end">
                            <div className="relative w-full max-w-[140px] xs:max-w-[275px] md:max-w-[371px]">
                                <div className="w-full max-w-[60.995px] xs:max-w-[113.295px] md:max-w-[154px] h-[60.995px] xs:h-[113.295px] md:h-[154px] rounded-full bg-secondary absolute top-4 xs:top-6 md:top-[36px]"></div>
                                <div className="w-full max-w-[115.256px] xs:max-w-[214.084px] md:max-w-[291px] h-[115.256px] xs:h-[214.084px] md:h-[291px] rounded-full bg-primary absolute right-0"></div>
                            </div>
                        </div>
                        <div className="w-full flex justify-between h-full relative">
                            <div className="flex h-full items-end">
                                <img
                                    src={childrenSmile}
                                    alt=""
                                    className="rounded-[10px] w-full max-w-[93px] xs:max-w-[172.885px]  md:max-w-[235px] h-[93px] xs:h-[149.344px] md:h-[232px]"
                                />
                            </div>
                            <div className="flex h-full items-start">
                                <img
                                    src={childDrink}
                                    alt=""
                                    className="rounded-[10px] w-full max-w-[80px] xs:max-w-[149.344px] md:max-w-[203px] h-[80px] xs:h-[170.678px] md:h-[203px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="flex flex-col gap-y-5 xs:gap-y-10">
                            <div className="text-center">
                                <h3 className="text-primary text-lg xs:text-[32px] md:text-[41px] font-bold uppercase">
                                    Be the reason they{" "}
                                </h3>
                                <div className="flex justify-center items-center">
                                    <img src={smile} alt="" className="h-[38.511px] xs:h-[71.533px] md:h-[118px]" />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Link
                                    to={RouteName.Category}
                                    className="bg-primary hover-white rounded-xl border-[#C6CDD5] border-[1.225px] py-[11px] px-9 text-white font-bold text-[8px] xs:text-base"
                                    style={{ boxShadow: "0px 4.90164px 4.90164px 0px rgba(0, 0, 0, 0.10)" }}>
                                    Donate Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
