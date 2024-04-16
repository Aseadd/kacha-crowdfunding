import { Dropdown } from "antd";
import { LanguageDropdownItem } from "src/components/DropdownItem";
import langIcon from "src/assets/svg/language.svg";

export default function LanguageButton() {
    return (
        <Dropdown
            overlayClassName="bg-[#FCFCFC] rounded-2xl"
            trigger={["click"]}
            overlayStyle={{ boxShadow: "0px 0px 8px 0px rgba(34, 34, 34, 0.10)" }}
            menu={{
                items: [
                    { key: "1", label: <LanguageDropdownItem text="English" /> },
                    { key: "2", label: <LanguageDropdownItem text="Amharic" /> },
                    { key: "3", label: <LanguageDropdownItem text="Dutch" /> },
                    { key: "4", label: <LanguageDropdownItem text="French" /> },
                    { key: "5", label: <LanguageDropdownItem text="Spanish" /> },
                ],
            }}
            placement="bottomRight">
            <button className="border border-secondary rounded-[3px] text-secondary text-sm font-medium p-1 flex justify-center items-center gap-x-1 w-max">
                <img src={langIcon} alt="" width={20} height={20} className="w-5 h-5" />
                <span className="">EN</span>
            </button>
        </Dropdown>
    );
}
