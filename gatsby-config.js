module.exports = {
    siteMetadata: {
        title: 'NAJET',
        enablePopup: true,
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/images`,
                name: 'images',
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    'gatsby-remark-component',
                    {
                        resolve: `gatsby-remark-images-contentful`,
                        options: {
                            maxWidth: 800,
                            linkImagesToOriginal: false,
                        },
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-favicon',
            options: {
                logo: './src/images/favicon.png',
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'najet.ru',
                short_name: 'NAJET',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/favicon.png', // This path is relative to the root of the site.
            },
        },
        'gatsby-plugin-offline',
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
                accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
            },
        },
        {
            resolve: `gatsby-plugin-yandex-metrika`,
            options: {
                trackingId: '51537209',
                webvisor: true,
                trackHash: true,
                version: 2,
            },
        },
        'gatsby-plugin-typescript',
        'gatsby-plugin-tslint',
    ],
};
