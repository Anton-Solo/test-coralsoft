interface ILabel {
    htmlFor: string;
    text: string;
}

export const InputLabel = ({htmlFor, text}: ILabel) => {
    return (
        <label htmlFor={htmlFor} className="block text-sm dark:text-white font-medium mb-2">
            {text}
        </label>
    )
}