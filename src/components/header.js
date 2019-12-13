import React from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';
import LanguageSwitcher from './LanguageSwitcher';
import Address from './Address';
import Logo from './Logo';
import { paddings, orange, orangeGradient, devices } from '../constants';

const Section = styled.section`
    background-color: white;
    font-size: 1.25rem;
`;

const Header = styled.header`
    background-color: white;
    height: 140px;
    .columns {
        height: 100%;
    }
    .column {
        display: flex;
        align-items: center;
    }
    @media ${devices.mobile} {
        padding-top: 15px;
        height: 180px;
        .column {
            flex-wrap: wrap;
        }
    }
`;

const LeftColumn = styled.div.attrs({ className: 'column is-6' })`
    &&& {
        padding-left: ${paddings.desktop};
    }
    padding-bottom: 1rem !important;
    @media ${devices.tablet} {
        &&& {
            padding-left: ${paddings.tablet};
            padding-right: ${paddings.tablet};
        }
    }
    @media ${devices.mobile} {
        &&& {
            padding-left: ${paddings.mobile};
            padding-right: ${paddings.mobile};
        }
    }
`;

const RightColumn = styled.div.attrs({ className: 'column' })`
    & > div {
        height: 100%;
        padding: 0px ${paddings.desktop} 20px 50px;
        background: ${orange};
        background: ${orangeGradient};
        @media ${devices.tablet} {
            padding: 2rem ${paddings.tablet};
        }
        @media ${devices.mobile} {
            padding: 2rem ${paddings.mobile};
            font-size: 90%;
        }
    }
`;

const HeaderImage = styled(Img).attrs(({ data }) => ({
    fluid: data.imageHeader.childImageSharp.fluid,
}))`
    max-height: 360px;
    margin-bottom: 1rem;
    img {
        object-fit: contain !important;
    }
    @media ${devices.tablet} {
        display: block;
        margin: 2rem auto;
    }
`;

const Title = styled.h1.attrs({
    className: 'title is-size-1 is-uppercase has-text-weight-bold',
})`
    &&& {
        margin-bottom: 3rem;
    }
    line-height: 140%;
    @media ${devices.tablet} {
        margin-top: 1rem;
    }
    @media ${devices.mobile} {
        text-align: center;
    }
`;

const GoalsTitle = styled.h4.attrs({
    className: 'title is-size-3 has-text-weight-bold',
})`
    margin-bottom: 20px;
`;

const Goals = styled.ul`
    margin-bottom: 40px;
    max-width: 380px;
    @media ${devices.tablet} {
        max-width: initial;
        margin-bottom: 20px;
    }
    @media ${devices.mobile} {
        max-width: initial;
        margin-bottom: 2rem;
    }
`;

const Buttons = styled.div.attrs({
    className: 'columns is-mobile',
})`
    max-width: 380px;
    .column {
        padding-left: 0.3rem;
        padding-right: 0.3rem;
    }
    @media ${devices.tablet} {
        margin: 0 auto;
        max-width: 100%;
        flex-direction: column;
        .column {
            display: flex;
            flex-basis: initial;
            justify-content: center;
        }
    }
    @media ${devices.mobile} {
        margin: 0 auto;
        max-width: 90%;
        flex-direction: column;
        .column {
            padding: 0;
        }
    }
`;

const Button = styled.a.attrs({
    className:
        'button is-rounded is-uppercase is-primary is-inverted is-outlined has-text-weight-bold',
})`
    background-color: #f89d1e;
    font-size: 0.8rem;
    width: 100%;
    margin-bottom: 1rem;
    padding: 15px;
    @media ${devices.tablet} {
        margin-bottom: 0;
        &:first-of-type {
            margin-right: 1rem;
        }
    }
    @media ${devices.mobile} {
    }
`;

const AddressWrapper = styled.div`
    @media ${devices.tablet} {
        float: right;
        position: relative;
        top: -73px;
    }
    @media ${devices.mobile} {
        text-align: center;
        span {
            font-size: 120%;
        }
    }
`;

const DesktopLanguageSwitcher = styled(LanguageSwitcher)`
    display: none;
    color: white;
    @media ${devices.desktop} {
        display: block;
        position: absolute;
        right: 0;
        top: 50px;
    }
`;

const MobileLanguageSwitcher = styled(LanguageSwitcher)`
    @media ${devices.desktop} {
        display: none;
    }
    color: inherit;
    @media ${devices.mobile} {
        position: absolute;
        top: 25px;
        right: ${paddings.mobile};
    }
`;

const Component = ({ data, intl, onMenuSelect }) => (
    <Section>
        <div className="columns">
            <LeftColumn>
                <Header>
                    <div className="columns is-mobile">
                        <div className="column">
                            <Logo />
                            <MobileNavigation
                                lang={intl.locale}
                                indexPage
                                onMenuSelect={onMenuSelect}
                            />
                            <MobileLanguageSwitcher />
                        </div>
                    </div>
                </Header>
                <Title>
                    <FormattedMessage id="main.title" />
                </Title>
                <HeaderImage data={data} />
                <AddressWrapper>
                    <Address />
                </AddressWrapper>
            </LeftColumn>
            <RightColumn>
                <div>
                    <div style={{ position: 'relative' }}>
                        <DesktopNavigation
                            indexPage
                            lang={intl.locale}
                            onMenuSelect={onMenuSelect}
                        />
                        <DesktopLanguageSwitcher />
                    </div>
                    <GoalsTitle>
                        <FormattedMessage id="main.goals.title" />:
                    </GoalsTitle>
                    <Goals>
                        <FormattedMessage id="main.goals.1" tagName="li" />
                        <FormattedMessage id="main.goals.2" tagName="li" />
                    </Goals>
                    <Buttons>
                        <div className="column">
                            <Button href="#howItWorks">
                                <FormattedMessage id="main.buttons.howItWorks" />
                            </Button>
                            <Button href="#forClient">
                                <FormattedMessage id="main.buttons.forClient" />
                            </Button>
                        </div>
                        <div className="column">
                            <Button href="#aviataxi">
                                <FormattedMessage id="main.buttons.aviataxi" />
                            </Button>
                            <Button href="#team">
                                <FormattedMessage id="main.buttons.team" />
                            </Button>
                        </div>
                    </Buttons>
                </div>
            </RightColumn>
        </div>
    </Section>
);

const QueriedComponent = ({ intl, onMenuSelect }) => (
    <StaticQuery
        query={graphql`
            query {
                imageHeader: file(relativePath: { eq: "header.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 1000) {
                            ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                    }
                }
            }
        `}
        render={(data) => (
            <Component data={data} intl={intl} onMenuSelect={onMenuSelect} />
        )}
    />
);

export default QueriedComponent;
