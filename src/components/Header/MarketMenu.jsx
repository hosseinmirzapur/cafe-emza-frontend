import styles from './market.module.scss'
import {useClickOutside} from '@mantine/hooks';

import imageCover from './cover.svg'
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const MarketMenu = ({setMe}) => {

    //variable
    const options = useSelector(state => state.options)
    const refAbout = useClickOutside(() => setMe(false));
    const login = useSelector(state => state.login)
    const navigate = useNavigate()

    //functions
    const handleLink = (id) => {
        if (login) {
            navigate(`/product_market/${id}`)
            setMe(false)
        } else {
            toast.info('لطفا ابتدا وارد سایت شوید.')
            navigate(`/login`)
            setMe(false)

        }
    }
    const handleClickTitle = id => {
        // setMe(false)
        if (login) {
            navigate(`/market/${id}`)
            setMe(false)
        } else {
            toast.info('لطفا ابتدا وارد سایت شوید.')
            navigate(`/login`)
            setMe(false)

        }
    }

    return (
        <div ref={refAbout} className={styles.market}>
            <div className={styles.inside_market}>
                <img src={imageCover} alt="background image"/>
                <div className={styles.container_menus}>
                    {options?.header?.products?.map((item, index) => (
                        <div key={index} className={styles.div_sub_menu}>
                            <p className={styles.title_menu} onClick={() => handleClickTitle(item.id)} >{item.title}</p>
                            {item?.products?.map(subMenu => (
                                <p onClick={() => handleLink(subMenu.id)} className={styles.subtitle}>{subMenu.name}</p>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default MarketMenu