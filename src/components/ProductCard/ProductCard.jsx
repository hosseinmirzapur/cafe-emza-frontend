import styles from './productCard.module.scss'
import {numberWithCommas, preventDragHandler} from "../../helper/functions";
import ReactStars from "react-rating-stars-component";
import {useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const ProductCard = ({product}) => {
    //variables
    const navigate = useNavigate()
    const login = useSelector(state => state.login)
    //functions
    const handleBuy = (e) => {
        e.stopPropagation();
        console.log('buy')
    }
    const handleGoProductDetails = id => {
        if (login) {
            navigate(`/product_market/${id}`)
        } else {
            toast.info('لطفا ابتدا وارد سایت شوید.')
            navigate(`/login`)

        }
    }
    return (
        <div className={styles.card} onClick={() => handleGoProductDetails(product?.id)}>
            <div className={styles.container_image}>
                <img onDragStart={e=>preventDragHandler(e)} src={product?.image} className={styles.product_image} alt=""/>
            </div>
            {/*{product?.growth_parts ? <p>منطقه کشت {product?.growth_parts[0]?.title}</p> : null}*/}
            {/*{product?.coffee_types ? <p>نوع قهوه {product?.coffee_types[0]?.title}</p> : null}*/}
            {/*{product?.mill_types ? <p>نوع آسیاب {product?.mill_types[0]?.title}</p> : null}*/}
            {/*{product?.bean_types ? <p>نوع دانه {product?.bean_types[0]?.title}</p> : null}*/}
            <div className={styles.container_center}>
                <ReactStars
                    count={5}
                    // value={product?.rate_avg !== null ? parseInt(product?.rate_avg) : 0}
                    value={product?.rate_avg}
                    edit={false}
                    size={18}
                    activeColor="var(--emza)"
                />
                <p className={styles.product_name}>{product?.name}</p>
            </div>
            <div className={styles.container_bottom}>
                <button onClick={(e) => handleBuy(e)} className={styles.btn}>افزودن به سبد</button>
                <p className={styles.price}>{numberWithCommas(product?.price)} تومان</p>
            </div>
        </div>
    )
}
export default ProductCard