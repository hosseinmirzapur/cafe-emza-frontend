import styles from './titleInPage.module.scss'
import backTitle from '../../assets/images/back_title.svg'

const TitleInPage = ({title}) => {
    return (
        <div className={styles.container_title}>
            <div className={styles.div_title}>
                <img className={styles.image_title} src={backTitle} alt=""/>
                <p className={styles.title}>{title}</p>
            </div>
        </div>
    )
}
export default TitleInPage