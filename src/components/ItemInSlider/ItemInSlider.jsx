import styles from './card.module.scss'
import * as AiIcons from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import rateIcon from './rate.svg'
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {numberWithCommas} from "../../helper/functions";

const ItemInSlider = ({product}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)

    const handleClickCard = async () => {
        if (login) {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }, 1000)
            navigate(`/product_market/${product.id}`)
        } else {
            toast.warning('برای افزودن این محصول به سبد خرید باید ابتدا وارد حساب کاربری خود شوید')
        }
    }
    return (
        <div
            onClick={() => handleClickCard()}
            className={styles.wrapper}
        >
            <div className={styles.container}>
                <div className={styles.top}>
                    <img src={product.image} alt=""/>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.details}>
                        <div className={styles.price}>
                            {numberWithCommas(product.price)} تومان
                        </div>
                        <div className={styles.container_name}>
                            <p>{product.name}</p>
                        </div>
                        <div className={styles.container_rate}>
                            <p>{product.rate_avg}</p>
                            <img src={rateIcon} alt=""/>
                        </div>

                    </div>
                    <div className={styles.buy2}>
                        < AiIcons.AiOutlineShoppingCart className={styles.icon}/>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ItemInSlider
