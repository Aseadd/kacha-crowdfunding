import { Input } from "antd";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    label: string;
    disabled?: boolean;
    type: HTMLInputTypeAttribute;
}

export default function InputWithLabel({ defaultValue, control, name, placeholder, type, label, disabled }: IProps) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue ?? ""}
            render={({ field: { name, onBlur, onChange, ref, value }, fieldState: { error } }) => (
                <div className="w-full relative">
                    <span className="absolute text-[#87898E] font-normal text-[10px] z-10 pl-4 pt-[6px] xs:pt-[10px]">{label}</span>
                    <Input
                        name={name}
                        disabled={disabled}
                        status={error ? "error" : undefined}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        value={value}
                        type={type}
                        className="w-full bg-[#FCFCFD] border border-[#DFDFE6] rounded-xl pb-[6px] xs:pb-[10px] pt-5 xs:pt-[30px] px-4 text-xs xs:text-sm font-normal"
                        placeholder={placeholder}
                    />
                    <div className="mt-[2px] text-xs text-red-500">{error?.message}</div>
                </div>
            )}
        />
    );
}
