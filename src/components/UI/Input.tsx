import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    loading?: boolean;
}

export const Input: React.FC<IInput> = ({ type, id, name, error, value, onChange, loading, ...props }) => {
    return (
        <div>
            <input
                type={type}
                id={id}
                name={name}
                className={`py-3 px-4 block w-full border ${
                    error ? "border-red-500" : "border-gray-200"
                } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white`}
                value={value}
                onChange={onChange}
                disabled={loading}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};
