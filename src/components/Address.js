import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const Address = styled.div`
    font-size: 0.7rem;
    white-space: pre;
    color: initial;
`;

export default () => (
    <Address>
        <FormattedMessage id="address" />
    </Address>
);
