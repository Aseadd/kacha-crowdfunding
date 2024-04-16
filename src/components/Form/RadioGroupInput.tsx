import { Radio } from "antd";
import { Control, Controller } from "react-hook-form";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    control: Control<any>;
    name: string;
    defaultValue?: string;
}

export default function RadioGroupInput({ defaultValue, control, name, children }: IProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue ?? null}
            render={({ field: { name, onChange, ref, value }, fieldState: { error } }) => (
                <div className="w-full">
                    <Radio.Group name={name} onChange={onChange} ref={ref} value={value} className="flex gap-x-3 items-center w-full">
                        {children}
                    </Radio.Group>
                    <div className="mt-[2px] text-xs text-red-500">{error?.message}</div>
                </div>
            )}
        />
    );
}
