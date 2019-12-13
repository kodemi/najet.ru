import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import { devices } from '../constants';

const DefaultText = styled.span`
    @media ${devices.mobile} {
        display: none;
    }
`;

const MobileText = styled.span`
    @media ${devices.desktop}, ${devices.tablet} {
        display: none;
    }
`;

const Component = ({ intl, className }) => (
    <a href={intl.locale === 'ru' ? '/en' : '/'} className={className}>
        <DefaultText>{intl.locale === 'ru' ? 'EN' : 'РУ'}</DefaultText>
        <MobileText>{intl.locale === 'ru' ? 'EN' : 'РУ'}</MobileText>
    </a>
);

export default injectIntl(Component);
