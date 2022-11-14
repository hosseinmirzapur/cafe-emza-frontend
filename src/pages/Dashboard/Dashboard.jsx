import './dashboardLayout.scss'
import {dataSidebar} from "./data";
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import exit from './exit.svg'
import {useDispatch, useSelector} from "react-redux";
import userImage from './user.svg'
import {userlogout} from "../../services/authService";
import {userLogout} from "../../redux/actions/loginActions";
import PN from "persian-number";
import {useState} from "react";
import Loading from "../../components/Loading/Loading";

const Dashboard = () => {

    //variables
    const user = useSelector(state => state.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    //functions
    const fullname = () => {
        return `${user?.firstname} ${user?.lastname}`
    }
    const findTitle = () => {
        if (location.pathname.indexOf('profile') > -1) {
            return 'اطلاعات حساب کاربری'
        }
        if (location.pathname.indexOf('history') > -1 || location.pathname.indexOf('order') > -1) {
            return 'تاریخچه سفارشات'
        }
        if (location.pathname.indexOf('address') > -1) {
            return 'آدرس های من'
        }
        if (location.pathname.indexOf('notification') > -1) {
            return 'اعلانات'
        }
        if (location.pathname.indexOf('rate') > -1) {
            return 'امتیازهای من'
        }
    }
    const handleExit = async () => {
        try {
            setLoading(true)
            const res = await userlogout()
            await dispatch(userLogout())
            await navigate('/')
            await setLoading(false)
        } catch (err) {
            console.log(err)
            await setLoading(false)
        }
    }

    return loading ? <Loading/> : (<section className='dashboardLayout'>
        <div className='inside'>
            <div className='container_inside'>
                <div className='div_info_user'>
                    <p className='full_name_mobile'>{`${fullname()}`} <span>(سطح {PN.convert(user.user_rank)})</span>
                    </p>
                </div>
                <div className='inside_layout'>
                    <div className='content_layout'>
                        <div className='title_content_layout'>
                            <p>{findTitle()}</p>
                        </div>
                        <div className='inside_content_layout'>
                            <Outlet/>
                        </div>
                    </div>
                    <div className='sidebar'>
                        <div className='header_sidebar'>
                            <img className='image_user' src={userImage} alt=""/>
                            <p className='text_fullname'>{fullname()}</p>
                            <p className='text_level'>(سطح {PN.convert(user.user_rank)})</p>
                        </div>
                        <div className='inside_sidebar'>
                            {dataSidebar.map((item, index) => (
                                <NavLink className='sidebar_item' key={index} to={item.path}>
                                    <img src={item.icon} alt=""/>
                                    <p className='text_sidebar_item'>{item.title}</p>
                                </NavLink>))}
                            <div onClick={() => handleExit()} className='sidebar_item_exit'>
                                <p className='text_sidebar_item'>خروج از حساب</p>
                                <img src={exit} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}
export default Dashboard
