import { Input } from "antd";
import { Control, Controller } from "react-hook-form";
import LightEmailIcon from "../Icons/LightEmailIcon";

interface IProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
    defaultValue?: string;
}

export default function EmailInput({ defaultValue, control, name, placeholder }: IProps) {
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
                        type="email"
                        prefix={
                            <span className="pr-1">
                                <LightEmailIcon />
                            </span>
                        }
                        className="px-3 md:px-4 py-[10.5px] md:py-[13.5px] text-base md:text-lg font-normal"
                        placeholder={placeholder}
                    />

                    <div className="mt-[2px] text-xs text-red-500">{error?.message}</div>
                </div>
            )}
        />
    );
}
