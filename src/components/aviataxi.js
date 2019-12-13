import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { paddings, devices, orange, orangeGradientTitle } from '../constants';

const Section = styled.section`
    padding: 3rem ${paddings.desktop};
    background-color: #f6f5f5;
    font-size: 1.25rem;
    text-align: justify;

    h1 {
        text-align: left;
    }

    @media ${devices.tablet} {
        padding: 3rem ${paddings.tablet};
    }

    @media ${devices.mobile} {
        padding: 3rem ${paddings.mobile};
        font-size: 100%;
    }
`;

const PlanesImage = styled(Img).attrs(({ data }) => ({
    fluid: data.imagePlanes.childImageSharp.fluid,
}))`
    width: 100%;
    margin: 2rem 0;
`;

const Invite = styled.div`
    font-size: 2rem;
    color: white;
    background: ${orange};
    background: ${orangeGradientTitle};
    text-align: center;
    padding: 5px;
    font-weight: bold;

    @media ${devices.mobile} {
        padding: 10px;
        margin-left: -2rem;
        margin-right: -2rem;
    }
`;

const Component = ({ data }) => (
    <Section name="aviataxi">
        <h1 className="title is-size-1 has-text-weight-bold">
            <FormattedMessage id="aviataxi.title" />
        </h1>
        <p>
            <FormattedMessage id="aviataxi.text" />
        </p>
        <PlanesImage data={data} />
        <Invite>
            <FormattedMessage id="aviataxi.invite" />
        </Invite>
    </Section>
);

const QueriedComponent = ({ intl }) => (
    <StaticQuery
        query={graphql`
            query {
                imagePlanes: file(relativePath: { eq: "planes.png" }) {
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

export default injectIntl(QueriedComponent);
