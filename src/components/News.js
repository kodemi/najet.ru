import React from 'react';

import NewsListItem from './NewsListItem';

export default ({ data }) => {
    return data.edges.map(({ node }) => (
        <NewsListItem key={node.id} data={node} />
    ));
};
