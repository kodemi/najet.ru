import React, { useState } from 'react';
import PopupContext from '../context/popupContext';

const usePopup = () => {
    let [popupShown, setPopupShown] = useState(
        localStorage.getItem('popupShown') || false
    );
    return {
        popupShown,
        setPopupShown: (value) => {
            setPopupShown(value);
        },
    };
};

export default ({ children }) => {
    const popup = usePopup();
    return (
        <PopupContext.Provider value={popup}>{children}</PopupContext.Provider>
    );
};
