
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    handleBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const CustomInput = ({ handleBlur, ...props }: CustomInputProps) => {

    return (
    <div className={`flex items-center justify-center w-full relative`}>
        <div className={`relative w-full px-2 ${props.disabled && 'bg-disabled'}`}>
            <input
                id={props.name}
                {...props}
                placeholder=""
                onBlur={handleBlur}
                autoComplete="off"
                className="text-[#637381] dark:text-bodydark w-full border-b border-gray-300 py-1 focus:border-b-2 focus:dark:border-whiten focus:border-black transition-colors focus:outline-none peer bg-inherit"
            />
            <label htmlFor={props.name} className={`text-[#637381] dark:text-bodydark absolute left-2 top-1 text-sm cursor-text peer-focus:text-xs peer-focus:-top-2.5 transition-all ${props.value && '!-top-2.5 !text-xs'}`}>
                {props.placeholder}
            </label>
        </div>
    </div>
    )
}

export default CustomInput;