import React from 'react';
import Banner from './Banner';
import FeatureFoods from './FeatureFoods';
import HowItWorks from './HowItWorks';
import Mission from './Mission';
import CommunityStats from './CommunityStats';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureFoods></FeatureFoods>
            <HowItWorks></HowItWorks>
            <Mission></Mission>
            <CommunityStats></CommunityStats>
        </div>
    );
};

export default Home;