import { Player } from '@/app/(adm)/home/(components)/player-slider'
import Image from 'next/image'
import StatusPlayers from './status-players'

interface PlayerCard {
  player: Player
}

export default function PlayerCard({ player }: PlayerCard) {
  return (
    <section className="flex flex-col items-center justify-center p-6 rounded-md [background:repeating-linear-gradient(30deg,_#1a5a13_0px,_#1a5a13_60px,_#196114_60px,_#196114_130px)]">
      <div className="bg-amber-200 rounded-md cursor-pointer">
        <div className="absolute top-10 ml-3">
          <StatusPlayers status="very_happy" />
          <p className="text-sm text-brown-700 font-semibold">
            {player.position}
          </p>
        </div>
        <div className="py-1 px-4">
          <Image
            src={player.photo}
            width={120}
            height={120}
            alt={player.name}
          />
          <p className="text-sm text-center text-brown-700 font-semibold">
            {player.name}
          </p>
        </div>
      </div>
    </section>
  )
}
