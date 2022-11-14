import styles from './returnPage.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import img from './pic.png'
import {useState, useEffect} from 'react'
import Loading from "../../components/Loading/Loading";
import handleErrors from "../../helper/handleErrors";
import {rankVerify} from "../../services/pagesServeice";

const ReturnPage = () => {


    const [loading, setLoading] = useState(true)
    const params = new URLSearchParams(window.location.search)
    const [status] = useState(params.get('Status'))
    const obj = {
        Authority: params.get('Authority'),
        Status: params.get('Status')
    }
    const initData = async () => {
        setLoading(true)
        try {
            const res = await rankVerify(obj)
            if (res.status === 200) {
                setLoading(false)
                console.log(res)
            }
        } catch (err) {
            handleErrors(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        initData()
    }, [])

    return (
        <div className={styles.return_page}>
            {loading ? <Loading/> : <div className={styles.inside}>
                <p className={styles.title}>سفارش شما با موفقیت ثبت {status ==='OK'?'شد':'نشد'}.</p>
                <img src={img} className={styles.img} alt=""/>
                {/*<p className={styles.text}>*/}
                {/*    سفارش شما به دست همکاران ما رسید و تا دقایقی دیگر آماده خواهد شد اگر مشکلی در دریافت سفارش داشتید*/}
                {/*    میتوانید با کد زیر آن را پیگیری نمایید.*/}
                {/*</p>*/}
            </div>}
            <ChangeTitlePage title='گزارش پرداخت'/>
        </div>
    )
}
export default ReturnPage