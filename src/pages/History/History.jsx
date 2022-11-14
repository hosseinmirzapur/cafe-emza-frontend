import styles from './history.module.scss'
import OrderItem from "../../components/OrderItem/OrderItem";
import {useState, useEffect} from 'react'
import {allHistory} from "../../services/pagesServeice";
import Loading from "../../components/Loading/Loading";

const History = () => {
    //variable
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])

    //functions
    const initOrders = async () => {
        setLoading(true)
        const res = await allHistory()
        if (res.status === 200) {
            await setOrders(res?.data?.orders)
            setLoading(false)
        }
    }

    useEffect(() => {
        initOrders()
    }, [])

    return (
        <>
            {loading ? <Loading/> : orders.length > 0 ?
                orders?.map((order, index) => (
                    <OrderItem key={index} order={order}/>
                ))
                :
                <p className='alert_text alert alert-primary'>سفارشی برای شما ثبت نشده است.</p>}
        </>
    )
}
export default History