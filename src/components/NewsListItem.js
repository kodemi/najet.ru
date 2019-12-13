import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { FormattedMessage, injectIntl } from 'react-intl';

import { updateTextWithInlineLogo } from '../components/InlineLogo';
import { orange } from '../constants';
import locales from '../data/locales';

const mobileMediaOverride = '(max-width: 767px)';

const getLocalizedPath = (path, lang) =>
    locales[lang].default ? path : locales[lang].path + path;

const Wrapper = styled.div`
    display: flex;
    margin-bottom: 3rem;
    @media ${mobileMediaOverride} {
        display: block;
    }
`;

const Image = styled(Img)`
    min-width: 300px;
    height: 100%;
    margin-right: 1rem;
    margin-bottom: 1rem;
    @media ${mobileMediaOverride} {
        min-width: auto;
        max-width: 100%;
        width: 100% !important;
    }
`;

const Content = styled.div`
    & .title:after {
        content: '';
        display: block;
        height: 10px;

        border-bottom: 2px solid ${orange};
        width: 100%;
    }
`;

const Excerpt = styled.p`
    margin-right: 1rem;
    display: inline;
`;

const ReadMore = styled(Link)`
    padding: 0 1rem;
    white-space: nowrap;
    border-radius: 5rem;
    background-color: ${orange};
    color: white;
    &:hover {
        color: white;
    }
`;

export default injectIntl(({ data, intl: { locale } }) => {
    return (
        <Wrapper>
            <Image fixed={data.listPhoto.fixed} />
            <Content>
                <h3 className="title is-3">
                    {updateTextWithInlineLogo(data.title)}
                </h3>
                <div>
                    <Excerpt>{data.excerpt.excerpt}</Excerpt>
                    <ReadMore
                        to={getLocalizedPath(`/news/${data.slug}`, locale)}
                    >
                        <FormattedMessage id="readMore" />
                    </ReadMore>
                </div>
            </Content>
        </Wrapper>
    );
});
