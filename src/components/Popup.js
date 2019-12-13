import React from 'react';
import ReactModal from 'react-modal';
import { useStaticQuery, graphql } from 'gatsby';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import rehypeReact from 'rehype-react';

import Poll from './Poll';
import { devices } from '../constants';

const query = graphql`
    query {
        allContentfulPopup(filter: { title: { ne: "Test" } }) {
            edges {
                node {
                    node_locale
                    title
                    content {
                        childMarkdownRemark {
                            htmlAst
                        }
                    }
                }
            }
        }
    }
`;

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        poll: Poll,
    },
}).Compiler;

const CloseButton = styled.button`
    font-size: 4rem;
    padding: 0;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: -1.1rem;
    right: 0.2rem;
`;

const Content = styled.div.attrs({ className: 'content' })`
    min-width: 200px;
    max-width: 500px;
    padding: 2rem;
    @media ${devices.mobile} {
        width: 80vw;
    }
    p:last-of-type {
        margin-bottom: 0;
    }
`;

export default injectIntl(({ isOpen, onClose, intl }) => {
    const data = useStaticQuery(query);
    if (!data.allContentfulPopup) {
        return false;
    }
    const localeData = data.allContentfulPopup.edges.filter(
        ({ node }) => node.node_locale === intl.locale
    )[0];
    const {
        content: {
            childMarkdownRemark: { htmlAst },
        },
    } = localeData.node;

    if (!htmlAst) {
        return false;
    }

    return (
        <ReactModal
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: '#461c1c59',
                },
                content: {
                    width: 'fit-content',
                    height: 'fit-content',
                    margin: '0 auto',
                    padding: 0,
                    boxShadow: '0 2px 5px #461c1cc7',
                },
            }}
            isOpen={isOpen}
        >
            <Content>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {renderAst(htmlAst)}
            </Content>
        </ReactModal>
    );
});
