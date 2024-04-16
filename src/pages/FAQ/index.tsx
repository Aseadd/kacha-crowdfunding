import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import OrangeBanIcon from "src/components/Icons/OrangeBanIcon";
import OrangeCardIcon from "src/components/Icons/OrangeCardIcon";
import OrangeDollarIcon from "src/components/Icons/OrangeDollarIcon";
import OrangeMailIcon from "src/components/Icons/OrangeMailIcon";
import OrangeTagIcon from "src/components/Icons/OrangeTagIcon";
import OrangeTrackIcon from "src/components/Icons/OrangeTrackIcon";
import SearchIcon from "src/components/Icons/SearchIcon";

export default function FAQ() {
    return (
        <main className="w-full border-b border-b-[#CBD4E6] mb-6">
            <div className="w-full bg-[#FFF9E7] py-12 text-center">
                <div className="w-full flex flex-col gap-y-7">
                    <div className="w-full flex flex-col gap-y-4">
                        <div className="w-full flex flex-col gap-y-2">
                            <h3 className="text-primary text-[15px] font-semibold">FAQs</h3>
                            <h1 className="text-primary text-2xl xs:text-[32px] font-semibold">Ask us anything</h1>
                        </div>
                        <p className="text-[#323232] text-base xs:text-lg md:text-[20px] font-normal max-xs:w-[306px] max-xs:mx-auto">
                            Have any questions? We're here to assist you.
                        </p>
                    </div>
                    <Input
                        className="w-[302px] xs:w-[371px] mx-auto py-[7px] text-sm font-normal px-4 rounded-[15px] border border-[#8A9CA7]"
                        placeholder="Search here"
                        prefix={<SearchIcon />}
                    />
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-8 xs:gap-y-12 py-8 xs:py-12 max-xs:px-0 max-md:px-8">
                <h1 className="text-primary text-2xl xs:text-[32px] font-semibold text-center">Popular Articles</h1>
                <div className="w-full mx-auto max-w-[995px] px-6 max-md:px-8">
                    <div className="w-full flex flex-col gap-y-12 max-md:px-5">
                        <div className="w-full flex flex-col gap-y-8 xs:flex-row gap-x-6 items-start">
                            <Link to={`detail`}>
                                <div className="max-md:w-full max-xs:max-w-[300px] max-md:max-w-[225px] md:w-[300px] flex flex-col gap-y-[14px]">
                                    <div className="w-full flex gap-x-4">
                                        <div className="bg-[#FFF9E7] rounded-full h-[35px] w-full max-w-[35px] flex justify-center items-center">
                                            <OrangeMailIcon />
                                        </div>
                                        <h3 className="xs:hidden text-secondary text-base font-medium">
                                            How do I change my account email?
                                        </h3>
                                    </div>
                                    <div className="w-full flex flex-col gap-y-1">
                                        <h3 className="max-xs:hidden text-secondary text-lg font-medium">
                                            How do I change my account email?
                                        </h3>
                                        <p className="text-sm text-[#323232] font-normal">
                                            Lorem ipsum dolor sit amet consectetur. Scelerisque scelerisque elementum egestas morbi diam
                                            rutrum praesent ornare vitae. Et quis lorem.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <Link to={`detail`}>
                                <div className="max-md:w-full max-xs:max-w-[300px] max-md:max-w-[225px] md:w-[300px] flex flex-col gap-y-[14px]">
                                    <div className="w-full flex gap-x-4">
                                        <div className="bg-[#FFF9E7] rounded-full h-[35px] w-full max-w-[35px] flex justify-center items-center">
                                            <OrangeCardIcon />
                                        </div>
                                        <h3 className="xs:hidden text-secondary text-base font-medium">
                                            What should I do if my donation fails?
                                        </h3>
                                    </div>
                                    <div className="w-full flex flex-col gap-y-1">
                                        <h3 className="max-xs:hidden text-secondary text-lg font-medium">
                                            What should I do if my donation fails?
                                        </h3>
                                        <p className="text-sm text-[#323232] font-normal">
                                            Lorem ipsum dolor sit amet consectetur. Ornare ac volutpat aliquam massa quam. Adipiscing
                                            tincidunt proin augue platea in nibh maecenas mattis. Consequat donec augue consectetur facilisi
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <Link to={`detail`}>
                                <div className="max-md:w-full max-xs:max-w-[300px] max-md:max-w-[225px] md:w-[300px] flex flex-col gap-y-[14px]">
                                    <div className="w-full flex gap-x-4">
                                        <div className="bg-[#FFF9E7] rounded-full h-[35px] w-full max-w-[35px] flex justify-center items-center">
                                            <OrangeBanIcon />
                                        </div>
                                        <h3 className="xs:hidden text-secondary text-base font-medium">
                                            What is your cancellation policy?
                                        </h3>
                                    </div>
                                    <div className="w-full flex flex-col gap-y-1">
                                        <h3 className="max-xs:hidden text-secondary text-lg font-medium">
                                            What is your cancellation policy?
                                        </h3>
                                        <p className="text-sm text-[#323232] font-normal">
                                            Lorem ipsum dolor sit amet consectetur. Sapien est dictum egestas pellentesque bibendum urna
                                            arcu nunc ipsum. Fringilla mauris nisl quam at est tellus facilisi nunc. Sed blandit sit amet a
                                            mattis.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="w-full flex flex-col gap-y-8 xs:flex-row gap-x-6 items-start">
                            <Link to={`detail`}>
                                <div className="max-md:w-full max-xs:max-w-[300px] max-md:max-w-[225px] md:w-[300px] flex flex-col gap-y-[14px]">
                                    <div className="w-full flex gap-x-4">
                                        <div className="bg-[#FFF9E7] rounded-full h-[35px] w-full max-w-[35px] flex justify-center items-center">
                                            <OrangeTrackIcon />
                                        </div>
                                        <h3 className="xs:hidden text-secondary text-base font-medium">Lorem ipsum dolor sit amet</h3>
                                    </div>
                                    <div className="w-full flex flex-col gap-y-1">
                                        <h3 className="max-xs:hidden text-secondary text-lg font-medium">Lorem ipsum dolor sit amet</h3>
                                        <p className="text-sm text-[#323232] font-normal">
                                            Lorem ipsum dolor sit amet consectetur. Dolor condimentum condimentum turpis placerat ut sit.
                                            Vel eros pellentesque pellentesque gravida est.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <Link to={`detail`}>
                                <div className="max-md:w-full max-xs:max-w-[300px] max-md:max-w-[225px] md:w-[300px] flex flex-col gap-y-[14px]">
                                    <div className="w-full flex gap-x-4">
                                        <div className="bg-[#FFF9E7] rounded-full h-[35px] w-full max-w-[35px] flex justify-center items-center">
                                            <OrangeDollarIcon />
                                        </div>
                                        <h3 className="xs:hidden text-secondary text-base font-medium">Lorem ipsum dolor sit amet</h3>
                                    </div>
                                    <div className="w-full flex flex-col gap-y-1">
                                        <h3 className="max-xs:hidden text-secondary text-lg font-medium">Lorem ipsum dolor sit amet</h3>
                                        <p className="text-sm text-[#323232] font-normal">
                                            Lorem ipsum dolor sit amet consectetur. Tincidunt eu est ipsum ut rhoncus quis. Id semper vitae
                                            venenatis varius vivamus. Condimentum tellus sit auctor nulla hac vulputate. Fringilla
                                            ullamcorper bibendum sit velit id. Sit congue ultrices lectus.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <Link to={`detail`}>
                                <div className="max-md:w-full max-xs:max-w-[300px] max-md:max-w-[225px] md:w-[300px] flex flex-col gap-y-[14px]">
                                    <div className="w-full flex gap-x-4">
                                        <div className="bg-[#FFF9E7] rounded-full h-[35px] w-full max-w-[35px] flex justify-center items-center">
                                            <OrangeTagIcon />
                                        </div>
                                        <h3 className="xs:hidden text-secondary text-base font-medium">Lorem ipsum dolor sit amet</h3>
                                    </div>
                                    <div className="w-full flex flex-col gap-y-1">
                                        <h3 className="max-xs:hidden text-secondary text-lg font-medium">Lorem ipsum dolor sit amet</h3>
                                        <p className="text-sm text-[#323232] font-normal">
                                            Lorem ipsum dolor sit amet consectetur. Egestas sit in at gravida vitae eros tellus morbi
                                            gravida. Tristique vulputate vel et feugiat morbi diam lectus morbi eget. Varius rutrum ornare
                                            eget imperdiet.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full mx-auto max-w-[280px] xs:max-w-[995px] px-2 xs:px-6 py-[52px] rounded-xl bg-[#FFF9E7] flex flex-col gap-y-3 xs:flex-row items-center justify-between">
                    <div className="w-full flex flex-col gap-y-[6px]">
                        <h4 className="text-primary text-base xs:text-[20px] font-semibold">Still have questions?</h4>
                        <p className="text-sm xs:text-base font-normal text-[#323232]">
                            Can’t find the answer you’re looking for? Please chat our friendly team.
                        </p>
                    </div>
                    <Button
                        className="max-xs:w-full hover-white bg-primary text-white text-sm font-semibold py-2 px-4 rounded-[6px] h-auto"
                        style={{ boxShadow: "0px 0.73544px 1.47088px 0px rgba(16, 24, 40, 0.05)" }}>
                        Get in touch
                    </Button>
                </div>
            </div>
        </main>
    );
}
