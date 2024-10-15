import { useEffect, useState } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { SelectInput } from "../models/select";

const CustomSelect = ({ options, label, name, value, onChange, disabled = false }: SelectInput) => {
    const [inputValue, setInputValue] = useState('');
    const [viewOptions, setViewOptions] = useState(false);
    const [optionsList, setOptionsList] = useState(options);

    useEffect(() => {
        setInputValue(value);
    }, [value])


    const onBlurSelect = () => {
        setTimeout(() => {
            setViewOptions(false);
        }, 200);
    }

    const handleOptions = () => {
        setOptionsList(options);
        setViewOptions(true)
    }

    const handleClean = () => {
        setInputValue('');
        setOptionsList(options);
    }

    const selectOption = (key: string) => {
        const selectedOption: any = options.find(option => option.key === key);
        if (selectedOption) {
            onChange(selectedOption);
            setInputValue(selectedOption.name);
        }
    }

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (newValue.length > 0) {
            const filteredOpt = options.filter(obj => obj.value.toLocaleLowerCase().startsWith(newValue.toLocaleLowerCase()));
            setOptionsList(filteredOpt);
        } else {
            setOptionsList(options);
        }
    }

    return (
        <div className={`relative w-full ${disabled && 'bg-disabled'}`}>
            <div className="relative mx-2">
                <input type="text" autoComplete="off" value={inputValue} id={name} name={name} onClick={handleOptions} onChange={handleChange} onBlur={onBlurSelect} disabled={disabled}
                    className="text-[#637381] dark:text-bodydark block text-start py-[5px] px-0 w-full text-sm text-gray-500 bg-transparent border-b border-gray-300 focus:border-b-2 focus:border-black focus:dark:border-whiten dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 cursor-text peer" />
                <label htmlFor={name} className={`text-[#637381] dark:text-bodydark absolute left-0 top-1 text-sm cursor-text peer-focus:text-xs peer-focus:-top-2.5 transition-all ${inputValue && '!-top-2.5 !text-xs'}`}>
                    {label}
                </label>
                <div className={`absolute z--1 right-0 bottom-2.5 cursor-pointer `}>
                    <IoIosArrowDown />
                </div>
                <div onClick={handleClean} className={`absolute hidden hover:!block ${inputValue !== '' && 'peer-hover:!block'} z-0 right-0 bottom-2.5 cursor-pointer  w-5 h-5 rounded-full bg-gray pt-0.5 pl-0.5`}>
                    <IoMdClose />
                </div>
                <div className={`max-h-[9rem] absolute top-full left-0 z-[50] w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input ${optionsList.length > 3 && 'overflow-y-scroll'} cursor-pointer ${!viewOptions && 'hidden'}`}>
                    {optionsList.map((opt) => (
                        <div key={opt.key}>
                        <div
                        className="w-full cursor-pointer rounded-t border-b border-stroke hover:text-white hover:bg-primary2 dark:border-form-strokedark"
                        onClick={() => selectOption(opt.key)}
                        >
                        <div
                            className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2`}
                        >
                            <div className="flex w-full items-center">
                            <div className="mx-2 leading-6 dark:text-white">
                                {opt.name}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default CustomSelect