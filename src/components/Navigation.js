import React from 'react';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import PresentationLink from './PresentationLink';

import locales from '../data/locales';

export default ({ lang, onMenuSelect, indexPage }) => {
    const pathPrefix = locales[lang].default ? '' : `/${lang}`;

    return (
        <>
            <Link to={`${pathPrefix}/gallery`}>
                <FormattedMessage id="gallery" />
            </Link>
            <PresentationLink />
            {indexPage && (
                //eslint-disable-next-line
                <a href="#" onClick={() => onMenuSelect('officeVideo')}>
                    <FormattedMessage id="officeVideo" />
                </a>
            )}
            <Link to={`${pathPrefix}/news`}>
                <FormattedMessage id="news" />
            </Link>
        </>
    );
};
