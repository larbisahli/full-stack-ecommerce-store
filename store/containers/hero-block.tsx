import HeroBannerImg from '@store/assets/image/hero-banner-img.jpg';
import Search from '@store/components/search';
import { StickyContext } from '@store/contexts/sticky/sticky.provider';
import { useMedia } from '@store/helpers/use-media';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Waypoint } from 'react-waypoint';

export default function HeroBlock() {
  const isLargeScreen = useMedia('(min-width: 1024px)');

  const {
    state: { isSticky },
    dispatch
  } = useContext(StickyContext);
  const searchRef = useRef(null);
  useEffect(() => {
    if (isLargeScreen && !isSticky && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSticky, isLargeScreen]);
  const setSticky = useCallback(
    () => dispatch({ type: 'SET_STICKY' }),
    [dispatch]
  );

  const removeSticky = useCallback(
    () => dispatch({ type: 'REMOVE_STICKY' }),
    [dispatch]
  );

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === 'above') {
      setSticky();
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-f7 p-30px h-480px md:h-580px 2xxl:h-650px relative">
      <img
        src={HeroBannerImg}
        alt="hero-image"
        className="w-full h-full hidden md:flex absolute top-0 left-0 object-cover"
      />

      <div className="flex flex-col relative z-10 justify-center items-center w-full max-w-720px">
        <h1 className="font-normal font-30px text-gray-900 text-center mb-4">
          <span className="font-bold">Medsy</span> Provides You
          <span className="font-bold block">Safe Delivery</span>
        </h1>

        <p className="font-17px text-gray-700 lg:mb-60px text-center leading-loose">
          Get medicines at your home within 30 minutes.
        </p>
        {!isSticky && <Search ref={searchRef} className="hidden lg:flex" />}
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </div>
    </div>
  );
}
