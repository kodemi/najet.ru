import React from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { paddings, devices, orange, orangeGradientTitle } from '../constants';

const Section = styled.section`
    background-color: white;
    padding: 3rem ${paddings.desktop};
    h1 {
        margin-bottom: 2rem !important;
    }

    @media ${devices.tablet} {
        padding: 3rem ${paddings.tablet};
    }

    @media ${devices.mobile} {
        padding: 3rem ${paddings.mobile};
        h1 {
            font-size: 1.5rem !important;
        }
    }
`;

const TitovFigure = styled.figure`
    float: right;
    margin-left: 1rem;
    figcaption {
        max-width: 240px;
        font-size: 0.8rem;
        padding-left: 10px;
        border-left: 1px solid ${orange};
    }

    @media ${devices.mobile} {
        margin: 0;
        float: none;
    }
`;

const TitovImage = styled(Img).attrs(({ data }) => ({
    fluid: data.imageTitov.childImageSharp.fluid,
}))`
    @media ${devices.mobile} {
        width: 100%;
    }
`;

const RoadmapTitle = styled.span`
    margin-top: 3rem;
    background: ${orange};
    background: ${orangeGradientTitle};
    padding: 10px 15px;
    display: inline-block;

    @media ${devices.tablet} {
        margin-top: 0;
    }

    @media ${devices.mobile} {
        text-align: center;
        width: 100%;
    }
`;

const Roadmap = styled.ul`
    margin-top: 1rem;
    margin-left: 25px;
    padding: 20px 0;
    position: relative;
    &:before {
        position: absolute;
        top: 0;
        content: ' ';
        display: block;
        width: 2px;
        height: 100%;
        margin-left: -20px;
        background: #f89d1e;
        background: linear-gradient(
            to bottom,
            rgba(226, 156, 48, 0) 0%,
            rgb(226, 156, 48) 20%,
            rgb(226, 156, 48) 80%,
            rgba(226, 156, 48, 0) 100%
        );
        z-index: 5;
    }
    li {
        position: relative;
        margin-bottom: 3rem;
        &:last-of-type {
            margin-bottom: 0;
        }
        &:before {
            position: absolute;
            top: 0;
            left: -25px;
            content: ' ';
            display: block;
            width: 12px;
            height: 12px;
            margin-top: 5px;
            background: #f89d1e;
            border-radius: 10px;
            border: 2px solid #461c1c;
            z-index: 10;
        }
    }
`;

const Component = ({ data }) => (
    <Section name="team">
        <h1 className="title is-size-1 has-text-weight-bold">
            <FormattedMessage id="team.title" />
        </h1>
        <div className="is-clearfix">
            <TitovFigure>
                <TitovImage data={data} />
                <FormattedMessage id="team.imageTitle" tagName="figcaption" />
            </TitovFigure>
            <RoadmapTitle>
                <FormattedMessage id="team.calend" />
            </RoadmapTitle>
            <Roadmap>
                <FormattedMessage id="team.timeline.1" tagName="li" />
                <FormattedMessage id="team.timeline.2" tagName="li" />
                <FormattedMessage id="team.timeline.3" tagName="li" />
                <FormattedMessage id="team.timeline.4" tagName="li" />
            </Roadmap>
        </div>
    </Section>
);

const QueriedComponent = ({ intl }) => (
    <StaticQuery
        query={graphql`
            query {
                imageTitov: file(relativePath: { eq: "titov.jpg" }) {
                    childImageSharp {
                        fluid(maxWidth: 1000) {
                            ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                    }
                }
            }
        `}
        render={(data) => <Component data={data} intl={intl} />}
    />
);

export default QueriedComponent;
