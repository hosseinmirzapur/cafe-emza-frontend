import styles from './centerImage.module.scss'
import {preventDragHandler} from "../../helper/functions";

const CenterImage = ({img}) => {
    return (
        <div className={styles.container}>
            <img onDragStart={e=>preventDragHandler(e)} src={img.images[4].image} alt=""/>
        </div>
    )
}
export default CenterImage