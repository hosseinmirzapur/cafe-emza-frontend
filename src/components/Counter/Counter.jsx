import styles from './counter.module.scss'
import pluss from './pluss.svg'
import mines from './new.svg'


const Counter = ({value, add, sub}) => {


    return (
        <div className={styles.counter}>
            <img onClick={() => add()} className={styles.img} src={pluss} alt=""/>
            <p className={styles.text}>{value}</p>
            <img onClick={() => sub()} src={mines} className={styles.img} alt=""/>
        </div>
    )
}
export default Counter