import styles from './search.module.scss'
import {useState, useEffect, useRef} from 'react'
import search_icon from "../Search/search_icon.svg";
import {useNavigate} from "react-router-dom";
import {useClickOutside} from '@mantine/hooks';

const SearchMobile = () => {

    //variables
    const inputRef = useRef(null)
    const ref = useClickOutside(() => setShowInput(false));
    const [showInput, setShowInput] = useState(false)
    const [showSelect, setShowSelect] = useState(false)
    const [stringKey, setStringKey] = useState("")
    const navigate = useNavigate()

    //functions
    const handleShowSelect = () => {
        setTimeout(() => {
            setShowSelect(true)
        }, 800)
    }
    const handleFocus = () => {
        setTimeout(() => {
            inputRef.current.focus()
        }, 1000)
    }
    useEffect(() => {
        if (showInput) {
            handleShowSelect()
            handleFocus()
        } else {
            setShowSelect(false)
        }
    }, [showInput])

    return (
        <div ref={ref} className={showInput ? `${styles.container_search} ${styles.active}` : styles.container_search}
             onKeyDown={e => {
                 if (e.key === 'Enter' && stringKey.length > 0) {
                     navigate(`/search/${stringKey}`)
                     setStringKey("")
                     setShowInput(false)
                 }
             }}
        >
            <div onClick={() => setShowInput(!showInput)} className={styles.container_icon}>
                <img src={search_icon} alt=""/>
            </div>
            {showSelect &&
                <input type="text" value={stringKey}
                       className={styles.text_input} ref={inputRef}
                       onChange={e => setStringKey(e.target.value)} placeholder="جستجو"/>
            }
        </div>
    )
}
export default SearchMobile