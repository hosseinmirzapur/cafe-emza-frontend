import styles from './detailOrder.module.scss'
import delivery_icon from './deivery_icon.svg'
import {findSize, numberWithCommas, preventDragHandler} from "../../helper/functions";
import product_pic from './product.png'
import {useLocation} from 'react-router-dom'

const DetailOrders = () => {

    const {state} = useLocation()
    return (
        <div className={styles.detail_order}>
            {/*<div className={`${styles.row}`}>*/}
            {/*    <div className={styles.location}>*/}
            {/*        <img src={delivery_icon} alt=""/>*/}
            {/*        <p>دریافت در محل</p>*/}
            {/*    </div>*/}
            <p className={styles.order_id}>سفارش {state?.order?.tracking_code}</p>
            {/*</div>*/}
            {/*<div className={styles.row}>*/}
            {/*    <p className={styles.total_price}>{numberWithCommas(20000)} تومان</p>*/}
            {/*    <p className={styles.label}>مجموع کل</p>*/}
            {/*</div>*/}
            {/*<div className={styles.row}>*/}
            {/*    <p className={styles.price_percentage}>{numberWithCommas(20000)} تومان</p>*/}
            {/*    <p className={styles.label}>تخفیف ها :</p>*/}
            {/*</div>*/}
            <div className={styles.row}>
                <p className={styles.finally_price}>{numberWithCommas(state?.order?.total_price)} تومان</p>
                <p className={styles.label}>مبلغ پرداخت شده :</p>
            </div>
            <div className={styles.container_cards}>
                {state?.order?.order_items.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <p className={styles.price}>{(numberWithCommas(item.price))} تومان</p>
                        <div className={styles.right_card}>
                            <div className={styles.info_card}>
                                <p className={styles.size}>{item.product} {findSize(item.size)}</p>
                                <p className={styles.quantity}> x {item.quantity}</p>
                            </div>
                            <div className={styles.container_image}>
                                <img onDragStart={e => preventDragHandler(e)} src={product_pic} alt=""/>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default DetailOrders