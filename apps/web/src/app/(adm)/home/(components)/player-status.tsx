import { api } from '@/data/api';
import { PlayerSlider } from './player-slider';
import Card from '@/components/card';

async function getPlayers() {
  const response = await api('players', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  const players = response.json();
  return players;
}

export async function PlayerStatus() {
  const players = await getPlayers();

  return (
    <Card title='Prévia Elenco'>
      <PlayerSlider players={players} />
    </Card>
  );
}
