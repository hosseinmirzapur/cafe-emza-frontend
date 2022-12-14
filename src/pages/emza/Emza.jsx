import styles from './emza.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import {
    Swiper,
    SwiperSlide
    // useSwiper
} from 'swiper/react';
import SwiperCore, {Pagination, Navigation} from "swiper";
import {
    useState,
    useEffect
    // useRef
} from 'react'
import EmzaCard from "../../components/EmzaCard/EmzaCard";
import Loading from "../../components/Loading/Loading";
import {getDataPage} from "../../services/pagesServeice";
// import leftImage from './left.svg'
// import rightImage from './right.svg'
import {useSelector} from "react-redux";
import NavigationEmza from "../../components/NavigationEmza/NavigationEmza";
// import nextImage from "../../components/NavigationEmza/right.svg";
// import preImage from "../../components/NavigationEmza/left.svg";
import {goTopAbove} from "../../helper/functions";

SwiperCore.use([Navigation, Pagination])

const Emza = () => {
    const options = useSelector(state => state.options)
    const branchId = useSelector(state => state.branchId)
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [branch, setBranch] = useState({})
    const [select_id, setSelectId] = useState(-1)
    // const swiper = useSwiper();
    // const navigationNextRef = useRef(null)
    // const navigationPrevRef = useRef(null)


    //functions
    const initData = async () => {
        setLoading(true)
        try {
            const res = await getDataPage('store', branchId)
                .then(async (res) => {
                    if (res.status === 200) {
                        if (res?.data?.STORE?.categories?.length === 0) {
                            setProducts([])
                        }
                        await setCategories(res?.data?.STORE?.categories)
                        await setSelectId(res?.data?.STORE?.categories[0]?.id)
                        await setLoading(false)
                        const selectedBranch = options?.header?.branches?.find(item => parseInt(item.id) === parseInt(branchId))
                        await setBranch(selectedBranch)
                    }

                })


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
                    <p className={`mb-5 ${styles.branch_name}`}>{branch?.name}</p>
                    <div className={styles.selector}>
                        <Swiper
                            modules={
                                [
                                    Navigation,
                                    Pagination
                                ]
                            }
                            spaceBetween={10}
                            scrollbar={{draggable: true}}
                            loop={true}
                            slidesPerView={categories.length}
                            dir="rtl"
                        >
                            {categories.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div onClick={() => {
                                        setSelectId(item.id)
                                    }}
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
                        : <div className={`alert alert-primary alert_text w-100 text-center ${styles.no_product}`}>محصولی یافت نشد</div>
                    }
                </div>
            </div>}
            <ChangeTitlePage title='شعبه'/>
        </section>
    )
}
export default Emza
