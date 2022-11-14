import './sentence.scss'

import ChangeTitlePage from "../../helper/ChangeTitle";
import {useNavigate, useLocation} from 'react-router-dom'
import TitleInPage from "../../components/TitleInPage/TitleInPage";
import {useState, useEffect} from 'react'
import {getDataPage} from "../../services/pagesServeice";
import Loading from "../../components/Loading/Loading";
import {size} from "../../helper/data";
import {goTopAbove, preventDragHandler} from "../../helper/functions";

const Sentences = () => {

    //variables
    const navigate = useNavigate()
    const {state} = useLocation()
    // console.log(state)
    const [obj] = useState(state)
    const [loading, setLoading] = useState(false)
    const [sentences, setSentences] = useState([])

    //functions
    const initData = async () => {
        setLoading(true)
        try {
            const res = await getDataPage('sentences')
            if (res.status === 200) {
                const newArray = []
                res?.data?.SENTENCES?.categories?.map((item, index) => {
                    const obj = {...item, className: size[index]}
                    newArray.push(obj)
                })
                await setSentences(newArray)
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    useEffect(() => {
        initData()
        goTopAbove()
    }, [])

    return (
        <section className="sentences_page">
            <div className='inside'>
                <div className="inside_sentences_page">
                    <TitleInPage title='دسته بندی جملات'/>
                    {loading ? <Loading/> :
                        <div className="container_sentences">
                            {sentences.map((item, index) => (
                                <div key={index} className={`card_sentence_page ${item.className}`}
                                     onClick={() => navigate('/select-sentence', {
                                         state: {
                                             objData: obj,
                                             sentences: item,
                                         }
                                     })}>
                                    <img onDragStart={e => preventDragHandler(e)} src={item.active_image}
                                         className='img_sentence' alt=""/>
                                    <div className="info_sentence_card">
                                        <p>{item.title}</p>
                                        <p>{item?.sentences?.length} جمله</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                </div>
            </div>
            <ChangeTitlePage title='دسته بندی جملات'/>
        </section>
    )
}
export default Sentences