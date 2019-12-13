import React, { useState } from 'react';
import { injectIntl } from 'react-intl';

import { setConfig } from 'react-hot-loader';

import Layout from '../components/layout';
import Header from '../components/header';
import HowItWorks from '../components/howItWorks';
import ForClient from '../components/forClient';
import Aviataxi from '../components/aviataxi';
import Team from '../components/team';
import Footer from '../components/footer';
import VideoPresentationModal from '../components/VideoPresentationModal';

setConfig({ pureSFC: true });

const Content = injectIntl(({ intl }) => {
    const [showVideoPresentation, setShowVideoPresentation] = useState(false);

    const handleMenuSelect = (menuItem) => {
        if (menuItem === 'officeVideo') {
            setShowVideoPresentation(true);
        }
    };

    return (
        <div>
            <Header intl={intl} onMenuSelect={handleMenuSelect} />
            <HowItWorks />
            <ForClient />
            <Aviataxi />
            <Team />
            <Footer />
            {showVideoPresentation && (
                <VideoPresentationModal
                    onDismiss={() => setShowVideoPresentation(false)}
                />
            )}
        </div>
    );
});

const IndexPage = ({ pageContext: { locale } }) => (
    <Layout locale={locale}>
        <Content />
    </Layout>
);

export default IndexPage;
