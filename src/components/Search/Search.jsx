import styles from './search.module.scss'
import search_icon from './search_icon.svg'
import {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {useClickOutside} from '@mantine/hooks';

const Search = () => {

    //variables
    const ref = useClickOutside(() => setShowInput(false));
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const [showInput, setShowInput] = useState(false)
    const [showSelect, setShowSelect] = useState(false)
    const [stringKey, setStringKey] = useState("")

    //functions
    const focusInput = () => {
        setTimeout(() => {
            inputRef.current?.focus()
        }, 1000)
    }
    const handleShowSelect = () => {
        setTimeout(() => {
            setShowSelect(true)
        }, 800)
    }

    useEffect(() => {
        if (showInput) {
            handleShowSelect()
            focusInput()
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
export default Search