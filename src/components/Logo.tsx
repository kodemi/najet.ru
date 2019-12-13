import { Link } from 'gatsby';
import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import { devices } from '../constants';
import locales from '../data/locales';
import logo from '../images/logo.svg';

const Logo = styled.img.attrs({
    alt: 'logo',
    src: logo,
})`
    height: 40px;
    @media ${devices.mobile} {
        width: 100%;
    }
`;

const LinkWrapper = styled(Link)`
    @media ${devices.mobile} {
        margin: 0 auto;
    }
`;

export default injectIntl(({ intl: { locale } }) => (
    <LinkWrapper to={`/${locales[locale].default ? '' : 'en/'}`}>
        <Logo />
    </LinkWrapper>
));
