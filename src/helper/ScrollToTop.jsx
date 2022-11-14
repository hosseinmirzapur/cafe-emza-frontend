import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUser, userLogin, userLogout} from "../redux/actions/loginActions";
import {userInfo} from "../services/authService";
import {scrollToTopFunction} from "./functions";
import {useWindowScroll} from '@mantine/hooks';

const ScrollToTop = ({children}) => {
    const [scroll, scrollTo] = useWindowScroll();
    const navigate = useNavigate()
    const location = useLocation();
    const {pathname} = location
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)
    console.log(localStorage.getItem('token'))

    const checkLogin = async () => {
        try {
            const res = await userInfo()
            if (res.status === 200) {
                // dispatch({type: 'SET_USER', payload: res.data.user})
                dispatch(setUser())
                dispatch(userLogin())
            }
        } catch (ex) {
            dispatch(userLogout())
            navigate('/')
        }
    }

    const checkLogin2 = async () => {
        try {
            const res = await userInfo()

            if (res.status === 200) {
                dispatch({type: 'SET_USER', payload: res.data.user})
                dispatch(userLogin())
                dispatch(setUser())
            }
        } catch (ex) {
        }
    }

    useEffect(() => {
        // scrollTo({y: 0});
        scrollTo({y: 0})
        scrollToTopFunction()
        // window.scrollTo(0, 0);
        if (!login) {
            if (pathname.indexOf('dashboard') > -1) {
                if (localStorage.getItem('token')) {
                    checkLogin()
                } else {
                    dispatch(userLogout())
                    navigate('/')
                }
            } else {
                if (localStorage.getItem("token")) {
                    checkLogin2()
                }
            }
        }
        //     // }, [location]);
    }, [pathname]);

    return <>{children}</>
};

export default ScrollToTop;
