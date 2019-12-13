import React from 'react';
import styled from 'styled-components';
import {
    DialogOverlay,
    DialogContent as DialogContentReach,
} from '@reach/dialog';
import '@reach/dialog/styles.css';
import ReactPlayer from 'react-player';

import { devices } from '../constants';
import LightboxBackgroundBottom from '../images/lightbox-bottom-corner.svg';
import LightboxBackgroundTop from '../images/lightbox-top-corner.svg';

const DialogContent = styled(DialogContentReach)`
    &&& {
        width: 50vw;
        height: 50vh;
        min-height: 360px;
        padding: 50px;
        background-color: white;
        background-image: url(${LightboxBackgroundBottom}),
            url(${LightboxBackgroundTop});
        background-position: calc(100% + 1px) bottom, 1rem 1rem;
        background-repeat: no-repeat, no-repeat;
        background-size: 15vw, 10vw;
        @media ${devices.tablet} {
            width: 85vw;
        }
        @media ${devices.mobile} {
            width: 100%;
            height: 40vh;
            padding: 20px;
            background-position: calc(100% + 1px) bottom, 0.2rem 0.2rem;
            background-size: 25vw, 15vw;
        }
    }
`;

export default ({ onDismiss }) => (
    <DialogOverlay onDismiss={onDismiss}>
        <DialogContent>
            <ReactPlayer
                url=" https://www.youtube.com/watch?v=Nv-TLteij_U"
                width="100%"
                height="100%"
            />
        </DialogContent>
    </DialogOverlay>
);
