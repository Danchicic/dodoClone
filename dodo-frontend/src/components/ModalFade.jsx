import React from 'react';

const ModalFade = ({children, ...props}) => {
    return (
        <div className="fixed top-0 left-0 h-[100vh] w-full backdrop-blur-sm z-10">
            <div className="absolute w-full h-[100vh] flex justify-center items-center">
                <div id="modal" className={props.classes}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalFade;