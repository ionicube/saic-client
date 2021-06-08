import React, {
  useState,
  useEffect
} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Navigation = ({
  swiper
}) => {
  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }
  const [swiperNavStatus, setSwiperNavStatus] = useState(0)
  const swiperNavStatuses = {
    isBeginning: 0,
    isEnd: 1,
    isCentered: 2
  }
  useEffect(() => {
    if (swiper !== null) {
      swiper.on('slideChange', () => setSwiperNavStatus(
        swiper.isBeginning
          ? swiperNavStatuses.isBeginning
          : (
              swiper.isEnd ? swiperNavStatuses.isEnd : swiperNavStatuses.isCentered
            )
      ))
    }
  }, [swiper])
  return (
    <>
      {
        swiper && (swiper.allowSlideNext || swiper.allowSlidePrev) && (
          <div className='buttons'>
            <button
              onClick={goPrev}
              className={classNames(
                'swiper-navigation-button',
                'swiper-navigation-button-prev',
                'iconfont',
                'icon-arrow-left', {
                  'navigation-button-disabled': swiperNavStatus === swiperNavStatuses.isBeginning
                })}
            />
            <button
              onClick={goNext}
              className={classNames(
                'swiper-navigation-button',
                'swiper-navigation-button-next',
                'iconfont',
                'icon-arrow-right', {
                  'navigation-button-disabled': swiperNavStatus === swiperNavStatuses.isEnd
                })}
            />
          </div>
        )
      }
      {/* language=CSS */}
      <style jsx>{`
        .buttons {
          margin-top: 2rem;
          margin-bottom: 0;
          justify-content: center;
        }
        .swiper-navigation-button {
          border: 1px solid #005aab;
          width: 48px;
          height: 48px;
          font-size: 24px;
          border-radius: 50%;
          color: #ffb361;
          outline: 0;
          background: transparent;
          transition: all 300ms cubic-bezier(0.65, 0, 0.35, 1);
        }
        .swiper-navigation-button:not(.navigation-button-disabled):hover {
          color: #ff8e15;
          border-color: #004d92;
          transform: scale3d(1.02, 1.02, 1.02) translate3d(0, 0, 10px);
          box-shadow: 0 14px 26px -12px rgba(50, 155, 220, .12),
              0 4px 23px 0 rgba(0, 0, 0, .08),
              0 8px 10px -5px rgba(50, 155, 220, .075)
        }
        .swiper-navigation-button + .swiper-navigation-button {
          margin-left: 2rem;
        }
        .navigation-button-disabled {
          opacity: .5
        }
      `}
      </style>
    </>
  )
}
Navigation.propTypes = {
  swiper: PropTypes.object
}
export default Navigation
