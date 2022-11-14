import styles from './applicationHome.module.scss'
import pic1 from './mobile.png'
import pic2 from './pic2.png'
import sib from "../Footer/sib.svg";
import iapps from "../Footer/iapps.svg";
import google from "../Footer/google.svg";
import bazzar from "../Footer/bazar.svg";
import Leaf from "../Leaf/Leaf";
import {preventDragHandler} from "../../helper/functions";
// import pic from './pic'

const ApplicationHome = () => {
    return (
        <section className={styles.application_section}>
            <div className='inside'>
                <div className={styles.inside}>
                    <div className={styles.left}>
                        <p className={styles.text}>
                            <Leaf className={styles.leaf}/>
                            با نصب کردن اپلیکیشن ما میتوانید قهوه دلخواه خود را با امضا دلخواه
                            خود سفارش دهید و روز خود
                            را بسازید</p>
                        <div className={styles.container_buttons}>
                            {/*<img onDragStart={e=>preventDragHandler(e)} src={sib} alt=""/>*/}
                            {/*<img onDragStart={e=>preventDragHandler(e)} src={iapps} alt=""/>*/}
                            <img onDragStart={e=>preventDragHandler(e)} src={google} alt=""/>
                            <img onDragStart={e=>preventDragHandler(e)} src={bazzar} alt=""/>
                        </div>

                    </div>
                    <div className={styles.right}>
                        <img onDragStart={e=>preventDragHandler(e)} src={pic1} className={styles.pic1} alt=""/>
                        <img onDragStart={e=>preventDragHandler(e)} src={pic2} className={styles.pic2} alt=""/>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ApplicationHome