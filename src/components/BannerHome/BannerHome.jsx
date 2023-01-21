import styles from './banner.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper";
import PaginationSlider from "../Pagination/Pagination";
import NavigationSlider from "../NavigationSlider/NavigationSlider";
import pic_wave from './wave.svg'
import {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {setBranchId} from "../../redux/actions/optionActions"
import {useNavigate} from "react-router-dom";
import {useClickOutside} from '@mantine/hooks';
import {preventDragHandler} from "../../helper/functions";
import Leaf from "../Leaf/Leaf";
import {toast} from "react-toastify";

const BannerHome = ({images}) => {

    //variables
    const breakpoints = {
        320: {
            slidesPerView: 1,
            spaceBetween: 2
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 2
        },
        640: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 30
        }
    }
    const [showMenu, setShowMenu] = useState(false)
    const options = useSelector(state => state.options)
    const ref = useClickOutside(() => setShowMenu(false));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const login = useSelector(state => state.login)

    // functions
    const handleBranches = async (id) => {
        await localStorage.setItem("branch_id", id)
        await dispatch(setBranchId(id))
        setShowMenu(false)
        navigate('/emza')
    }
    return (

        <section className={styles.banner_section}>


            <Swiper className={styles.swiper}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    modules={[Pagination, Autoplay]}
                    dir="rtl"
                    breakpoints={breakpoints}
                    pagination={PaginationSlider}
                    autoplay={{
                        delay: 4000,
                        // disableOnInteraction: false,
                    }}>
                {images?.map(item => (
                    <SwiperSlide key={item.id}>
                        <img onDragStart={e => preventDragHandler(e)} className={styles.img} src={item.image} alt=""/>
                    </SwiperSlide>
                ))}
                <img alt='' onDragStart={e => preventDragHandler(e)} className={styles.pic_wave} src={pic_wave}/>
                <div className={styles.card}>
                    <div className={styles.inside_card}>
                        <Leaf className={styles.leaf}/>
                        <p className={styles.title}>کافه امضا</p>
                        <p className={styles.text}>به سفارش خود روح و جان ببخشید.</p>
                        <p className={styles.text}>لذت خرید کالای سفارشی شده با محصولات امضا کافه</p>

                        <button onClick={() => {
                            if (login) {
                                setShowMenu(true)
                            } else {
                                toast.warning('جهت سفارش در کافه امضا، ابتدا وارد حساب کاربری خود شوید')
                            }
                        }}>
                            امضا خود را سفارش دهید
                        </button>
                        {showMenu && <div ref={ref} className={styles.menu}>
                            {options?.header?.branches.map(item => (
                                <p className={styles.subtitle} style={{
                                    opacity: item?.active ? 1 : 0.5
                                }}
                                   onClick={() => {
                                       if (item?.active) {
                                           handleBranches(item.id)
                                       } else {
                                           toast.info('در حال حاضر این شعبه غیر فعال است.')
                                       }
                                   }}>{item?.name}</p>
                            ))}
                        </div>}
                    </div>
                </div>
                <NavigationSlider slidesLength={images?.length}/>

            </Swiper>

        </section>
    )
}
export default BannerHome
