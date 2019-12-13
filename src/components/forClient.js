import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { paddings, devices, orange, orangeGradient } from '../constants';
import airplaneMarker from '../images/airplaneMarker.png';

const Section = styled.section`
    padding-top: 3rem;
    padding-bottom: 2rem;
    background-color: white;
    &&& > h1 {
        padding-left: ${paddings.desktop};
        padding-right: ${paddings.desktop};
        margin-bottom: 2rem;
    }
    li {
        background: url(${airplaneMarker}) no-repeat left 4px;
        padding-left: 25px;
    }

    @media ${devices.tablet}, ${devices.mobile} {
        .columns {
            flex-direction: column;
        }
        .column:nth-child(2) {
            order: -1;
        }
    }

    @media ${devices.tablet} {
        &&& > h1 {
            padding-left: ${paddings.tablet};
            padding-right: ${paddings.tablet};
        }
    }

    @media ${devices.mobile} {
        &&& > h1 {
            padding-left: ${paddings.mobile};
            padding-right: ${paddings.mobile};
        }
    }
`;

const ContentList = styled.ul`
    padding: 40px 100px 20px ${paddings.desktop};
    background: ${orange};
    background: ${orangeGradient};

    @media ${devices.tablet} {
        padding: 2rem ${paddings.tablet};
    }

    @media ${devices.mobile} {
        padding: 2rem ${paddings.mobile};
    }
`;

const LaptopImage = styled(Img).attrs(({ data }) => ({
    fluid: data.imageLaptop.childImageSharp.fluid,
}))`
    margin-top: 110px;
    margin-left: -180px;

    @media ${devices.tablet}, ${devices.mobile} {
        display: block;
        margin: 2rem auto 0;
    }
`;

const Component = ({ intl, data }) => (
    <Section name="forClient">
        <h1 className="title is-size-1 has-text-weight-bold">
            <FormattedMessage id="forClient.title" />
        </h1>
        <div className="columns is-mobile">
            <div className="column">
                <ContentList
                    dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({
                            id: 'forClient.content.html',
                        }),
                    }}
                />
            </div>
            <div className="column">
                <LaptopImage data={data} />
            </div>
        </div>
    </Section>
);

const QueriedComponent = ({ intl }) => (
    <StaticQuery
        query={graphql`
            query {
                imageLaptop: file(relativePath: { eq: "macbook.png" }) {
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
