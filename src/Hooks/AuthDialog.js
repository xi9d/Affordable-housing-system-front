import React, { useEffect, useRef } from 'react';
import Signup from '../Component/Signup';
import Login from '../Component/Login';

function AuthDialog({ isOpen, onClose, type = 'signup' }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleClose = () => {
        onClose();
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div ref={dialogRef} className="bg-white rounded-lg overflow-hidden shadow-md w-96">
                <div className="px-6 py-8">
                    {type === 'signup' && <Signup />}
                    {type === 'login' && <Login />}
                    <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthDialog;
