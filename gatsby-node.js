const createPaginatedPages = require('gatsby-paginate');
const locales = require('./src/data/locales');
const path = require('path');

const getLocalizedPath = (path, lang) =>
    locales[lang].default ? path : locales[lang].path + path;

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions;

    return new Promise((resolve) => {
        deletePage(page);
        Object.keys(locales).map((lang) => {
            const localizedPath = getLocalizedPath(page.path, lang);
            return createPage({
                ...page,
                path: localizedPath,
                context: {
                    locale: lang,
                },
            });
        });
        resolve();
    });
};

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return new Promise((resolve) => {
        graphql(`
            query newsQuery {
                news: allContentfulNews(
                    filter: { title: { ne: null } }
                    sort: { fields: [date], order: DESC }
                ) {
                    edges {
                        node {
                            id
                            title
                            slug
                            date
                            excerpt {
                                excerpt
                            }
                            listPhoto {
                                fixed(width: 300, height: 175, quality: 100) {
                                    base64
                                    width
                                    height
                                    src
                                    srcSet
                                }
                            }
                            node_locale
                        }
                    }
                }
            }
        `).then((result) => {
            console.log(result);
            Object.keys(locales).map((locale) => {
                createPaginatedPages({
                    edges: result.data.news.edges.filter(
                        ({ node }) => node.node_locale === locale
                    ),
                    createPage,
                    pageTemplate: 'src/templates/newsList.js',
                    pageLength: 5, // This is optional and defaults to 10 if not used
                    pathPrefix: getLocalizedPath('/news', locale), // This is optional and defaults to an empty string if not used
                    context: { locale }, // This is optional and defaults to an empty object if not used
                });
            });

            result.data.news.edges.map(({ node }) => {
                const localizedPath = getLocalizedPath(
                    `/news/${node.slug}`,
                    node.node_locale
                );
                createPage({
                    path: localizedPath,
                    component: path.resolve('./src/templates/newsItem.js'),
                    context: {
                        id: node.id,
                    },
                });
            });
            resolve();
        });
    });
};
