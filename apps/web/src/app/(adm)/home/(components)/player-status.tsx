import { api } from '@/data/api'
import PlayerSlider from './player-slider'

async function getPlayers() {
  const response = await api('players', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const players = response.json()
  return players
}

export async function PlayerStatus() {
  const players = await getPlayers()

  return (
    <div>
      <PlayerSlider players={players} />
    </div>
  )
}
