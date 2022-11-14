import styles from './rate.module.scss'
import {useSelector} from "react-redux";
import copyIcon from '../../assets/images/copy.svg'
import {copyTextToClipboard, numberWithCommas, preventDragHandler} from "../../helper/functions";
import {dataRate} from "./data";
import ChangeTitlePage from "../../helper/ChangeTitle";
import {useState} from "react";
import handleErrors from "../../helper/handleErrors";
import {changeRank} from "../../services/pagesServeice";

const Rate = () => {

    //variable
    const user = useSelector(state => state.user)
    const option = useSelector(state => state.option)
    const [isDisable, setIsDisable] = useState(false)
    const {referral_code} = user

    //functions
    const findDisable = (rank_id) => {
        if (user?.user_rank === 0) {
            return false
        } else if (user?.user_rank === 3) {
            return true
        } else if (user?.user_rank >= rank_id) {
            return true
        }
    }

    const handleRank = async id => {
        const obj = {
            rank_id: id
        }
        setIsDisable(true)
        try {
            const res = await changeRank(obj)
            if (res.status === 200) {
                const a = document.createElement('a')
                a.href = res?.data?.link
                // a.target = '_blank'
                a.click()
                a.remove()
                setIsDisable(false)
            }
        } catch (err) {
            setIsDisable(false)
            handleErrors(err)
        }
    }

    return (
        <section className={styles.rate}>
            <div className={styles.top_rate}>
                <div className={styles.left_top}>
                    <p className={styles.text_left_top}>با دعوت دوستان خود به امضا کافه از ما امتیاز بگیرید.</p>
                    <div className={styles.container_code}>
                        <img onDragStart={e=>preventDragHandler(e)} onClick={() => copyTextToClipboard(referral_code, 'کد مورد نظر کپی شد')} src={copyIcon}
                             className={styles.copy} alt=""/>
                        <p>{referral_code}</p>
                    </div>
                </div>
                <div className={styles.right_top}>
                    <p className={styles.title_rate}>مجموع امتیاز های من :</p>
                    <p className={styles.text_rate}>{numberWithCommas(user?.credit !== null ? user?.credit?.value : 0)} امتیاز</p>
                </div>
            </div>
            <div className={styles.container_levels}>
                {dataRate.map((item, index) => (
                    <div key={index} className={styles.card_level}>
                        <img onDragStart={e=>preventDragHandler(e)} src={item.img} alt=""/>
                        <p className={styles.text_level}>{item.title}</p>
                        <button onClick={() => handleRank(item.rank_id)}
                                disabled={isDisable || findDisable(item.rank_id)}
                                className={styles.btn}>ارتقا
                        </button>
                    </div>
                ))}
            </div>
            <ChangeTitlePage title='امتیاز'/>
        </section>
    )
}
export default Rate