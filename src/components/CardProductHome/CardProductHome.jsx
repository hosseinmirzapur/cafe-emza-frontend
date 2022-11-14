import styles from './CardProductHome.module.scss'
import {useSwiperSlide} from "swiper/react";
import {preventDragHandler} from "../../helper/functions";

const CardProductHome = ({product}) => {
    const {isActive} = useSwiperSlide();
    return (
        <div className={`${styles.card} ${isActive ? styles.active : ""}`}>
            <div className={styles.image}>
                <img onDragStart={e=>preventDragHandler(e)} src={product?.image} alt=""/>
            </div>
            <p className={styles.name}>{product?.name}</p>
        </div>
    )

}
export default CardProductHome