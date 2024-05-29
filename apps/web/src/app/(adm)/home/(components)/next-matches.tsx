import Image from 'next/image'
import BVB from '../../../../../public/bvb.png'
import RealMadrid from '../../../../../public/realmadrid.png'
import Card from '@/components/card'

export default function NextMatches() {
  return (
    <Card title="Próximo jogo">
      <div className="flex flex-col items-center gap-2">
        <div>
          <p>Liga dos Campeões sáb., 01/06, 16:00</p>
        </div>

        <div className="flex items-center space-x-7">
          <Image src={BVB} width={50} height={50} quality={100} alt="" />
          <span>x</span>
          <Image src={RealMadrid} width={50} height={50} quality={100} alt="" />
        </div>
      </div>
    </Card>
  )
}
