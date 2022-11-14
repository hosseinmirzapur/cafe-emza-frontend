import styles from './notification.module.scss'
import Loading from "../../components/Loading/Loading";
import AddressItem from "../../components/AddressItem/AddressItem";
import ChangeTitlePage from "../../helper/ChangeTitle";
import {useState, useEffect} from 'react'
import handleErrors from "../../helper/handleErrors";
import {getNotifications} from "../../services/pagesServeice";
import NotificationItem from "../../components/NotificationItem/NotificationItem";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/actions/loginActions";

const Notification = () => {

    //variables
    const [showLoading, setLoading] = useState(true)
    const [notifications, setNotifications] = useState([])
    const dispatch = useDispatch()
    const initNotifications = async () => {
        setLoading(true)
        try {
            const res = await getNotifications()
            if (res.status === 200) {
                await setNotifications(res?.data?.notifications)
                console.log(res)
                setLoading(false)
                dispatch(setUser())
            }
        } catch (err) {
            setLoading(false)
            handleErrors(err)
        }
    }
    useEffect(() => {
        initNotifications()
    }, [])
    return (
        <section className={styles.notification_page}>
            {showLoading ? <Loading/> : notifications?.length > 0 ?
                notifications.map((notification, index) => (
                    <NotificationItem key={index} notification={notification}/>
                ))
                :
                <div className='alert alert-primary alert_text'>آدرس برای شما ثبت نشده است.</div>
            }

            <ChangeTitlePage title='اعلانات'/>
        </section>
    )
}
export default Notification