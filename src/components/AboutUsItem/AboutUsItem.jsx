import styles from './aboutUsItem.module.scss'
import TitleInPage from "../TitleInPage/TitleInPage";
import parser from 'html-react-parser'
import {preventDragHandler} from "../../helper/functions";

const AboutUsItem = ({item, key_item}) => {
    if (key_item % 2 !== 0) {
        return (
            <section className={styles.item}>
                <div>
                    <div className={styles.container_title}>
                        <TitleInPage title={item.title}/>
                    </div>
                    <div className={styles.text_section}>
                        {parser(item.data)}
                    </div>
                </div>
                <div className={styles.container_image}>
                    <img onDragStart={e=>preventDragHandler(e)} src={item.image} className={styles.img} alt=""/>
                </div>
            </section>
        )
    } else {
        return (
            <section className={styles.item}>
                <div className={styles.container_image}>
                    <img onDragStart={e=>preventDragHandler(e)} src={item.image} className={styles.img} alt=""/>
                </div>
                <div>
                    <div className={styles.container_title}>
                        <TitleInPage title={item.title}/>
                    </div>
                    <div className={styles.text_section}>
                        {parser(item.data)}
                    </div>
                </div>

            </section>
        )
    }

}
export default AboutUsItem