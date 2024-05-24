import { Player } from '@/app/(adm)/home/(components)/player-slider'
import Image from 'next/image'

interface PlayerCard {
  player: Player
}

export default function PlayerCard({ player }: PlayerCard) {
  return (
    <div>
      <Image src={player.photo} width={90} height={90} alt={player.name} />
      <p className="text-sm text-white">{player.name}</p>
      <p className="text-md text-white font-semibold">{player.position}</p>
    </div>
  )
}
