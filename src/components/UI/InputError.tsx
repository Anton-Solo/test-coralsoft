export const InputError = ({error}:{error: string | null}) => {
    return (
        <>
            {error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null}
        </>
    )
}