import styles from './navigationSlider.module.scss'
import {useSwiper} from "swiper/react";
import arrowLeft from './arrowLeft.svg'
import arrowRight from './arrowRight.svg'

const NavigationSlider = ({slidesLength}) => {
    const swiper = useSwiper();
    const position = `calc((100% - (${slidesLength * 12}px + ${
        10 * (slidesLength - 1)
    }px + 48px + 28px)) / 2)`;

    return (
        <>
            <button
                type={"button"}
                className={styles.navigation}
                style={{right: position}}
                onClick={() => swiper.slidePrev()}
            >
                <img src={arrowRight} alt=""/>
            </button>

            <button
                type={"button"}
                className={`${styles.navigation} ${styles.previous}`}
                style={{left: position}}
                onClick={() => swiper.slideNext()}
            >
                <img src={arrowLeft} alt=""/>

            </button>
        </>
    )
}
export default NavigationSlider