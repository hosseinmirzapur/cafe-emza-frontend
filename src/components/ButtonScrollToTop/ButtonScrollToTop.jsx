import styles from './buttonScrollToTop.module.scss'
import {useState, useEffect, useRef} from 'react'
import button_pic from './button.svg'
import {useLocation} from 'react-router-dom'

const ButtonScrollToTop = () => {

    // variables
    const [isVisable, setIsVisable] = useState(false)
    const refButton = useRef(null)
    const location = useLocation()

    //functions
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisable(true)
        } else {
            setIsVisable(false)
        }
    }
    const scrollToTop = () => {
        console.log("run to top")
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])


    return (
        <div ref={refButton} className={styles.container_btn} onClick={() => scrollToTop()}>
            <img src={button_pic} alt="" className={`${isVisable ? 'opacity-100' : 'opacity-0'} ${styles.btn}`}/>
        </div>
    )
}
export default ButtonScrollToTop