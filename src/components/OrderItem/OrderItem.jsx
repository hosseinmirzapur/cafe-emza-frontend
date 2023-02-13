import styles from './orderItem.module.scss'
import clock_icon from './clock.svg'
import basket_icon from './basket.svg'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {findSize} from "../../helper/functions";
import {Badge} from "reactstrap";

const OrderItem = ({order}) => {
    // console.log(order)
    // variables
    const navigate = useNavigate()
    const [contains, setContains] = useState([])



    const initContainer = async () => {
        const arr = []
        order?.order_items.map(item => {
            const str = ` ${findSize(item.size)}  ${item?.product}   x${item.quantity}`
            arr.push(str)
        })
        await setContains(arr)
    }

    useEffect(() => {
        initContainer()
    }, [])
    return (
        <div className={styles.order_item} onClick={() => navigate('/dashboard/detail_order', {state: {order}})}>
            <div className={'text-center align-items-center justify-content-center mb-3'}>
                <Badge color={order?.active ? 'danger': 'success'} pill style={{
                    fontSize: "small"
                }}>
                    {
                        order?.active ? 'در حال آماده سازی' : 'تحویل داده شده'
                    }
                </Badge>
            </div>
            <div className={styles.top}>
                <div className={styles.section_date}>
                    <p>{order.created_at.split(" ")[0]}</p>
                    <img src={clock_icon} className={styles.img_clock} alt=""/>
                </div>
                <p className={styles.order_name}>{order?.tracking_code}</p>
            </div>
            <div className={styles.section_bottom}>
                <img src={basket_icon} alt=""/>
                <p className={styles.contains}>{contains?.join("،")}</p>
            </div>
        </div>
    )
}
export default OrderItem
