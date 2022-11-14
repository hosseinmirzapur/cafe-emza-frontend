import './headerMobile.scss'
import Logo from "../Logo/Logo";
import {Burger} from '@mantine/core';
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {useClickOutside} from '@mantine/hooks';
import {dataMobileMenu} from "./data";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import imageBasket from '../../assets/images/basket.svg'
import {userlogout} from "../../services/authService";
import {userLogout} from "../../redux/actions/loginActions";
import {Collapse} from '@mantine/core';
import {setBranchId} from "../../redux/actions/optionActions";
import SearchMobile from "../SearchMobile/SearchMobile";
import {Badge} from '@mantine/core';

const HeaderMobile = () => {
    //Variables
    const options = useSelector(state => state.options)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigator = useNavigate()
    const login = useSelector((state) => state.login);
    const [sidebar, setSidebar] = useState(false);
    const ref = useClickOutside(() => setSidebar(false));
    const [openCollapse, setCollapse] = useState(false)
    const [openProducts, setProducts] = useState(false)
    const [exitModal, setExitModal] = useState(false)
    //functions
    const handleShowMenu = () => {
        setSidebar(!sidebar)
    }
    const goToPage = (strRoute) => {
        setSidebar(false);
        navigator(strRoute);
    };
    const handleExit = async () => {
        try {
            const res = await userlogout()
            await dispatch(userLogout())
            await navigator('/')
        } catch (err) {
            console.log(err)
        }
        setSidebar(!sidebar)
        setExitModal(true)
    }
    const handleBranches = async (id) => {
        await localStorage.setItem("branch_id", id)
        await dispatch(setBranchId(id))
        navigator('/emza')
        await setSidebar(false)
    }
    const handleProduct = async (id) => {
        navigator(`/market/${id}`)
        await setSidebar(false)
    }
    useEffect(() => {
        setCollapse(false)
        setProducts(false)
    }, [sidebar])
    return (
        <>
            <div className='headerMobile'>
                <div className='inside_header_mobile'>
                    <div className='left_header'>
                        <Logo className='logo_header'/>
                        {login ?
                            <div onClick={() => navigator('/cart')} className='container_basket position_relative'>
                                {user.cart_count > 0 ? <Badge color="yellow" classNames={{
                                    root: 'root_badge'
                                }}>{user.cart_count}</Badge> : null}
                                <img src={imageBasket} alt="basket"/>
                            </div> : null}
                        <SearchMobile/>
                    </div>
                    <Burger color="#323133" size={25} onClick={() => handleShowMenu()} opened={sidebar}/>
                </div>
            </div>
            <nav ref={ref}
                 className={sidebar ? "nav-menu activeMobile" : "nav-menu"}>
                <div className='insideMenuMobile'>
                    {login ?
                        <div className="containerLoginRegisterSidebar">
                            <div className="btnLoginSide" onClick={() => goToPage('/dashboard/profile')}>داشبورد</div>
                            <div className="btnRegisterSide" onClick={() => handleExit()}>خروج</div>
                        </div>
                        :
                        <div className="containerLoginRegisterSidebar">
                            <div className="btnLoginSide" onClick={() => goToPage('/login')}>ورود</div>
                            <div className="btnRegisterSide" onClick={() => goToPage('/login')}>ثبت نام</div>
                        </div>
                    }
                    <div className='container_collapse' onClick={() => setCollapse(!openCollapse)}>
                        <div className="menuItemSidebar">
                            <p>شعبه ها</p>
                            < AiIcons.AiTwotoneShop className="iconSi"/>
                        </div>
                        <Collapse in={openCollapse}>
                            {options?.header?.branches.map((item, index) => (
                                <div key={index} onClick={() => handleBranches(item.id)}
                                     className="menuItemSidebar custom">
                                    <p>{item?.name}</p>
                                    < IoIcons.IoIosCafe className="iconSi"/>
                                </div>
                            ))}
                        </Collapse>
                    </div>

                    <div className='container_collapse' onClick={() => setProducts(!openProducts)}>
                        <div className="menuItemSidebar">
                            <p>فروشگاه آنلاین</p>
                            < GiIcons.GiPaperBagFolded className="iconSi"/>
                        </div>
                        <Collapse in={openProducts}>
                            {options?.header?.products.map((item, index) => (
                                <div key={index} onClick={() => handleProduct(item.id)}
                                     className="menuItemSidebar custom">
                                    <p>{item?.title}</p>
                                    < IoIcons.IoIosCafe className="iconSi"/>
                                </div>
                            ))}
                        </Collapse>
                    </div>

                    {dataMobileMenu.map((item, index) => (
                        <div key={index} onClick={() => goToPage(item.path)} className="menuItemSidebar">
                            <p>{item.title}</p>
                            {item.icon ? item.icon : null}
                        </div>
                    ))}
                    <a target='_blank' href='https://emza-group.ir/fa/' className="menuItemSidebar">
                        <p>مجله امضا</p>
                        < FaIcons.FaBloggerB className="iconSi"/>
                    </a>
                </div>
            </nav>
        </>
    )
}
export default HeaderMobile