import { Input, Select, Space } from "antd";
import { Control, Controller } from "react-hook-form";

interface IProps {
    control: Control<any>;
    placeholder?: string;
    defaultValue?: string;
    options: {
        value: string;
        label: string;
    }[];
}

export default function DonateAmountInput({ defaultValue, control, options, placeholder }: IProps) {
    return (
        <Space.Compact>
            <Controller
                control={control}
                name={"amount"}
                defaultValue={defaultValue ?? ""}
                render={({ field: { name, onBlur, onChange, ref, value }, fieldState: { error } }) => (
                    <Input
                        status={error ? "error" : undefined}
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        type={"number"}
                        className="bg-[#FCFCFD] border-[#DFDFE6] text-sm font-normal px-4 py-4 rounded-xl w-full"
                        placeholder={placeholder}
                    />
                )}
            />
            <Controller
                control={control}
                name={"currency"}
                defaultValue={defaultValue ?? ""}
                render={({ field: { onBlur, onChange, ref, value }, fieldState: { error } }) => (
                    <Select
                        status={error ? "error" : undefined}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        suffixIcon={null}
                        options={options}
                        className="h-auto w-[92px] text-center"
                        popupClassName="w-full border border-[#DDD] bg-[#FCFCFD] text-[#686868] font-semibold text-inherit text-center"
                    />
                )}
            />
        </Space.Compact>
    );
}
