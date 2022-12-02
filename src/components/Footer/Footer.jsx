import styles from './footer.module.scss'
import whatsapp from './whatsapp.svg'
import youtube from './youtube.svg'
import instagram from './instagram.svg'
import twitter from './twitter.svg'
import background from './back_footer.jpg'
import sib from './sib.svg'
import iapps from './iapps.svg'
import google from './google.svg'
import bazzar from './bazar.svg'
import iconTelegram from './../../assets/images/telegramIcon.svg'
import s1 from './s1.svg'
import s2 from './s2.svg'
import {Link} from 'react-router-dom'
import {footerData} from "../../helper/data";
import Logo from "../Logo/Logo";
import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'
import scrollToTop from "../../helper/ScrollToTop";
import {scrollToTopFunction} from "../../helper/functions";
import {toast} from "react-toastify";

const Footer = () => {

    //variables
    const options = useSelector(state => state.options)
    const navigate = useNavigate()
    const login = useSelector(state => state.login)

    //functions
    const handleGoTO = (path) => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }, 1000)
        navigate(path)
    }
    return (
        <footer className={styles.footer}>
            <Logo className={styles.logo}/>
            <img src={background} className={styles.background} alt=""/>
            <div className={styles.div_cover}/>
            <div className='inside'>
                <div className={styles.inside_footer}>
                    <div className={styles.top_footer}>
                        <div className={styles.left_footer}>
                            <p>اپلیکشن امضا کافه را دانلود کنید :</p>
                            <div className={styles.container_buttons}>
                                <img src={sib} alt=""/>
                                <img src={iapps} alt=""/>
                                <img src={google} alt=""/>
                                <img src={bazzar} alt=""/>
                            </div>
                            <div className={styles.container_symbol}>
                                <img src={s1} className={styles.s1} alt=""/>
                                <img src={s2} alt=""/>
                            </div>
                        </div>
                        <div className={styles.div_center}/>
                        <div className={styles.right_footer}>
                            {footerData.map((item, index) => (
                                <div key={index} className={styles.col_footer}>
                                    <p className={styles.title}>{item.title}</p>
                                    <a className={styles.link}
                                       href="https://emza-group.ir/fa/category/%d8%a7%d8%ae%d8%a8%d8%a7%d8%b1-%da%a9%d8%a7%d9%81%d9%87/"
                                       target='_blank'>اخبار</a>
                                    {item.data.map((subMenu, index) => (
                                        <p
                                            key={index}
                                            className={styles.link}
                                            onClick={() => handleGoTO(subMenu.path)}
                                        >
                                            {subMenu.title}
                                        </p>
                                    ))}
                                </div>
                            ))}
                            <div className={styles.col_footer}>
                                <p className={styles.title}>محصولات فروشگاهی</p>
                                {options?.footer?.products[0].map((subMenu, index) => (
                                    <p
                                        key={index}
                                        className={styles.link}
                                        onClick={() => {
                                            if (login) {
                                                handleGoTO(`/market/${subMenu?.category_id}`)
                                            } else {
                                                toast.warning('برای مشاهده محصولات فروشگاهی ابتدا باید وارد حساب کاربری خود شوید')
                                            }
                                        }}
                                    >
                                        {subMenu.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottom_footer}>
                {options?.header?.branches[0] ? <div className={styles.container_icons}>
                    {options?.header?.branches[0]?.whatsapp !== null ?
                        <a href={options?.header?.branches[0]?.whatsapp} target="_blank">
                            <img className={styles.icons} src={whatsapp} alt=""/>
                        </a>
                        : null}

                    {options?.header?.branches[0]?.instagram !== null ?
                        <a href={options?.header?.branches[0]?.instagram} target="_blank">
                            <img className={styles.icons} src={instagram} alt=""/>
                        </a>
                        : null}
                    {options?.header?.branches[0]?.youtube !== null ?
                        <a href={options?.header?.branches[0]?.youtube} target="_blank">
                            <img className={styles.icons} src={youtube} alt=""/>
                        </a>
                        : null}
                    {/*{options?.header?.branches[0]?.telegram !== null ?*/}
                    {/*    <a href={options?.header?.branches[0]?.telegram} target="_blank">*/}
                    {/*        <img className={styles.icons} src={iconTelegram} alt=""/>*/}
                    {/*    </a>*/}
                    {/*    : null}*/}
                    {options?.header?.branches[0]?.twitter !== null ?
                        <a href={options?.header?.branches[0]?.twitter} target="_blank">
                            <img className={styles.icons} src={twitter} alt=""/>
                        </a>
                        : null}
                </div> : null}
                <p>سایت و اپلیکیشن امضا کافه ثبت ملی گردیده است هرگونه کپی برداری موجب پیگرد قانونی می گردد.</p>
            </div>
        </footer>
    )
}
export default Footer
