import styles from './header.module.scss'
import profileImage from '../../assets/images/profile.svg'
import basketImage from '../../assets/images/basket.svg'
import {useDispatch, useSelector} from "react-redux";
import Logo from "../Logo/Logo";
import {Link} from 'react-router-dom'
import {useClickOutside} from '@mantine/hooks';
import {useEffect, useState} from 'react'
import {aboutData} from "../../helper/data";
import MarketMenu from "./MarketMenu";
import {useNavigate} from 'react-router-dom'
import {setBranchId, setOptions} from "../../redux/actions/optionActions";
import Search from "../Search/Search";
import {Badge} from '@mantine/core';
import {ReactComponent as NotificationIcon} from "./../../assets/images/notificationHeader.svg";
import {setUser, userLogin} from "../../redux/actions/loginActions";
import {toast} from "react-toastify";

const Header = () => {
    //Variables
    const navigate = useNavigate()
    const login = useSelector(state => state.login)
    const [showBranches1, setBranches1] = useState(false)
    const [showBranches2, setBranches2] = useState(false)
    const [showAbout, setAbout] = useState(false)
    const [showMarket, setMarket] = useState(false)
    const refBranches1 = useClickOutside(() => setBranches1(false));
    const refBranches2 = useClickOutside(() => setBranches2(false));
    const refAbout = useClickOutside(() => setAbout(false));
    const user = useSelector(state => state.user)
    const options = useSelector(state => state.options)
    const dispatch = useDispatch()
    // const [notifications, setNotifications] = useState([...user?.notifications])
    const countNotification = user.notifications?.filter(item => parseInt(item.active) === 1)

    const [isDisable, setIsDisable] = useState(true)

    //functions
    const handleBranches = async (id, type) => {
        localStorage.setItem("branch_id", id)
        await dispatch(setBranchId(id))
        setBranches1(false)
        setBranches2(false)
        if (type === 'cafe') navigate('/emza')
        else {
            setBranches2(false)
            setMarket(true)
        }
    }
    const fullname = () => {
        return user.firstname ? `${user.firstname} ${user.lastname}` : 'در حال بارگذاری...'
    }
    const initData = async () => {
        await dispatch(setOptions())
        const token = localStorage.getItem('token')
        if (login || token != null) {
            dispatch(userLogin())
            dispatch(setUser())
        }
        setIsDisable(false)
    }
    useEffect(() => {
        initData()
    }, [])
    return (
        <header className={styles.header}>
            {!isDisable ? <div className='inside'>
                <div className={styles.inside_header}>
                    <div className={styles.left_header}>
                        <Link to={login ? '/dashboard/profile' : 'login'}>
                            <div className={styles.btn_header}>
                                <div>
                                    <img src={profileImage} alt="image basket"/>
                                    <p className={styles.login_signup}>{login ? fullname() : 'ورود/ثبت نام'}</p>
                                </div>
                            </div>
                        </Link>
                        {login ? <div onClick={() => navigate('/dashboard/notification')}
                                      className={`${styles.btn_header} ${styles.div_notification} ${styles.position_relative}`}>
                            {countNotification?.length > 0 ? <Badge color="yellow" classNames={{
                                root: styles.root_badge
                            }}>{countNotification?.length}</Badge> : null}
                            <NotificationIcon classNames={styles.notification}/>
                        </div> : null}
                        {login ? <div onClick={() => navigate('/cart')}
                                      className={`${styles.btn_header} ${styles.position_relative}`}>
                            {user.cart_count > 0 ? <Badge color="yellow" classNames={{
                                root: styles.root_badge
                            }}>{user.cart_count}</Badge> : null}
                            <img src={basketImage} alt="image basket"/>
                        </div> : null}

                        <Search/>
                    </div>
                    <div className={styles.right_header}>
                        <div className={styles.container_menu_header}>
                            <div className={styles.div_menu}>
                                <Link to={'/'} className={styles.text_menu}>
                                    صفحه اصلی
                                </Link>
                            </div>
                            <div className={styles.div_menu}>
                                <p onClick={() => setBranches1(!showBranches1)} className={styles.text_menu}>کافه امضا</p>
                                {showBranches1 &&
                                <div ref={refBranches1} className={styles.menu_branch + ' ' + styles.opacity_menu}>
                                    {options?.header?.branches.map((item, index) => (
                                        <p className={item.active ? '' : 'opacity-25'} key={index} onClick={async () => {
                                            if (login) {
                                                if (item.active) {
                                                    await handleBranches(item?.id, 'cafe')
                                                } else {
                                                    toast.info(item?.excuse || 'در حال حاضر این شعبه غیر فعال است.')
                                                }
                                            } else {
                                                toast.warning('برای مشاهده محصولات ابتده وارد حساب کاربری خود شوید')
                                            }
                                        }}>{item?.name}</p>
                                    ))}
                                </div>}
                            </div>
                            <div className={styles.div_menu}>
                                <p onClick={() => setBranches2(!showBranches2)} className={styles.text_menu}>فروشگاه آنلاین</p>
                                {showBranches2 &&
                                <div ref={refBranches2} className={styles.menu_branch + ' ' + styles.opacity_menu}>
                                    {options?.header?.store_branches.map((item, index) => (
                                        <p className={item.active ? '' : 'opacity-25'} key={index} onClick={async () => {
                                            if (login) {
                                                if (item.active) {
                                                    await handleBranches(item?.id, 'store')
                                                } else {
                                                    toast.info(item?.excuse || 'در حال حاضر این شعبه غیر فعال است.')
                                                }
                                            } else {
                                                toast.warning('برای مشاهده محصولات ابتده وارد حساب کاربری خود شوید')
                                            }
                                        }}>{item?.name}</p>
                                    ))}
                                </div>}
                                {showMarket && <MarketMenu setMe={(e) => setMarket(e)}/>}
                            </div>
                            <div className={styles.div_menu}>
                                <p onClick={() => navigate('/club')} className={styles.text_menu}>باشگاه مشتریان</p>
                            </div>
                            <div className={styles.div_menu}>
                                <a href='https://emza-group.ir/fa/' target='_blank'
                                   className={styles.text_menu}>مجله امضا</a>

                            </div>
                            <div className={styles.div_menu}>
                                <p onClick={() => setAbout(true)} className={styles.text_menu}>درباره ما</p>
                                {showAbout &&
                                <div ref={refAbout} className={styles.menu_branch + ' ' + styles.opacity_menu}>
                                    {aboutData.map(item => (
                                        <Link to={item.path}>
                                            <p onClick={() => setAbout(false)}>{item.label}</p>
                                        </Link>
                                    ))}
                                </div>}
                            </div>
                        </div>

                        <Logo/>
                    </div>
                </div>
            </div> : null}
        </header>
    )
}
export default Header
