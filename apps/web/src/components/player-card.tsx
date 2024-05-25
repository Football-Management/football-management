import { Player } from '@/app/(adm)/home/(components)/player-slider'
import Image from 'next/image'
import StatusPlayers from './status-players'

interface PlayerCard {
  player: Player
}

export default function PlayerCard({ player }: PlayerCard) {
  return (
    <section className="flex flex-col items-center justify-center  p-6 rounded-md">
      <div className="bg-slate-500 rounded-md cursor-pointer">
        <div className="flex justify-end p-1">
          <StatusPlayers status="very_happy" />
        </div>
        <div className="py-1 px-4">
          <Image
            src={player.photo}
            width={120}
            height={120}
            alt={player.name}
          />
          <p className="text-sm text-white">{player.name}</p>
          <p className="text-md text-white font-semibold">{player.position}</p>
        </div>
      </div>
    </section>
  )
}
