import React from 'react';

const ModalFade = ({children}) => {
    return (
        <div className="fixed top-0 left-0 h-[100vh] w-full backdrop-blur-sm z-10">
            <div className="absolute w-full h-[100vh] flex justify-center items-center">
                <div id="modal" className="bg-white w-7/10 mh-3/10 shadow-2xl rounded-2xl p-10 pb-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalFade;