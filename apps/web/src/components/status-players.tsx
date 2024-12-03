import { Smile, Meh, Frown } from 'lucide-react';

type Status = 'very_happy' | 'happy' | 'neutral' | 'sad';

interface PlayersStatusProps {
  status: Status;
}

export default function PlayersStatus({ status }: PlayersStatusProps) {
  return (
    <div>
      {status === 'very_happy' ? (
        <Smile
          strokeWidth='1px'
          className='fill-green-400'
          absoluteStrokeWidth
          color='black'
          size={19}
        />
      ) : status === 'happy' ? (
        <Smile
          strokeWidth='1px'
          className='fill-green-400'
          absoluteStrokeWidth
          color='black'
          size={19}
        />
      ) : status === 'neutral' ? (
        <Meh
          strokeWidth='1px'
          className='fill-yellow-300'
          absoluteStrokeWidth
          color='black'
          size={19}
        />
      ) : status === 'sad' ? (
        <Frown
          strokeWidth='1px'
          className='fill-red-500'
          absoluteStrokeWidth
          color='black'
          size={19}
        />
      ) : null}
    </div>
  );
}
