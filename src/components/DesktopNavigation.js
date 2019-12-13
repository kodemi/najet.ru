import styled from 'styled-components';
import React from 'react';

import Navigation from './Navigation';
import { devices } from '../constants';

const Wrapper = styled.nav`
    margin-bottom: ${({ indexPage }) => (indexPage ? '130px' : 0)};
    padding-top: ${({ indexPage }) => (indexPage ? '30px' : 0)};
    a {
        /* color: ${({ indexPage }) => (indexPage ? 'white' : 'initial')}; */
        color: white;
        display: block;
        margin-right: 1rem;
    }
    @media ${devices.tablet}, ${devices.mobile} {
        display: none;
    }
`;

export default ({ indexPage, lang, onMenuSelect }) => (
    <Wrapper indexPage={indexPage}>
        <Navigation
            lang={lang}
            onMenuSelect={onMenuSelect}
            indexPage={indexPage}
        />
    </Wrapper>
);
