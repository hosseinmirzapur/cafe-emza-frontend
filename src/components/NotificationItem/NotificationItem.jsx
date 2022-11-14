import styles from './notificationItem.module.scss'
import activeImage from './active.svg'
import inActiveImage from './inActive.svg'


const NotificationItem = ({notification}) => {
    return (
        <div className={styles.container_notification}>
            <p>{notification.created_at}</p>
            <div className={styles.right}>
                <p className={notification.active === 0 ? styles.text_inactive : styles.text_active}>{notification.text}</p>
                <img className={styles.img} src={notification.active === 0 ? inActiveImage : activeImage} alt=""/>
            </div>
        </div>
    )
}
export default NotificationItem