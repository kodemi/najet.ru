import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { injectIntl, FormattedMessage } from 'react-intl';

import { orange } from '../constants';

const StyledLink = styled(Link)`
    color: ${orange};
    margin: 0 0.5rem;
`;

const NewsNavigation = ({ index, pageCount, pathPrefix, style, className }) => {
    const nextUrl =
        `${pathPrefix}/` + (index - 1 <= 1 ? '' : (index - 1).toString());
    const previousUrl =
        `${pathPrefix}/` +
        (index + 1 > pageCount ? index : (index + 1).toString());

    return (
        <div style={style} className={className}>
            {index !== 1 && (
                <StyledLink to={nextUrl}>
                    {'< '}
                    <FormattedMessage id="news.next" />
                </StyledLink>
            )}
            {index !== pageCount && (
                <StyledLink to={previousUrl}>
                    <FormattedMessage id="news.prev" />
                    {' >'}
                </StyledLink>
            )}
        </div>
    );
};

export default injectIntl(NewsNavigation);
