interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
    return (
        <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="border p-2 rounded dark:text-white dark:border-white"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    );
};
