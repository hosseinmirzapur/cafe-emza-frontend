import styles from "./club.module.scss";
import ChangeTitlePage from "../../helper/ChangeTitle";
import TitleInPage from "../../components/TitleInPage/TitleInPage";
import FAQItems from "../../components/FAQItems/FAQItems";
import {useState, useEffect} from 'react'
import Loading from "../../components/Loading/Loading";
import handleErrors from "../../helper/handleErrors";
import {getDataPage} from "../../services/pagesServeice";
import {goTopAbove, preventDragHandler} from "../../helper/functions";
import parser from 'html-react-parser'
import {useNavigate} from "react-router-dom";

const Club = () => {

    //variable
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [customer_club, setCustomer_club] = useState({})
    const navigate = useNavigate()


    const initData = async () => {
        setLoading(true)
        const arrQuestion = []
        const arrAnswer = []
        const arrayResult = []
        try {
            const res = await getDataPage('club')
            if (res.status === 200) {
                res.data.CLUB.club_faqs.map(item => {
                    if (item.faq_id == null) {
                        arrQuestion.push(item)
                    } else {
                        arrAnswer.push(item)
                    }
                })
                arrAnswer?.map(item => {
                    const obj = arrQuestion.find(qu => qu.id === item.faq_id)
                    if (obj) {
                        const objData = {
                            answer: item.data,
                            question: obj.data
                        }
                        arrayResult.push(objData)
                    }
                })
                await setData(arrayResult)
                await setCustomer_club(res?.data?.CLUB?.customer_club)
            }

            setLoading(false)
            console.log(res?.data?.CLUB?.customer_club)
        } catch (err) {
            setLoading(false)
            handleErrors(err)
        }
    }

    useEffect(() => {
        // console.log(customer_club)
        initData()
        goTopAbove()
    }, [])
    return (
        <section className={styles.club_page}>
            {loading ? <Loading classs='loader'/> : <div className="inside">
                <div className={styles.top_club}>
                    <div className={styles.left_top}>
                        <img onDragStart={e => preventDragHandler(e)} src={customer_club.image} alt=""/>
                    </div>
                    <div className={styles.right_top}>
                        <p className={styles.title_top}>{customer_club?.title}</p>
                        <p className={styles.text_top}>
                            {parser(customer_club?.data)}
                        </p>
                        <div className={styles.container_btn_top}>
                            <button className="btn_login btnClub" onClick={() => {
                                navigate('/')
                            }}>مشتریان، وفادار کالاهای با کیفیت و شناسنامه دار
                                هستند.
                            </button>
                        </div>
                    </div>
                </div>
                <TitleInPage title="راهنمای باشگاه"/>
                <ChangeTitlePage title="باشگاه"/>
                {loading ? <Loading/> :
                    data.length > 0 ?
                        <div className='container_faqs'>
                            {data.map((item, index) => (
                                <FAQItems key={index} index={index} faq={item}/>
                            ))}
                        </div> :
                        <p className='w-100 mt-5 mb-5 alert alert-primary alert_text'>سوال و پرسشی ثبت نشده است.</p>
                }
                <div className={styles.button_club}>
                    <div className={styles.left_button}>
                        <div className={styles.card}>
                            <p className={styles.title_card}>{parser(customer_club.left_title)}</p>
                            <p className={styles.text_card}>{parser(customer_club.left_data)}</p>
                        </div>
                    </div>
                    <div className={styles.center_button}>
                        <img onDragStart={e => preventDragHandler(e)} src={customer_club.bottom_pic}
                             className={styles.pic_button} alt=""/>
                    </div>
                    <div className={styles.right_button}>
                        <div className={styles.card}>
                            <p className={styles.title_card}>{parser(customer_club.right_title)}</p>
                            <p className={styles.text_card}>{parser(customer_club.right_data)}</p>
                        </div>
                    </div>
                </div>
            </div>}
        </section>
    );
};
export default Club;

