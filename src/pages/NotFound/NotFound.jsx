import styles from './404.module.scss'
import image404 from './404.png'
import pic_top from './pic_top.svg'
import pic_left from './pic_left.svg'
import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <section className={styles.not_found}>
            <img src={pic_top} className={styles.pic_top} alt=""/>
            <img src={pic_left} className={styles.pic_left} alt=""/>
            <img src={image404} className={styles.img_404} alt=""/>
            <p className={styles.text_not_found}>صفحه ی مورد نظر یافت نشد!!</p>
            <Link to='/'>
                <button className={styles.btn_404}>بازگشت به صفحه اصلی</button>
            </Link>
        </section>
    )
}
export default NotFound