import { UsersIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export type ButtonProps = {
    label: string;
    icon?: React.FC<Parameters<typeof UsersIcon>[0]>;
    onClick?: () => void;
    className?: string;
};

export default function Button(props: ButtonProps) {
    return (
        <button
            className={clsx(
                "flex",
                "mt-4",
                "px-2",
                "py-[0.15rem]",
                "rounded",
                "bg-[#002000]",
                "hover:bg-[#001900]",
                "active:bg-[#002300]",
                "hover:text-gray-200",
                "border",
                "border-gray-500",
                props.className,
            )}
            onClick={props.onClick}
        >
            {props.label}
            {props.icon && <props.icon className={clsx("w-5", "ml-1", "-translate-y-[0.1rem]")} />}
        </button>
    );
}
