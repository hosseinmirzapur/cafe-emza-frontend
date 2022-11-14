import {useSwiperSlide} from "swiper/react";
import styles from './cardBestSelling.module.scss'
import rateIcon from './rate.svg'
import {useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {preventDragHandler} from "../../helper/functions";

const CardBestSelling = ({product}) => {

    const login = useSelector(state => state.login)
    const {isActive} = useSwiperSlide();
    const navigate = useNavigate()
    //functions
    const handleClick = (id) => {
        if (login) {
            navigate(`/product_market/${id}`)
        } else {
            toast.info('لطفا وارد شوید.')
            navigate(`/login`)
        }
    }
    return (
        <div onClick={() => handleClick(product.id)} className={`${styles.card} ${isActive ? styles.active : ""}`}>
            <div className={styles.container_image}>
                <img onDragStart={e=>preventDragHandler(e)} src={product.image} className={styles.img} alt=""/>
            </div>
            <div className={styles.container_info}>
                <p className={styles.name}>{product.name}</p>

                <div className={styles.rating}>
                    <img onDragStart={e=>preventDragHandler(e)} src={rateIcon} alt=""/>
                    <p>{product.rate_avg !== null ? product.rate_avg : 0}</p>
                </div>
            </div>
            <div className={styles.container_button}>
                <button  className={styles.btn}>افزودن به سبد</button>
            </div>
        </div>
    )
}
export default CardBestSelling