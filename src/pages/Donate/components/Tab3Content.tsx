import { Link } from "react-router-dom";
import phone from "src/assets/svg/phone.svg";
import location from "src/assets/svg/location.svg";
import sms from "src/assets/svg/sms.svg";
import { ICampaignBio } from "src/model/campaign";

interface IProps {
    user: ICampaignBio;
}
export default function Tab3Content({ user }: IProps) {
    return (
        <div className="w-full xs:pt-[26px] flex flex-col gap-y-6 xs:flex-row items-start xs:pl-[23px] gap-x-7 pb-[23px]">
            <div className="xs:max-w-[180px] w-full">
                <div className="w-full">
                    <div className="w-full xs:h-[180px] rounded-[15px]">
                        <img src={user.bio_image} alt="" className="w-full h-auto" />
                    </div>
                </div>
                <div className="w-full pt-[29px]">
                    <Link
                        to={user.bio_image}
                        target="_blank"
                        className="block text-center hover:text-black font-bold text-[15px] text-black py-[11px] w-full rounded-[10px] bg-white border border-[#C6CDD5]"
                        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)" }}>
                        License
                    </Link>
                </div>
            </div>
            <div className="w-full pt-2">
                <p className="text-[#000000b0] text-xs xs:text-sm font-medium">Name</p>
                <p className="text-black font-semibold text-sm xs:text-[28px] leading-10">
                    {user.firstname} {user.lastname}
                </p>
                <p className="pt-[18px] text-[#000000b0] text-xs xs:text-sm font-medium">Address</p>
                <div className="flex items-center gap-x-1 pt-[9px]">
                    <img src={location} alt="" className="w-[15px] h-[15px]" />
                    <span className="text-black font-normal text-sm xs:text-base">{user.address}</span>
                </div>
                <div className="flex items-center gap-x-1 pt-[7px]">
                    <img src={sms} alt="" className="w-[15px] h-[15px]" />
                    <span className="text-black font-normal text-sm xs:text-base">{user.email}</span>
                </div>
                <div className="flex items-center gap-x-1 pt-[11px]">
                    <img src={phone} alt="" className="w-[15px] h-[15px]" />
                    <span className="text-black font-normal text-sm xs:text-base">{user.phone}</span>
                </div>
                <div className="mt-[10px]">
                    <p className="text-[#000000b0] text-xs xs:text-sm font-medium">Bio</p>
                </div>
                <div className="w-full pt-[7px]">
                    <p className="text-black font-normal text-sm xs:text-base">{user.bio}</p>
                </div>
            </div>
        </div>
    );
}
