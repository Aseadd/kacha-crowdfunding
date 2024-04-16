import { Input } from "antd";
import { Control, Controller } from "react-hook-form";
import LightLockIcon from "../Icons/LightLockIcon";

interface IProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    className?: string;
}

export default function PasswordInput({ defaultValue, control, name, placeholder, className }: IProps) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue ?? ""}
            render={({ field: { name, onBlur, onChange, ref, value }, fieldState: { error } }) => (
                <div className="w-full">
                    <Input.Password
                        status={error ? "error" : undefined}
                        prefix={
                            <span className="pr-1">
                                <LightLockIcon />
                            </span>
                        }
                        // iconRender={(visible) => (visible ? <LightVisibleIcon /> : <LightInvisibleIcon />)}
                        className={`px-3 md:px-4 py-[10.5px] md:py-[13.5px] text-base md:text-lg font-normal ${className}`}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        value={value}
                        placeholder={placeholder}
                    />

                    <div className="mt-[2px] text-xs text-red-500">{error?.message}</div>
                </div>
            )}
        />
    );
}
