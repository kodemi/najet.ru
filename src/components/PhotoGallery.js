import React, { useState } from 'react';
import GatsbyImg from 'gatsby-image';
import styled from 'styled-components';
import {
    DialogOverlay,
    DialogContent as DialogContentReach,
} from '@reach/dialog';
import '@reach/dialog/styles.css';
import { setConfig } from 'react-hot-loader';

import { devices } from '../constants';
import LightboxBackgroundBottom from '../images/lightbox-bottom-corner.svg';
import LightboxBackgroundTop from '../images/lightbox-top-corner.svg';

setConfig({ pureSFC: true });

const LightboxContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px 50px;
    align-items: start;
    @media ${devices.tablet} {
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${devices.mobile} {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const Photo = styled.button`
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    cursor: pointer;
`;

const DialogText = styled.div`
    padding-top: 50px;
    font-size: 90%;
    @media ${devices.mobile} {
        padding-top: 30px;
    }
`;

const DialogContent = styled(DialogContentReach)`
    &&& {
        padding: 50px 50px 130px;
        background-color: white;
        background-image: url(${LightboxBackgroundBottom}),
            url(${LightboxBackgroundTop});
        background-position: calc(100% + 1px) bottom, 1rem 1rem;
        background-repeat: no-repeat, no-repeat;
        background-size: 200px, 120px;
        @media ${devices.tablet} {
            width: 85vw;
        }
        @media ${devices.mobile} {
            width: 100%;
            padding: 20px 20px 60px;
            background-position: calc(100% + 1px) bottom, 0.2rem 0.2rem;
            background-size: 25vw, 15vw;
        }
    }
`;

const Chevron = styled.span`
    font-size: 5rem;
    cursor: pointer;
    color: black;
    opacity: 0.1;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.1);
        opacity: 0.3;
    }
`;

const PrevImage = styled(Chevron).attrs({
    className: 'fas fa-chevron-left',
})`
    margin-right: 0.2rem;
    @media ${devices.mobile} {
        position: relative;
        margin-right: -2rem;
        margin-left: 1.5rem;
        z-index: 100;
    }
`;

const NextImage = styled(Chevron).attrs({
    className: 'fas fa-chevron-right',
})`
    margin-left: 0.2rem;
    @media ${devices.mobile} {
        position: relative;
        margin-left: -2rem;
        margin-right: 1.5rem;
        z-index: 100;
    }
`;

const Carousel = styled.div`
    display: flex;
    align-items: center;
    margin-left: -3rem;
    margin-right: -3rem;
`;

const Img = styled(GatsbyImg)`
    flex: 1;
`;

const truncateText = (text) => text.substring(0, 270) + '...';

export default ({ data }) => {
    const [showLightbox, setShowLightbox] = useState(false);
    const [selectedImage, setSelectedImage] = useState({});
    const images = data.gallery.edges;

    const setPrevNextImage = (index, direction) => {
        const newIndex =
            direction < 0
                ? index + direction < 0
                    ? 0
                    : index + direction
                : index + direction > images.length - 1
                ? images.length - 1
                : index + direction;
        if (newIndex === index) {
            return;
        }
        const {
            image: { fluid },
            description: { description },
        } = images[newIndex].node;
        setSelectedImage({ fluid, description, index: newIndex });
    };

    return (
        <>
            <LightboxContainer>
                {images.map(
                    (
                        {
                            node: {
                                id,
                                description: { description },
                                image: { fluid },
                            },
                        },
                        index
                    ) =>
                        fluid.src && (
                            <Photo
                                key={id}
                                type="button"
                                onClick={() => {
                                    setShowLightbox(true);
                                    setSelectedImage({
                                        fluid,
                                        description,
                                        index,
                                    });
                                }}
                            >
                                <figure>
                                    <Img fluid={{ ...fluid, aspectRatio: 1 }} />
                                    <figcaption
                                        style={{
                                            marginTop: '1rem',
                                            fontSize: '90%',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {truncateText(description)}
                                    </figcaption>
                                </figure>
                            </Photo>
                        )
                )}
            </LightboxContainer>
            {showLightbox && (
                <DialogOverlay onDismiss={() => setShowLightbox(false)}>
                    <DialogContent>
                        <Carousel>
                            <span
                                onClick={() =>
                                    setPrevNextImage(selectedImage.index, -1)
                                }
                            >
                                <PrevImage />
                            </span>
                            <Img fluid={selectedImage.fluid} />
                            <span
                                onClick={() =>
                                    setPrevNextImage(selectedImage.index, 1)
                                }
                            >
                                <NextImage />
                            </span>
                        </Carousel>
                        <DialogText>{selectedImage.description}</DialogText>
                    </DialogContent>
                </DialogOverlay>
            )}
        </>
    );
};
