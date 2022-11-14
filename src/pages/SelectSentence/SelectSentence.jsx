import styles from './selectSentence.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import {useLocation} from 'react-router-dom'
import TitleInPage from "../../components/TitleInPage/TitleInPage";

import pic_back from './pic_back.svg'
import {Radio, RadioGroup} from "@mantine/core";
import {useState, useEffect} from 'react'
import SentenceItem from "../../components/SentenceItem/SentenceItem";
import Loading from "../../components/Loading/Loading";
import Leaf from "../../components/Leaf/Leaf";
import {goTopAbove} from "../../helper/functions";

const SelectSentence = () => {

    //variable
    const {state} = useLocation()
    const [cate, setCate] = useState(-1)
    const [sentences, setSentences] = useState([...state.sentences.sentences])
    const [tags, setTags] = useState([{body: 'همه', id: " -1"}, ...state.sentences.tags])
    const [loading, setLoading] = useState(false)
    // console.log(state)

    //functions
    const findSentences = async () => {
        setLoading(true)
        if (tags[0].id == -1 && cate == -1) {
            await setSentences(state?.sentences?.sentences)
        } else {
            const resArr = state?.sentences?.sentences.filter(item => item?.tag_id != null && item?.tag_id == cate)
            await setSentences(resArr)
        }
        setLoading(false)
    }
    useEffect(() => {
        findSentences()
    }, [cate, tags])
    useEffect(() => {
        goTopAbove()
    }, [])

    return (
        <section className={styles.select_sentence_page}>
            <img src={pic_back} className={styles.img_back} alt=""/>
            <div className='inside'>
                <div className={styles.inside}>
                    <TitleInPage title={state.sentences.title}/>
                    <div className={styles.container_divs}>
                        <div className={styles.container_sentences}>
                            {loading ? <Loading/> : sentences.map(item => (
                                <SentenceItem objData={state.objData} sentence={item}/>
                            ))}
                        </div>
                        <div className={styles.card_categories}>
                            <Leaf/>
                            <p className={styles.title}>دسته بندی جملات</p>
                            <div className={styles.container_options}>
                                <RadioGroup value={cate} onChange={setCate} defaultValue={tags[0].id}
                                            classNames={{
                                                label: styles.label_radio,
                                                radioWrapper: styles.radio_wrapper,
                                                radio: 'root_radio',
                                            }
                                            }
                                >
                                    {tags.map((item, index) => (
                                        <Radio key={index} value={item.id.toString()}
                                               label={<div className={styles.label}>
                                                   <p>{item.body}</p>
                                               </div>}/>
                                    ))}

                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChangeTitlePage title={'انتخاب جمله'}/>
        </section>
    )
}
export default SelectSentence
