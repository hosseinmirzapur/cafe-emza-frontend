import styles from './firstSection.module.scss'
import {preventDragHandler} from "../../helper/functions";

const FirstSection = ({data}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {data[0]?<img onDragStart={e=>preventDragHandler(e)} src={data[0]?.image} className={styles.img1} alt=""/>:null}
                {data[1]?<img onDragStart={e=>preventDragHandler(e)} src={data[1]?.image} className={styles.img2} alt=""/>:null}
            </div>
            <div className={styles.bottom}>
                {data[2]?<img onDragStart={e=>preventDragHandler(e)} src={data[2]?.image} className={styles.img3} alt=""/>:null}
                {data[3]?<img onDragStart={e=>preventDragHandler(e)} src={data[3]?.image} className={styles.img4} alt=""/>:null}
            </div>
        </div>
    )
}
export default FirstSection