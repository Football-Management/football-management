'use client'

import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/swiper-bundle.css'

import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import { ReactNode } from 'react'

interface SliderCoverflowProps {
  children: ReactNode
}

export default function SliderCoverflow({ children }: SliderCoverflowProps) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      navigation
      modules={[Pagination, Navigation, EffectCoverflow]}
    >
      {children}
    </Swiper>
  )
}
