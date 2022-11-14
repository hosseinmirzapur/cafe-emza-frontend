
import styles from './navigationEmza.module.scss'
import {useSwiper} from "swiper/react";
import nextImage from './right.svg'
import preImage from './left.svg'

const NavigationEmza = () => {
    const swiper = useSwiper();
    return (
        <div className={styles.container}>
            <div className={styles.btn_right} onClick={() => swiper.slidePrev()}>
                <img src={nextImage} className={styles.arrow_right} alt=""/>
            </div>
            <div className={styles.btn_left} onClick={() => swiper.slideNext()}>
                <img src={preImage} className={styles.arrow_left} alt=""/>
            </div>
        </div>
    )
}
export default NavigationEmza