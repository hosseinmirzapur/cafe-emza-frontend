import styles from './cart.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import {useState, useEffect} from 'react'
import {getBasketData} from "../../services/buyService";
import {numberWithCommas} from "../../helper/functions";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import {useNavigate} from 'react-router-dom'

const Cart = () => {

    //variables
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [dataCart, setDataCart] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)

    //functions
    const initData = async () => {
        setLoading(true)
        const obj = {
            promotion_code: ''
        }
        try {
            const res = await getBasketData(obj)
            // console.log(res)
            if (res.status === 200) {
                await setDataCart(res?.data)
                console.log(res.data.cart_items)
                await setTotalPrice(res?.data?.total_price)
                setLoading(false)
            }

        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        initData()
    }, [])


    return (
        <section className={styles.cart_page}>
            <div className='inside'>
                <div className={styles.inside}>
                    {loading ? <Loading/> :
                        dataCart?.cart_items.length > 0 ?
                            <>
                                <div className={styles.container_titles}>
                                    <p className={styles.title}>شرح محصول</p>
                                    <p className={styles.title}>قیمت واحد <span>(تومان)</span></p>
                                    <p className={styles.title}>تعداد</p>
                                    <p className={styles.title}>مجموع <span>(تومان)</span></p>
                                </div>
                                {dataCart?.cart_items.map((item, index) => (
                                    <CartItem runFunction={() => initData()} key={index} cart={item}/>
                                ))}
                                <div className={styles.container_result}>
                                    <div className={styles.container_items}>
                                        <div className={styles.result_item}>
                                            <p className={styles.label}>جمع کل سبد خرید : </p>
                                            <p className={styles.price}>{numberWithCommas(totalPrice)}</p>
                                        </div>

                                    </div>
                                    <div className={styles.container_btn}>
                                        <button onClick={() => navigate('/payment')} className={styles.btn_next}>ادامه
                                            ثبت سفارش
                                        </button>
                                    </div>
                                </div>
                            </>
                            :
                            <p className='alert_text alert alert-primary'>سبد خرید شما خالی است.</p>
                    }
                </div>
            </div>
            <ChangeTitlePage title='سبد خرید'/>
        </section>
    )
}
export default Cart


