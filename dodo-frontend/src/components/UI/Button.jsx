import React from 'react';

const Button = ({children, ...props}) => {
    return (
        <button
            {...props}
            className="transition delay-75 rounded-2xl bg-emerald-200 px-3 py-1 hover:bg-emerald-400 cursor-pointer">
            {children}
        </button>
    );
};

export default Button;