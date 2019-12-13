import styled from 'styled-components';
import React from 'react';

import Navigation from './Navigation';
import { devices } from '../constants';

const Wrapper = styled.nav`
    a {
        display: block;
        color: ${({ indexPage }) => (indexPage ? '#461c1c' : 'white')};
    }
    @media ${devices.desktop} {
        display: none;
    }
    @media ${devices.tablet} {
        margin-left: auto;
        margin-right: 2rem;
    }
    @media ${devices.mobile} {
        margin-top: ${({ indexPage }) => (indexPage ? '1rem' : 0)};
        margin-bottom: ${({ indexPage }) => (indexPage ? '1rem' : 0)};
        width: 100%;
        font-size: 80%;
        text-align: center;
    }
`;

export default ({ lang, indexPage, onMenuSelect }) => (
    <Wrapper indexPage={indexPage}>
        <Navigation
            lang={lang}
            onMenuSelect={onMenuSelect}
            indexPage={indexPage}
        />
    </Wrapper>
);
