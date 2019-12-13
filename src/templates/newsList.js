import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Layout from '../components/layout';
import DesktopNavigation from '../components/DesktopNavigation';
import MobileNavigation from '../components/MobileNavigation';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../components/footer';
import Logo from '../components/Logo';
import News from '../components/News';
import NewsNavigation from '../components/NewsNavigation';

import { devices, paddings, orange, orangeGradient } from '../constants';

const DesktopLanguageSwitcher = styled(LanguageSwitcher)`
    display: none;
    color: white;
    @media ${devices.desktop} {
        display: block;
        position: absolute;
        right: ${paddings.desktop};
        top: 50px;
    }
`;

const MobileLanguageSwitcher = styled(LanguageSwitcher)`
    @media ${devices.desktop} {
        display: none;
    }
    color: inherit;
    @media ${devices.tablet} {
        color: white;
    }
    @media ${devices.mobile} {
        position: absolute;
        top: 25px;
        right: ${paddings.mobile};
    }
`;

const Section = styled.section`
    background-color: white;
`;

const Header = styled.header`
    background-color: white;
    font-size: 1.25rem;
    height: 140px;
    padding-left: ${paddings.desktop};
    .columns {
        height: 100%;
        margin-right: 0;
        @media ${devices.mobile} {
            display: block !important;
        }
    }
    .column {
        display: flex;
        align-items: center;
        padding-bottom: 0;
    }
    .column:nth-child(2) {
        position: relative;
        background: ${orange};
        background: ${orangeGradient};
        padding-left: 2rem;
        padding-right: ${paddings.desktop};
        padding-bottom: 0.5rem;
        @media ${devices.tablet} {
            padding-right: ${paddings.tablet};
        }
        @media ${devices.mobile} {
            position: initial;
            padding-left: ${paddings.mobile};
            padding-right: ${paddings.mobile};

            margin-top: 0.5rem;
            font-size: 1.25rem;
        }
    }
    @media ${devices.tablet} {
        padding-left: ${paddings.tablet};
    }
    @media ${devices.mobile} {
        padding-top: 15px;
        .column {
            flex-wrap: wrap;
        }
        padding-left: 0;
    }
`;

const MainContent = styled.section`
    padding: 6rem ${paddings.desktop} 3rem;
    @media ${devices.tablet} {
        padding: 6rem ${paddings.tablet} 3rem;
    }
    @media ${devices.mobile} {
        padding: 6rem ${paddings.mobile} 3rem;
    }
`;

const PageTitle = styled.h1`
    &&& {
        margin-top: -4rem;
        margin-bottom: 4rem;
        @media ${devices.mobile} {
            margin-top: -2rem;
            margin-bottom: 2rem;
        }
    }
`;

const StyledNewsNavigation = styled(NewsNavigation)`
    text-align: center;
`;

const Content = injectIntl(({ intl, data }) => (
    <Section>
        <Header>
            <div className="columns is-mobile">
                <div className="column">
                    <Logo />
                </div>
                <div className="column">
                    <MobileNavigation lang={intl.locale} />
                    <DesktopNavigation lang={intl.locale} />
                    <MobileLanguageSwitcher />
                    <DesktopLanguageSwitcher />
                </div>
            </div>
        </Header>

        <MainContent>
            <PageTitle className="title is-1 is-uppercase">
                <FormattedMessage id="news" />
            </PageTitle>
            <News data={data} />
            {data.pageCount >= 1 && (
                <StyledNewsNavigation
                    index={data.index}
                    pageCount={data.pageCount}
                    pathPrefix={data.pathPrefix}
                />
            )}
        </MainContent>
        <Footer />
    </Section>
));

const Page = ({ pageContext }) => {
    const {
        group: edges,
        index,
        pageCount,
        pathPrefix,
        additionalContext: { locale },
    } = pageContext;
    return (
        <Layout locale={locale}>
            <Content data={{ edges, index, pageCount, pathPrefix }} />
        </Layout>
    );
};

export default Page;
