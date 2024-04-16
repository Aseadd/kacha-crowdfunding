import { Link, useNavigate } from "react-router-dom";
import logo from "src/assets/images/logo.png";
import twitter from "src/assets/svg/twitter.svg";
import telegram from "src/assets/svg/telegram.svg";
import facebook from "src/assets/svg/facebook.svg";
import instagram from "src/assets/svg/instagram.svg";
import linkedIn from "src/assets/svg/linkedIn.svg";
import phone from "src/assets/svg/phone.svg";
import sms from "src/assets/svg/sms.svg";
import location from "src/assets/svg/location.svg";
import map from "src/assets/images/map.png";
import appStore from "src/assets/images/app store.png";
import googlePlay from "src/assets/images/google play.png";
import { RouteName } from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories, updateCategory } from "src/store/states/category";
import { ICategory } from "src/model/category";

export default function Footer() {
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleNavigate = (category: ICategory) => {
        dispatch(updateCategory({ ...category, checked: true }));
        navigate(RouteName.Category);
    };

    return (
        <footer className="w-full md:px-2 pt-11 md:pt-0">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-y-11">
                <div className="flex flex-col md:flex-row gap-y-9 xs:gap-y-16 items-start justify-between gap-x-4 px-2 xs:px-8  md:px-0">
                    <div className="flex flex-row md:flex-col gap-y-3 w-full md:max-w-[304px]">
                        <div className="flex flex-col gap-y-2 w-full text-[#323232] font-normal text-xs xs:text-sm md:text-base">
                            <Link to={""}>
                                <img src={logo} alt="" className="w-[79px] xs:w-[130px] md:w-auto xs:h-11" />
                            </Link>
                            <div className="flex items-center gap-x-1">
                                <img src={phone} alt="" className="max-w-[20px] w-full h-6" />
                                <span>+251 116 68 63 04 / 05</span>
                            </div>
                            <div className="flex items-center gap-x-1">
                                <img src={sms} alt="" className="max-w-[20px] w-full h-6" />
                                <span>info@kachadfs.com</span>
                            </div>
                            <div className="flex items-center gap-x-1">
                                <img src={location} alt="" className="max-w-[20px] w-full h-6" />
                                <span className="inline-block max-w-[271px] md:max-w-none ">
                                    African Avenue, Noah Plaza, Mezzanine Floor, Addis Ababa / Ethiopia
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-[171px]">
                            <img
                                src={map}
                                alt=""
                                className="rounded-[10px] w-full max-w-[154px] xs:max-w-[304px] xs:h-full md:w-full float-right md:float-none"
                            />
                        </div>
                    </div>
                    <div className="w-full flex md:gap-x-4 gap-x-6 items-start justify-between">
                        <div className="flex gap-x-11 text-[#323232]">
                            <div className="w-full py-4 flex flex-col gap-y-2">
                                <h6 className="text-lg font-bold">Categories</h6>
                                {categories.map((value, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigate(value)}
                                        className="hover:text-orange-600 outline-none text-base font-normal">
                                        {value.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="max-xs:hidden flex gap-x-11 text-[#323232]">
                            <div className="w-full py-4 flex flex-col gap-y-2">
                                <h6 className="text-lg font-bold">Company</h6>
                                <Link to={""} className="text-base font-normal">
                                    About Kacha
                                </Link>
                                <Link to={""} className="text-base font-normal">
                                    About Us
                                </Link>
                                <Link to={""} className="text-base font-normal">
                                    News
                                </Link>
                                <Link to={""} className="text-base font-normal">
                                    Careers
                                </Link>
                                <Link to={RouteName.FAQ} className="text-base font-normal">
                                    FAQs
                                </Link>
                                <Link to={""} className="text-base font-normal">
                                    Pricing
                                </Link>
                            </div>
                        </div>
                        <div className="flex gap-x-11 text-[#323232]">
                            <div className="w-full py-4 flex flex-col gap-y-2">
                                <h6 className="text-lg font-bold">Legal</h6>
                                <Link to={""} className="text-base font-normal">
                                    Money Transfer Service
                                </Link>
                                <Link to={""} className="text-base font-normal">
                                    Data Protection
                                </Link>
                                <Link to={RouteName.TermsConditions} className="text-base font-normal">
                                    Terms & Conditions
                                </Link>
                                <Link to={""} className="text-base font-normal">
                                    Complaints Policy
                                </Link>
                                <Link to={RouteName.CharityDisclosure} className="text-base font-normal">
                                    Charity Disclosure
                                </Link>
                            </div>
                        </div>
                        <div className="max-xs:hidden flex gap-x-11 text-[#323232] h-full">
                            <div className="w-full py-4 flex flex-col justify-start items-start h-full gap-y-2">
                                <div className="pb-4">
                                    <h6 className="text-lg font-bold">Get the app</h6>
                                </div>
                                <Link
                                    to={"https://play.google.com/store/apps/details?id=com.kachadfs.customer"}
                                    className="text-base font-normal">
                                    <img src={googlePlay} alt="" className="w-full max-w-[135px] rounded" />
                                </Link>
                                <Link
                                    to={"https://apps.apple.com/us/app/kacha-customer/id6449651203"}
                                    target="_blank"
                                    className="text-base font-normal">
                                    <img src={appStore} alt="" className="w-full max-w-[135px] rounded" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full border-b border-[#CBD4E6] mt-5 xs:mt-11 md:mt-0"></div>
                <div className="w-full flex flex-col gap-y-3 xs:flex-row justify-between items-center pb-3 text-[#323232] font-normal px-8  md:px-0">
                    <div className="flex gap-x-3 xs:hidden">
                        <Link to={"https://play.google.com/store/apps/details?id=com.kachadfs.customer"} className="text-base font-normal">
                            <img src={googlePlay} alt="" className="w-full max-w-[92px] rounded" />
                        </Link>
                        <Link
                            to={"https://apps.apple.com/us/app/kacha-customer/id6449651203"}
                            target="_blank"
                            className="text-base font-normal">
                            <img src={appStore} alt="" className="w-full max-w-[92px] rounded" />
                        </Link>
                    </div>
                    <div className="xs:hidden flex gap-x-5 p-2 justify-center items-center">
                        <Link to={"https://twitter.com/DfsKacha"} className="h-4 md:h-6">
                            <img src={twitter} alt="" className="h-full" />
                        </Link>
                        <Link to={"https://t.me/kachadfs"} className="h-4 md:h-6">
                            <img src={telegram} alt="" className="h-full" />
                        </Link>
                        <Link to={""} className="h-4 md:h-6">
                            <img src={instagram} alt="" className="h-full" />
                        </Link>
                        <Link
                            to={"https://www.facebook.com/people/Kacha-Digital-Financial-Service-SC/100083282170098/"}
                            className="h-4 md:h-6">
                            <img src={facebook} alt="" className="h-full" />
                        </Link>
                        <Link to={"https://www.linkedin.com/company/kachadfs/mycompany/verification/"} className="h-4 md:h-6">
                            <img src={linkedIn} alt="" className="h-full" />
                        </Link>
                    </div>
                    <div className="text-[10px] max-md:hidden">© Copyright 2023, Kacha, All rights reserved</div>
                    <div className="flex items-center gap-x-2 md:gap-x-4 text-xs md:text-sm ">
                        <Link to={RouteName.PolicyPrivacy}>Privacy Policy</Link>
                        <Link to={RouteName.CharityDisclosure}>Charity Disclosure</Link>
                        <Link to={RouteName.TermsConditions}>Terms of Use</Link>
                    </div>
                    <div className="text-[10px] md:hidden">© Copyright 2023, Kacha, All rights reserved</div>

                    <div className="max-xs:hidden flex gap-x-5 p-2 justify-center items-center">
                        <Link to={"https://twitter.com/DfsKacha"} className="h-4 md:h-6">
                            <img src={twitter} alt="" className="h-full" />
                        </Link>
                        <Link to={"https://t.me/kachadfs"} className="h-4 md:h-6">
                            <img src={telegram} alt="" className="h-full" />
                        </Link>
                        <Link to={""} className="h-4 md:h-6">
                            <img src={instagram} alt="" className="h-full" />
                        </Link>
                        <Link
                            to={"https://www.facebook.com/people/Kacha-Digital-Financial-Service-SC/100083282170098/"}
                            className="h-4 md:h-6">
                            <img src={facebook} alt="" className="h-full" />
                        </Link>
                        <Link to={"https://www.linkedin.com/company/kachadfs/mycompany/verification/"} className="h-4 md:h-6">
                            <img src={linkedIn} alt="" className="h-full" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
