import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { paddings, devices, orange, orangeGradient } from '../constants';
import PresentationLink from './PresentationLink';
import Address from './Address';

const Footer = styled.footer`
    padding: 2rem ${paddings.desktop};
    background: ${orange};
    background: ${orangeGradient};
    color: white;

    @media ${devices.tablet} {
        padding: 2rem ${paddings.tablet};
    }

    @media ${devices.mobile} {
        padding: 2rem ${paddings.mobile};
    }
`;

const Menu = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    a {
        text-transform: uppercase;
        color: white;
        font-weight: bold;
    }

    @media ${devices.tablet} {
        flex-wrap: wrap;
        justify-content: center;
        li {
            margin-right: 2rem;
            margin-bottom: 0.5rem;
            &:last-child {
                margin-right: 0;
            }
        }
    }

    @media ${devices.mobile} {
        flex-direction: column;
    }
`;

const MenuItem = ({ id }) => (
    <li>
        <Link to={`/#${id}`}>
            <FormattedMessage id={`main.buttons.${id}`} />
        </Link>
    </li>
);

const Links = styled.ul`
    margin-bottom: 1rem;
    li {
        margin-bottom: 0.5rem;
    }
    a {
        color: white;
    }
`;

const Component = () => (
    <Footer>
        <Menu>
            <MenuItem id="howItWorks" />
            <MenuItem id="forClient" />
            <MenuItem id="aviataxi" />
            <MenuItem id="team" />
        </Menu>
        <Links>
            <li>
                <PresentationLink />
            </li>
        </Links>
        <Address />
    </Footer>
);

export default injectIntl(Component);
