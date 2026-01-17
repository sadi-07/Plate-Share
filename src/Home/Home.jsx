import React from 'react';
import Banner from './Banner';
import FeatureFoods from './FeatureFoods';
import HowItWorks from './HowItWorks';
import Mission from './Mission';
import CommunityStats from './CommunityStats';
import Highlights from './Highlights';
import Reviews from './Reviews';
import FAQhome from './FAQhome';
import NewsLetter from './NewsLetter';
import FoodJourney from './FoodJourney';

const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <FeatureFoods></FeatureFoods>
            <HowItWorks></HowItWorks>
            <FoodJourney></FoodJourney>
            <Highlights></Highlights>
            <Mission></Mission>
            <Reviews></Reviews>
            <CommunityStats></CommunityStats>
            <FAQhome></FAQhome>
            
            <NewsLetter></NewsLetter>
            
        </div>
    );
};

export default Home;