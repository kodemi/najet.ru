import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { IntlProvider, addLocaleData } from 'react-intl';

import Popup from './Popup';
import PopupContext from '../context/popupContext';
import enData from 'react-intl/locale-data/en';
import ruData from 'react-intl/locale-data/ru';

import en from '../i18n/en';
import ru from '../i18n/ru';

import './layout.scss';

function flattenMessages(nestedMessages, prefix = '') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

const messages = { en, ru };
addLocaleData([...enData, ...ruData]);

const Layout = ({ locale = 'ru', children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                    enablePopup
                }
            }
        }
    `);
    const [popupOpen, setPopupOpen] = useState(false);
    const popup = useContext(PopupContext);
    useEffect(() => {
        let timeoutId;
        if (
            data.site.siteMetadata.enablePopup &&
            !popup.popupShown &&
            (window.location.pathname === '/' ||
                window.location.pathname === '/en/')
        ) {
            timeoutId = setTimeout(() => {
                setPopupOpen(true);
                popup.setPopupShown(true);
            }, 2000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <IntlProvider
            locale={locale}
            messages={flattenMessages(messages[locale])}
        >
            <>
                <Helmet
                    title={data.site.siteMetadata.title}
                    meta={[
                        { name: 'description', content: 'Sample' },
                        { name: 'keywords', content: 'sample, something' },
                    ]}
                >
                    <html lang="en" />
                    <script
                        defer
                        src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
                    />
                </Helmet>
                {data.site.siteMetadata.enablePopup && (
                    <Popup
                        isOpen={popupOpen}
                        onClose={() => setPopupOpen(false)}
                    />
                )}
                <div>{children}</div>
            </>
        </IntlProvider>
    );
};

export default Layout;
