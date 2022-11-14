import styles from './rules.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import imageCup from './pic_cup.png'
import imageBack from './back.svg'
import {useState, useEffect} from 'react'

import TitleInPage from "../../components/TitleInPage/TitleInPage";
import Leaf from "../../components/Leaf/Leaf";
import handleErrors from "../../helper/handleErrors";
import {terms} from "../../services/pagesServeice";
import parser from 'html-react-parser'
import Loading from "../../components/Loading/Loading";
import {goTopAbove, scrollToTopFunction} from "../../helper/functions";

const Rules = () => {

    // scrollToTopFunction()
    // window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth'
    // })

    //variable
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

    const initData = async () => {
        setLoading(true)
        try {
            const res = await terms()
            if (res.status === 200) {
                await setData(res.data.terms.body)
                setLoading(false)
                // scrollToTopFunction()
            }
        } catch (err) {
            setLoading(false)
            handleErrors(err)
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })

        initData()
        goTopAbove()
    }, [])


    return (
        <section className={styles.rules_page}>
            <img src={imageBack} className={styles.pic_back} alt=""/>
            {loading ? <Loading/> :
                <div className='inside'>
                    <div className={styles.inside_rules}>
                        <div className={styles.header}>
                            <img className={styles.pic_cup} src={imageCup} alt=""/>
                            <TitleInPage title='قوانین و مقررات'/>
                        </div>
                        <div className={styles.container}>
                            <Leaf className={styles.leaf}/>
                            {parser(data)}
                        </div>
                    </div>
                </div>
            }
            <ChangeTitlePage title='قوانین و مقررات'/>
        </section>
    )
}
export default Rules