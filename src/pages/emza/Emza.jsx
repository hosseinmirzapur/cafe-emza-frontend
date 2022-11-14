import styles from './emza.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import SwiperCore, {Pagination, Navigation} from "swiper";
import {useState, useEffect, useRef} from 'react'
import EmzaCard from "../../components/EmzaCard/EmzaCard";
import Loading from "../../components/Loading/Loading";
import {getDataPage} from "../../services/pagesServeice";
import leftImage from './left.svg'
import rightImage from './right.svg'
import {useSelector} from "react-redux";
import NavigationEmza from "../../components/NavigationEmza/NavigationEmza";
import nextImage from "../../components/NavigationEmza/right.svg";
import preImage from "../../components/NavigationEmza/left.svg";
import {goTopAbove} from "../../helper/functions";

SwiperCore.use([Navigation, Pagination])

const Emza = () => {

    const branchId = useSelector(state => state.branchId)
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [select_id, setSelectId] = useState(-1)
    const swiper = useSwiper();
    const navigationNextRef = useRef(null)
    const navigationPrevRef = useRef(null)


    //functions
    const initData = async () => {
        const arrayCategories = []
        setLoading(true)
        try {
            console.log("branch id is", branchId)
            const res = await getDataPage('store', branchId)
            // console.log((res.data.STORE.categories))
            if (res.status === 200) {
                res.data?.STORE?.categories.map(item => {
                    if (item.products.length > 0) {
                        arrayCategories.push(item)
                    }
                })
                // await setCategories(res.data.STORE.categories)
                await setCategories(arrayCategories)
                await setSelectId(res.data.STORE.categories[0].id)
                setLoading(false)
            }

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    const findProducts = async () => {
        setLoading(true)
        const indexArray = categories.findIndex(item => item.id === select_id)
        await setProducts(categories[indexArray]?.products)
        setLoading(false)
    }


    useEffect(() => {
        findProducts()
    }, [select_id])
    useEffect(() => {
        initData()
    }, [branchId])
    useEffect(() => {
        initData()
        goTopAbove()
    }, [])
    return (
        <section className={styles.emza_page}>
            {loading ? <Loading/> : <div className='inside'>
                <div className={styles.inside}>
                    <div className={styles.selector}>
                        <Swiper modules={[Navigation, Pagination]}
                                breakpoints={
                                    {
                                        320: {
                                            slidesPerView: 2,
                                            spaceBetween: 10
                                        },
                                        480: {
                                            slidesPerView: 2,
                                            spaceBetween: 10
                                        },
                                        640: {
                                            slidesPerView: 3,
                                            spaceBetween: 40
                                        },
                                        768: {
                                            slidesPerView: 4,
                                            spaceBetween: 40
                                        }
                                    }
                                }
                                scrollbar={{draggable: true}}
                                loop={true}
                                slidesPerView={5.5} dir="rtl">
                            {categories.map(item => (
                                <SwiperSlide>
                                    <div onClick={() => setSelectId(item.id)}
                                         className={`${styles.item_select} ${select_id === item.id ? styles.active : ''}`}>
                                        <img src={select_id === item.id ? item.active_image : item.passive_image}
                                             alt=""/>
                                        <p className={styles.text_item}>{item.title}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                            <NavigationEmza/>
                        </Swiper>
                    </div>
                    {products?.length > 0 ?
                        <div className={styles.container_card}>
                            {products.map(product => (
                                <EmzaCard product={product}/>
                            ))}
                        </div>
                        : <div className='alert alert-primary alert_text w-100 mb-5'>لطفا منتظر بمانید ...</div>
                    }
                </div>
            </div>}
            <ChangeTitlePage title='شعبه'/>
        </section>
    )
}
export default Emza
