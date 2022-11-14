import styles from './sentenceItem.module.scss'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const SentenceItem = ({sentence, objData}) => {

    //variable
    const [sentence_language, setLanguage] = useState(sentence.farsi_text !== null ? 'فارسی' : 'انگلیسی')
    const navigate = useNavigate()
    //functions
    const handleChangeLanguage = (e) => {
        e.stopPropagation()
        if (sentence_language === 'فارسی') {
            setLanguage('انگلیسی')
        } else {
            setLanguage('فارسی')
        }
    }
    return (
        <div className={styles.item} onClick={() => navigate('/select-frame', {
            state: {
                obj: {...objData, sentence_id: sentence.id, sentence_language},
                sentence,
                language: sentence_language
            }
        })}>
            {sentence_language === 'فارسی' ?
                <p className={styles.persian_text}>{sentence.farsi_text}</p>
                :
                <p className={styles.english_text}>{sentence.english_text}</p>
            }
            {sentence.english_text != null ?
                <div className={styles.container_btn}>
                    <button className={sentence_language === 'انگلیسی' ? `${styles.btn} ${styles.active}` : styles.btn}
                            onClick={(e) => handleChangeLanguage(e)}>{sentence_language === 'فارسی' ? 'انگلیسی' : 'فارسی'}</button>

                </div>
                : null}
        </div>
    )
}
export default SentenceItem
