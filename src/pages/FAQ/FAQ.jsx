import './faqs.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import TitleInPage from "../../components/TitleInPage/TitleInPage";
import FAQItems from "../../components/FAQItems/FAQItems";
import wave from '../../assets/images/wave_faqs.svg'

import {useState, useEffect} from 'react'
import handleErrors from "../../helper/handleErrors";
import {getDataPage} from "../../services/pagesServeice";
import Loading from "../../components/Loading/Loading";
import {goTopAbove, scrollToTopFunction} from "../../helper/functions";

const FAQ = () => {

    // scrollToTopFunction()
    //variable
    const [loading, setLoading] = useState(true)
    const [faqs, setFaqs] = useState([])

    //functions
    window.addEventListener('load', () => {
        console.log('DOM fully loaded and parsed');
    });

    const initData = async () => {
        setLoading(true)
        const arrQuestion = []
        const arrAnswer = []
        const arrayResult = []
        try {
            const res = await getDataPage('faq')
            if (res.status === 200) {
                res.data.FAQ.faq.map(item => {
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
                    // scrollToTopFunction()
                })
                await setFaqs(arrayResult)
                // scrollToTopFunction()
            }

            setLoading(false)

        } catch (err) {
            setLoading(false)
            handleErrors(err)
        }
    }

    useEffect(() => {
        window.addEventListener('load', () => {
            console.log('DOM fully loaded and parsed useEffect');
        });
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })
        // scrollToTopFunction()
        initData()
        goTopAbove()
    }, [])
    return (
        <section className='faqs_page'>
            <div className='inside'>
                <div className='inside_faq_page'>
                    <img src={wave} className='image_wave' alt=""/>
                    <TitleInPage title='سوالات متداول'/>
                    {loading ? <Loading height='500px'/> :
                        faqs.length > 0 ?
                            <div className='container_faqs'>
                                {faqs.map((item, index) => (
                                    <FAQItems faq={item} key={index} index={index}/>
                                ))}
                            </div> :
                            <p className='w-100 mt-5 alert alert-primary alert_text'>سوال و پرسشی ثبت نشده است.</p>
                    }
                </div>
            </div>
            <ChangeTitlePage title='سوالات متداول'/>
        </section>
    )
}
export default FAQ