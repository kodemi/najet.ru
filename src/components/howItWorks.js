import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { paddings, devices, orange, orangeGradient } from '../constants';

const Section = styled.section`
    padding-top: 3rem;
    background-color: #f6f5f5;
    & > h1,
    & > h3 {
        padding-right: ${paddings.desktop};
        padding-left: ${paddings.desktop};
    }
    .columns > .column:nth-child(1) {
        padding-left: ${paddings.desktop};
    }
    .columns > .column:nth-child(2) > div {
        background: ${orange};
        background: ${orangeGradient};
        height: 100%;
        padding: 40px ${paddings.desktop} 40px 50px;
    }
    .column {
        padding-top: 0;
    }
    &&& h3 {
        margin-bottom: 2rem;
    }

    @media ${devices.tablet} {
        & > h1,
        & > h3 {
            padding-left: ${paddings.tablet};
            padding-right: ${paddings.tablet};
        }
        & > h3 span {
            font-size: 90%;
        }
        .columns > .column:nth-child(1) {
            padding-left: ${paddings.tablet};
        }
        .columns > .column:nth-child(2) > div {
            padding: 40px ${paddings.tablet};
        }
    }

    @media ${devices.mobile} {
        & > h1,
        & > h3 {
            padding-left: ${paddings.mobile};
            padding-right: ${paddings.mobile};
        }
        & > h3 span {
            font-size: 90%;
        }
        .columns > .column:nth-child(1) {
            padding: 0 ${paddings.mobile};
        }
        .columns > .column:nth-child(2) > div {
            padding: 2rem ${paddings.mobile};
        }
        .column {
            text-align: justify;
        }
    }
`;

const StructureImage = styled(Img).attrs(({ data }) => ({
    fluid: data.imageStructure.childImageSharp.fluid,
}))`
    margin-top: 50px;
    @media ${devices.tablet}, ${devices.mobile} {
        margin: 2rem 0;
    }
`;

const Component = ({ intl, data }) => (
    <Section name="howItWorks">
        <h1 className="title is-size-1 has-text-weight-bold">
            <FormattedMessage id="howItWorks.title" />
        </h1>
        <h3 className="title is-size-3 has-text-weight-bold">
            <FormattedMessage id="howItWorks.subtitle" />
        </h3>
        <div className="columns">
            <div className="column is-6">
                <StructureImage data={data} />
            </div>
            <div className="column">
                <div>
                    <h3 className="title is-size-3 has-text-weight-bold has-text-white">
                        <FormattedMessage id="howItWorks.content.title" />
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: intl.formatMessage({
                                id: 'howItWorks.content.html',
                            }),
                        }}
                    />
                </div>
            </div>
        </div>
    </Section>
);

const QueriedComponent = ({ intl }) => (
    <StaticQuery
        query={graphql`
            query {
                imageStructure: file(relativePath: { eq: "structure.png" }) {
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
