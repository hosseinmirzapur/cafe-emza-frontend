import styles from './secound.module.scss'
import {preventDragHandler} from "../../helper/functions";

const SectionSecound = ({data}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {data[5] ? <img onDragStart={e=>preventDragHandler(e)} src={data[5]?.image} className={styles.img1} alt=""/> : null}
                {data[6] ? <img onDragStart={e=>preventDragHandler(e)} src={data[6]?.image} className={styles.img2} alt=""/> : null}
            </div>
            <div className={styles.bottom}>
                {data[7] ? <img onDragStart={e=>preventDragHandler(e)} src={data[7]?.image} className={styles.img3} alt=""/> : null}
                {data[8] ? <img onDragStart={e=>preventDragHandler(e)} src={data[8]?.image} className={styles.img4} alt=""/> : null}
            </div>
        </div>
    )
}
export default SectionSecound