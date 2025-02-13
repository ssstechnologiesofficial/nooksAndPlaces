import React from 'react';
import Categories from './Categories';
import HeroSection from './HeroSection';
import TerracottaCollection from './TerracottaCollection';
import HandCraft from './HandCraft';
import NewArrival from './NewArrival';
import BestSeller from './BestSeller';

const Home = () => {
  return (
   <>
      <Categories />
      <HeroSection />
      <TerracottaCollection/>
      <HandCraft/>
      <NewArrival/>
      <BestSeller/>
    </>
  );
};

export default Home;
