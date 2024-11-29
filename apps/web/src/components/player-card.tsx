import { Player } from '@/app/(adm)/home/(components)/player-slider';
import Image from 'next/image';
import StatusPlayers from './status-players';

interface PlayerCard {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCard) {
  return (
    <section className='flex flex-col items-center justify-center p-6 rounded-md [background:repeating-linear-gradient(30deg,_#1a5a13_0px,_#1a5a13_60px,_#196114_60px,_#196114_130px)]'>
      <div className='bg-amber-200 rounded-md cursor-pointer'>
        <div className='flex justify-end pt-2 px-2'>
          <StatusPlayers status='very_happy' />
        </div>

        <div className='flex flex-col items-center pb-2 px-4'>
          <Image
            src={player.photo}
            width={120}
            height={120}
            alt={player.name}
          />
          <p className='text-sm text-center text-brown-700 font-semibold'>
            {player.name}
          </p>
          <p className='text-sm text-brown-700 font-semibold'>
            {player.position}
          </p>
        </div>
      </div>
    </section>
  );
}
