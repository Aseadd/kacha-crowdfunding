import { Carousel } from "antd";
import { Link } from "react-router-dom";
import mobileImage from "src/assets/images/mobile_home.jpg";
import image from "src/assets/images/home-1.png";
import image2 from "src/assets/images/home-2.png";
import image3 from "src/assets/images/home-3.png";
import image4 from "src/assets/images/home-4.png";
import { RouteName } from "src/constants/routes";

export default function Section1() {
    return (
        <section className="w-full h-[327px] xs:h-[684px] md:h-[759px]">
            <div className="absolute h-[327px] xs:h-[684px] md:h-[759px] max-w-[912px] w-full  right-0">
                <div className="md:hidden relative">
                    <Carousel autoplay effect="fade" dots={false}>
                        <img src={mobileImage} alt="" className="h-[327px] xs:h-[684px]" />
                        <img src={mobileImage} alt="" className="h-[327px] xs:h-[684px]" />
                        <img src={mobileImage} alt="" className="h-[327px] xs:h-[684px]" />
                        <img src={mobileImage} alt="" className="h-[327px] xs:h-[684px]" />
                    </Carousel>
                    <div className="w-full h-full absolute top-0 bg-black opacity-50"></div>
                </div>
                <div className="max-md:hidden">
                    <Carousel autoplay effect="fade" dots={false}>
                        <img src={image} alt="" className="h-[756px] max-h-[756px]" />
                        <img src={image2} alt="" className="h-[756px] max-h-[756px]" />
                        <img src={image3} alt="" className="h-[756px] max-h-[756px]" />
                        <img src={image4} alt="" className="h-[756px] max-h-[756px]" />
                    </Carousel>
                </div>
            </div>

            <div className="flex flex-col max-md:justify-center h-full md:pt-48 max-w-[1232px] mx-auto relative px-3">
                <div className="w-full md:max-w-[488px] text-center md:text-start">
                    <h3 className="text-primary text-base xs:text-[32px] xs:leading-[46px] md:text-[40px] md:leading-[60px] font-bold">
                        Your
                    </h3>
                    <div className="">
                        <h2 className="text-secondary font-bold text-lg xs:text-[40px] xs:leading-[56px] md:text-[64px] md:leading-[80px]">
                            Gifts Changes
                        </h2>
                        <h2 className="text-secondary font-bold text-lg xs:text-[40px] xs:leading-[56px] md:text-[64px] md:leading-[80px]">
                            Lives
                        </h2>
                    </div>
                    <div className="font-source py-8 text-white md:text-[#323232] text-[8px] xs:text-sm mx-auto md:mx-0 w-full max-w-[218px] xs:max-w-[482px] md:w-full md:text-base font-semibold">
                        Your generosity paves the way for new opportunities. Each donation shapes a future filled with promise and
                        potential.
                    </div>
                    <div className="pt-4 w-full flex justify-center items-center">
                        <Link
                            to={RouteName.Category}
                            className="max-xs:py-[9px] p-3 border-primary text-white hover-white font-bold text-[8px] xs:text-base text-center bg-primary max-w-[246px] rounded-[20px] border-2 w-full"
                            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
                            Make a Donation
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
