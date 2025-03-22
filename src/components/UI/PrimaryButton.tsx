import { ButtonHTMLAttributes } from "react";
import spinner from "../../images/spinner.gif";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    text: string;
}

export const PrimaryButton = ({ loading, text, ...props }: IButton) => {
    return (
        <button
            {...props}
            className="cursor-pointer w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            disabled={loading || props.disabled}
        >
            {loading ? <img className="w-4 h-4" src={spinner} alt='spinner' /> : text}
        </button>
    );
};