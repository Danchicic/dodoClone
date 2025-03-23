import React, {useState, useRef, useEffect} from "react";

const RadioButtonGroup = ({options, onChange}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const sliderRef = useRef(null);

    const handleSelect = (index, value) => {
        setSelectedIndex(index);
        if (onChange) {
            onChange(value);
        }
    };


    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="flex justify-between ">
                {options.map((option, index) => (
                    <button
                        key={option.value}
                        id={`button-${index}`}
                        className={`appearance-none rounded-2xl outline-none bg-transparent border-none text-sm font-medium cursor-pointer transition-all duration-300 z-10 relative px-6 py-2 flex-1 text-center hover:bg-gray-300 hover:text-emerald-400 ${
                            selectedIndex === index ? "text-emerald-300" : "text-gray-500"
                        }`}
                        onClick={() => handleSelect(index, option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RadioButtonGroup;