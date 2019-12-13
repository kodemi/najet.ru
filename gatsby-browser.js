/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';

import RootElementWrapper from './src/components/RootElementWrapper';

export const wrapRootElement = ({ element }) => {
    return <RootElementWrapper>{element}</RootElementWrapper>;
};
