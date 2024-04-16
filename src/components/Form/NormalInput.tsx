import { Input } from "antd";
import { Control, Controller } from "react-hook-form";
import { HTMLInputTypeAttribute, ReactNode } from "react";

interface IProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    prefix?: ReactNode;
    type: HTMLInputTypeAttribute;
}

export default function NormalInput({ defaultValue, control, name, placeholder, prefix, type }: IProps) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue ?? ""}
            render={({ field: { name, onBlur, onChange, ref, value }, fieldState: { error } }) => (
                <div className="w-full">
                    <Input
                        name={name}
                        status={error ? "error" : undefined}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        value={value}
                        type={type}
                        prefix={prefix}
                        className="px-3 md:px-4 py-[10.5px] md:py-[13.5px] text-base md:text-lg font-normal"
                        placeholder={placeholder}
                    />

                    <div className="mt-[2px] text-xs text-red-500">{error?.message}</div>
                </div>
            )}
        />
    );
}