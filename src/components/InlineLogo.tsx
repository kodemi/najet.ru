import React from 'react';
import styled from 'styled-components';

import logo from '../images/logo.svg';

const token = '@logo';

const InlineLogo = styled.img.attrs({ src: logo, title: 'NAJET' })`
    display: inline-block;
    position: relative;
    top: 0.25em;
    height: 1em;
`;

export const updateTextWithInlineLogo = (text: string) => {
    return (
        <span>
            {text.split(token).reduce((prev, current, i) => {
                if (!i) {
                    return [current];
                }
                return prev.concat(
                    <InlineLogo key={'logo' + current} />,
                    current
                );
            }, [])}
        </span>
    );
};

export default InlineLogo;
