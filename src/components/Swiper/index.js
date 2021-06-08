import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Scrollbar,
  Autoplay,
  EffectFade,
  A11y,
  Thumbs
} from 'swiper'
SwiperCore.use([
  Navigation,
  Pagination,
  Mousewheel,
  Scrollbar,
  Autoplay,
  EffectFade,
  A11y,
  Thumbs
])
export * from 'swiper/react'
export {
  default as SwiperNavigation
} from './Navigation'
