import { Control, Controller } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";

interface IProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
    defaultValue?: string;
}

export default function CommentTextAreaInput({ defaultValue, control, name, placeholder }: IProps) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue ?? ""}
            render={({ field: { name, onBlur, onChange, ref, value }, fieldState: { error } }) => (
                <div className="w-full">
                    <TextArea
                        className="text-sm xs:text-base font-normal text-black py-3 pl-2 xs:pl-[22px] pr-9 bg-[#FAFBFC]"
                        style={{ height: 65, resize: "none" }}
                        name={name}
                        status={error ? "error" : undefined}
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
