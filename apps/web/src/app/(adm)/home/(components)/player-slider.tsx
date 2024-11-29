'use client';

import PlayerCard from '@/components/player-card';
import SliderCoverflow from '@/components/slider/slider-coverflow';

import { SwiperSlide } from 'swiper/react';

export type Player = {
  photo: string;
  name: string;
  position: string;
};

interface PlayerSliderProps {
  players: Player[];
}

export function PlayerSlider({ players }: PlayerSliderProps) {
  return (
    <SliderCoverflow>
      {players.map((player, index) => (
        <SwiperSlide key={index}>
          <PlayerCard player={player} />
        </SwiperSlide>
      ))}
    </SliderCoverflow>
  );
}
