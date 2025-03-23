import React from 'react';

const ModalFade = ({children, isOpen, ...props}) => {
    return (
        <div
            className={`fixed top-0 left-0 h-[100vh] w-full backdrop-blur-sm z-10
                    transition-opacity duration-300 ease-in-out 
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}
            onClick={props.onClick}
        >
            <div className="absolute w-full h-[100vh] flex justify-center items-center">
                <div
                    className={props.classes}
                    onClick={(e) => e.stopPropagation()}
                >
                    {isOpen && children}
                    {props.renderWithoutBody && !isOpen && children}
                </div>
            </div>
        </div>
    );
};

export default ModalFade;