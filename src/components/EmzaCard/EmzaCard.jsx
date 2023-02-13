import styles from './emzaCard.module.scss'
import rateIcon from './rate.svg'
import {useNavigate} from 'react-router-dom'
import cup from './cup.png'
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {preventDragHandler} from "../../helper/functions";
import {Fragment} from "react";
import {Badge} from "reactstrap";

const EmzaCard = ({product}) => {
    const navigate = useNavigate()
    const login = useSelector(state => state.login)
    return (
        <div key={product.id} className={styles.card}
             onClick={() => {
                 if (product.is_available) {
                     navigate(`/product_details/${product.id}`, {state: product})
                 } else {
                     toast.info('این محصول فعلا موجود نیست')
                 }
             }}>
            <div className={styles.container_image}>
                <img onDragStart={e => preventDragHandler(e)} src={product.image}
                     className={product.is_available ? styles.cup : styles.unavailable_cup}
                     onContextMenu={() => {
                         return false
                     }} alt=""/>
                {!product.is_available && <Fragment>
                    <Badge color={'danger'} style={{
                        top: 10,
                    }} pill className={'position-absolute'}>نا موجود</Badge>
                </Fragment>}
            </div>
            <div className={styles.container_top}>
                <div className={styles.left_top}>
                    <p className={styles.rate}>{product.rate_avg !== null ? product.rate_avg : 0}</p>
                    <img onDragStart={e => preventDragHandler(e)} src={rateIcon} alt=""/>
                </div>
                <p className={styles.name}>{product.name}</p>
            </div>
            <p className={styles.combine}>{product.ingredient}</p>
            <div className={styles.button_section}>
                <button disabled={!product.is_available} onClick={() => {
                    if (login) {
                        navigate(`/product_details/${product.id}`, {state: product})
                    } else {
                        toast.warning('برای خرید ابتدا باید حساب کاربری خود شوید.')
                        navigate(`/login`)
                    }

                }} className={styles.btn}>افزودن به
                    سبد
                    خرید
                </button>
            </div>
        </div>
    )
}
export default EmzaCard
