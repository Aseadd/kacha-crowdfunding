import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import SignOutIcon from "../Icons/SignOutIcon";
import { useDispatch } from "react-redux";
import { useNotificationContext } from "src/context/NotificationContext";
import { resetAuth } from "src/store/states/auth";
import Helper from "src/utilities/helper";
import { Checkbox } from "antd";
import { ICategory } from "src/model/category";
import { updateCategory } from "src/store/states/category";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { ITag } from "src/model/tag";
import { updateTag } from "src/store/states/tag";
import { RouteName } from "src/constants/routes";

interface IProps {
    to: string;
    text: string;
}
export default function DropdownItem({ text, to }: IProps) {
    return (
        <Link to={to} className="text-[#1A1A1A] text-lg font-medium p-3">
            {text}
        </Link>
    );
}

export function LanguageDropdownItem({ text }: { text: string }) {
    return <button className="outline-none text-[#333] text-base font-normal">{text}</button>;
}

interface ICategoryDropdownItemProps {
    category: ICategory;
}
export function CategoryDropdownItem({ category }: ICategoryDropdownItemProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigate = () => {
        dispatch(updateCategory({ ...category, checked: true }));
        navigate(RouteName.Category);
    };

    return (
        <button onClick={handleNavigate} className="text-[#333] text-base font-normal text-start outline-none">
            {category.name}
        </button>
    );
}

export function SignOutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showSuccess } = useNotificationContext();

    const handleLogout = () => {
        Helper.clearCredentials();
        dispatch(resetAuth());
        navigate("/");
        showSuccess({ message: "Successfully logged out" });
    };

    return (
        <button onClick={handleLogout} className="outline-none text-[#1A1A1A] text-lg font-medium p-3 flex items-center gap-x-1 w-full">
            <SignOutIcon />
            <span>Sign out</span>
        </button>
    );
}

interface IPolicyNaLinkProps {
    to: string;
    text: string;
}

export function PolicyNaLink({ to, text }: IPolicyNaLinkProps) {
    const path = useLocation().pathname;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex whitespace-nowrap ${isActive ? "text-secondary text-2xl font-bold" : "text-[#717B8C] text-lg font-semibold"}`
            }>
            <div className={`h-auto w-[5px] ${`/${to}` === path ? "bg-secondary" : "bg-transparent"}`}></div>
            <p className="px-3">{text}</p>
        </NavLink>
    );
}

interface ICategoryFilterItemProps {
    category: ICategory;
}

export function CategoryFilterItem({ category }: ICategoryFilterItemProps) {
    const dispatch = useDispatch();

    const handleToggle = (e: CheckboxChangeEvent) => {
        dispatch(updateCategory({ ...category, checked: e.target.checked }));
    };

    return (
        <Checkbox onChange={handleToggle} checked={category.checked} className="w-full category-checkbox">
            <div className="w-full flex items-center justify-between">
                <span className="text-[#323232] text-lg font-normal">{category.name}</span>
                <span className="text-[#4F547B] text-base font-normal text-end">({category.count})</span>
            </div>
        </Checkbox>
    );
}

interface IHistoryFilterItemProps {
    category: ICategory;
    handleCategoryChange: (value: ICategory) => void;
}

export function HistoryCategoryFilterItem({ category, handleCategoryChange }: IHistoryFilterItemProps) {
    const handleToggle = (e: CheckboxChangeEvent) => {
        handleCategoryChange({ ...category, checked: e.target.checked });
    };

    return (
        <Checkbox onChange={handleToggle} checked={category.checked} className="w-full category-checkbox">
            <div className="w-full flex items-center justify-between">
                <span className="text-[#323232] text-lg font-normal">{category.name}</span>
                <span className="text-[#4F547B] text-base font-normal text-end">({category.count})</span>
            </div>
        </Checkbox>
    );
}

interface ITagFilterItemProps {
    tag: ITag;
}
export function TagFilterItem({ tag }: ITagFilterItemProps) {
    const dispatch = useDispatch();

    const handleToggle = (e: CheckboxChangeEvent) => {
        dispatch(updateTag({ ...tag, checked: e.target.checked }));
    };

    return (
        <Checkbox onChange={handleToggle} checked={tag.checked} className="w-full tag-checkbox">
            <div className="w-full flex items-center justify-between">
                <span className="text-[#323232] text-lg font-normal">{tag.name}</span>
                <span className="text-[#4F547B] text-base font-normal text-end">({tag.count})</span>
            </div>
        </Checkbox>
    );
}
