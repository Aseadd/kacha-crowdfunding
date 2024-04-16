import { Checkbox } from "antd";
import { Control, Controller } from "react-hook-form";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    control: Control<any>;
    name: string;
    defaultValue?: string;
}

export default function CheckboxInput({ defaultValue, control, name, children }: IProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue ?? false}
            render={({ field: { name, onChange, ref, value }, fieldState: { error } }) => (
                <div className="w-full">
                    <Checkbox name={name} ref={ref} value={true} checked={value} onChange={(e) => onChange(e.target.checked)}>
                        {children}
                    </Checkbox>
                    <div className="mt-[2px] text-xs text-red-500">{error?.message}</div>
                </div>
            )}
        />
    );
}
