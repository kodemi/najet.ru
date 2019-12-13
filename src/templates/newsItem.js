import React from 'react';
import { injectIntl, FormattedDate } from 'react-intl';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import rehypeReact from 'rehype-react';

import Layout from '../components/layout';
import DesktopNavigation from '../components/DesktopNavigation';
import MobileNavigation from '../components/MobileNavigation';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../components/footer';
import Logo from '../components/Logo';
import Poll from '../components/Poll';
import InlineLogo, { updateTextWithInlineLogo } from '../components/InlineLogo';

import { devices, paddings, orange, orangeGradient } from '../constants';

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        poll: Poll,
        logo: InlineLogo,
    },
}).Compiler;

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
            display: block;
        }
    }
    .column {
        display: flex;
        align-items: center;
        padding-bottom: 0;
    }
    .column:nth-child(2) {
        background: ${orange};
        background: ${orangeGradient};
        padding-left: 2rem;
        padding-right: ${paddings.desktop};
        padding-bottom: 0.5rem;
        @media ${devices.tablet} {
            padding-right: ${paddings.tablet};
        }
        @media ${devices.mobile} {
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
    padding: 3rem ${paddings.desktop} 3rem;
    @media ${devices.tablet} {
        padding: 6rem ${paddings.tablet} 3rem;
    }
    @media ${devices.mobile} {
        padding: 6rem ${paddings.mobile} 3rem;
    }
`;

const PostDate = styled.span`
    display: inline-block;
    margin-bottom: 1rem;
    border-bottom: 2px solid ${orange};
`;

const Content = injectIntl(({ intl, data: { newsPost: post } }) => (
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
            <h1 className="title is-1">
                {updateTextWithInlineLogo(post.title)}
            </h1>
            <PostDate>
                <FormattedDate
                    value={post.date}
                    month="long"
                    year="numeric"
                    day="numeric"
                />
            </PostDate>
            <section className="content">
                {renderAst(post.content.childMarkdownRemark.htmlAst)}
            </section>
        </MainContent>
        <Footer />
    </Section>
));

const Page = ({ data }) => (
    <Layout locale={data.newsPost.node_locale}>
        <Content data={data} />
    </Layout>
);

export default Page;

export const pageQuery = graphql`
    query NewsPostQuery($id: String!) {
        newsPost: contentfulNews(id: { eq: $id }) {
            date
            title
            node_locale
            content {
                childMarkdownRemark {
                    htmlAst
                }
            }
        }
    }
`;
