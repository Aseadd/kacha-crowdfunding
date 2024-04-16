import { Drawer, Collapse, DatePicker, Slider, Button, InputNumber } from "antd";
import RoundedCloseIcon from "src/components/Icons/RoundedCloseIcon";
import { CategoryCheckBoxThemeProvider } from "src/theme/ThemeProvider";
import HistoryCategoryFilter from "./HistoryCategoryFilter";
import { IHistory } from "src/model/campaign";
import { IDonateFilterInput } from "src/model/donate";
import { useState } from "react";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import { useSelector } from "react-redux";
import { ICategory } from "src/model/category";
import { selectCategories } from "src/store/states/category";
dayjs.extend(customParseFormat);

interface IProps {
    onClose: () => void;
    open: boolean;
    histories: IHistory[];
    handleFiler: (input: IDonateFilterInput) => void;
}

export default function FilterDrawer({ onClose, open, histories, handleFiler }: IProps) {
    const categories = useSelector(selectCategories);
    const [input, setInput] = useState<IDonateFilterInput>({
        categories,
        fromDate: undefined,
        toDate: undefined,
        maxAmount: undefined,
        minAmount: undefined,
    });
    const disabledFromDate: RangePickerProps["disabledDate"] = (current) => {
        if (current && input.toDate) return current > dayjs(new Date(input.toDate)).endOf("day");
        return false;
    };
    const disabledToDate: RangePickerProps["disabledDate"] = (current) => {
        if (current && input.fromDate) return current < dayjs(new Date(input.fromDate)).endOf("day");
        return false;
    };
    const handleApply = () => {
        handleFiler(input);
        onClose();
    };
    const handleClear = () => {
        setInput((prev) => ({
            categories: prev.categories.map((value) => ({ ...value, checked: false })),
            fromDate: undefined,
            toDate: undefined,
            maxAmount: undefined,
            minAmount: undefined,
        }));
    };
    const handleDateFromChange = (_: any, date: string) => setInput((prev) => ({ ...prev, fromDate: moment(date, "DD/MM/YY").toDate() }));
    const handleDateToChange = (_: any, date: string) => setInput((prev) => ({ ...prev, toDate: moment(date, "DD/MM/YY").toDate() }));

    const handleMinAmountChange = (value: number | null) => {
        if (!Number.isNaN(value)) setInput((prev) => ({ ...prev, minAmount: Number(value) }));
    };
    const handleMaxAmountChange = (value: number | null) => {
        if (!Number.isNaN(value)) setInput((prev) => ({ ...prev, maxAmount: Number(value) }));
    };
    const handleSliderChange = ([minAmount, maxAmount]: [number, number]) => setInput((prev) => ({ ...prev, minAmount, maxAmount }));
    const handleCategoryChange = (payload: ICategory) => {
        setInput((prev) => {
            prev.categories = prev.categories?.map((value) => (value._id === payload._id ? payload : value));
            return { ...prev };
        });
    };

    return (
        <Drawer width={"425px"} closeIcon={null} placement="right" onClose={onClose} open={open}>
            <div className="w-full py-2 px-10 flex flex-col gap-y-4">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-[#27272A] text-[32px] font-bold">Filter</h1>
                    <button className="outline-none" onClick={onClose}>
                        <RoundedCloseIcon />
                    </button>
                </div>
                <CategoryCheckBoxThemeProvider>
                    <Collapse
                        defaultActiveKey={["1", "2", "3"]}
                        bordered={false}
                        items={[
                            {
                                key: "1",
                                label: <p className="text-primary text-[20px] font-medium">Category</p>,
                                children: (
                                    <HistoryCategoryFilter
                                        handleCategoryChange={handleCategoryChange}
                                        histories={histories}
                                        categories={input.categories}
                                    />
                                ),
                            },
                            {
                                key: "2",
                                label: <p className="text-primary text-[20px] font-medium">Date</p>,
                                children: (
                                    <div className="w-full flex flex-col gap-y-1">
                                        <div className="w-full flex gap-x-2">
                                            <div className="w-full flex flex-col gap-y-1">
                                                <p className="text-sm font-bold text-[#27272A]">From</p>
                                                <DatePicker
                                                    format={"DD/MM/YY"}
                                                    value={input.fromDate ? dayjs(input.fromDate) : null}
                                                    placeholder="08/12/23"
                                                    suffixIcon={null}
                                                    disabledDate={disabledFromDate}
                                                    onChange={handleDateFromChange}
                                                    className="text-sm justify-center items-center px-4 py-2 border border-[#DDDDE3] rounded-[20px] text-center"
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-y-1">
                                                <p className="text-sm font-bold text-[#27272A]">To</p>
                                                <DatePicker
                                                    value={input.toDate ? dayjs(input.toDate) : null}
                                                    format={"DD/MM/YY"}
                                                    placeholder="09/12/23"
                                                    onChange={handleDateToChange}
                                                    disabledDate={disabledToDate}
                                                    suffixIcon={null}
                                                    className="text-sm justify-center items-center px-4 py-2 border border-[#DDDDE3] rounded-[20px] text-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                key: "3",
                                label: <p className="text-primary text-[20px] font-medium">Amount</p>,
                                children: (
                                    <div className="w-full flex flex-col gap-y-[22px]">
                                        <div className="w-full flex flex-col gap-y-[22px]">
                                            <Slider
                                                range
                                                min={0}
                                                max={5000000}
                                                defaultValue={[0, 0]}
                                                value={[input.minAmount ?? 0, input.maxAmount ?? 0]}
                                                onChange={handleSliderChange}
                                            />
                                            <div className="w-full flex items-center justify-between">
                                                <InputNumber
                                                    value={input.minAmount}
                                                    placeholder="0"
                                                    onChange={handleMinAmountChange}
                                                    className="text-base font-normal filter-input overflow-hidden px-[1px] py-[3px] rounded-[20px] border border-[#DDDDE3] w-[121px]"
                                                />
                                                <div className="w-2 h-[1px] bg-[#8B8B8B]"></div>
                                                <InputNumber
                                                    value={input.maxAmount}
                                                    onChange={handleMaxAmountChange}
                                                    placeholder="0"
                                                    className="text-base font-normal filter-input overflow-hidden px-[1px] py-[3px] rounded-[20px] border border-[#DDDDE3] w-[121px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ),
                            },
                        ]}
                        style={{ background: "#fff" }}
                        className="p-0 category-collapse"
                    />
                    <div className="w-full flex items-center justify-between">
                        <Button
                            onClick={handleClear}
                            className="text-[#667085] text-sm font-semibold h-auto px-5 py-2 border border-[#C6CDD5] rounded-[30px]">
                            Clear All
                        </Button>
                        <Button
                            onClick={handleApply}
                            className="text-secondary text-sm font-semibold h-auto w-[95px] px-5 py-2 border border-secondary rounded-[30px]">
                            Apply
                        </Button>
                    </div>
                </CategoryCheckBoxThemeProvider>
            </div>
        </Drawer>
    );
}
