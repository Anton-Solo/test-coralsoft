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
            {loading ? 
                <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-black rounded-full" role="status" aria-label="loading" />
                :
                text
            }
        </button>
    );
};