import {Fragment, useEffect} from 'react'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";
import {useLocation} from 'react-router-dom'
import bullets from '../../assets/images/bullet_coffes.svg'
import ButtonScrollToTop from "../../components/ButtonScrollToTop/ButtonScrollToTop";
import styles from './mainLayout.module.scss'

const MainLayout = ({children}) => {

    //variables
    const location = useLocation()
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        window.oncontextmenu = (e) => e.preventDefault()
    }, [location.pathname])
    return (
        <Fragment>
            <Header/>
            <HeaderMobile/>
            <div className={styles.container_main_layout}>
                <img src={bullets} className={styles.image_bullets_coffee} alt=""/>
                {children}
            </div>
            <ButtonScrollToTop/>
            {location.pathname.indexOf('login') > -1 ? null : <Footer/>}
        </Fragment>
    )
}
export default MainLayout
