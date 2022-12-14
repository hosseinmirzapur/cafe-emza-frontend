import styles from './contactUs.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import ButtonContactUs from "../../components/ButtomContactUs/ButtonContactUs";
import Leaf from "../../components/Leaf/Leaf";
import {useState, useEffect} from 'react'
import handleErrors from "../../helper/handleErrors";
import {getDataPage} from "../../services/pagesServeice";
import Loading from "../../components/Loading/Loading";
import parser from 'html-react-parser'
import {goTopAbove, preventDragHandler} from "../../helper/functions";

const ContactUs = () => {
    //variable
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [branches, setBranches] = useState([])
    const [settings, setSettings] = useState({})

    //function
    const initData = async () => {
        setLoading(true)
        const arrayBranche = []
        try {
            const res = await getDataPage('contact_us')
            if (res.status === 200) {
                await setData(res.data.CONTACT_US.data.contact_us)
                res.data.CONTACT_US.data.branches.map(item => {
                    const obj = {...item, value: item.id, label: item.name}
                    arrayBranche.push(obj)
                })
                await setBranches(arrayBranche)
                await setSettings(res.data.CONTACT_US.data.settings)
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            handleErrors(err)
        }
    }

    useEffect(() => {
        initData()
        goTopAbove()
    }, [])


    return (
        <section className={styles.contact_us_page}>
            {loading ? <Loading classs='loader'/> :
                <>
                    <div className='inside'>
                        <div className={styles.inside_contact_us}>
                            <div className={styles.left}>
                                <img onDragStart={e => preventDragHandler(e)} src={data?.image} alt=""/>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.card}>
                                    <p className={styles.title}>{data?.title}</p>
                                    <p className={styles.text}>{parser(data?.data)}</p>
                                    <Leaf/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ChangeTitlePage title='ارتباط با ما'/>
                    <ButtonContactUs branches={branches} settings={settings}/>
                </>
            }
        </section>
    )
}
export default ContactUs
