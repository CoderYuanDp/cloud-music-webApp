import React, { useEffect, useState} from 'react'
import { SliderContainer } from './style';
import "swiper/dist/css/swiper.css";
import Swiper from 'swiper'

function Slider(props) {
  const [ sliderSwiper, setSliderSwiper ] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    if(bannerList.length && !sliderSwiper) {
      let newSlider = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination'
        }
      })
      setSliderSwiper(newSlider);
    }
  }, [bannerList.length, sliderSwiper])

  return (
    <SliderContainer>
      <div className='slider-container'>
        <div className='swiper-wrapper'>
          {
            bannerList.map(slider => {
              return (
                <div className='swiper-slide' key={slider.imageUrl}>
                  <div className='slider-nav'>
                    <img src={slider.imageUrl} width='100%' height='100%' alt='推荐'></img>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='swiper-pagination'></div>
      </div>
      <div className="before"></div>
    </SliderContainer>
  )
}

export default React.memo(Slider)