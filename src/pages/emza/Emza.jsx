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
import {toast} from "react-toastify";
import ProductsInMiddle from "./ProductsInMiddle";

SwiperCore.use([Navigation, Pagination])

const Emza = () => {
    const options = useSelector(state => state.options)
    const branchId = useSelector(state => state.branchId)
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [branch, setBranch] = useState({})
    const [select_id, setSelectId] = useState(-1)

    //functions
    const initData = async () => {
        setLoading(true)
        await getDataPage('store', branchId)
            .then(async (res) => {
                if (res.status === 200) {
                    if (res?.data?.STORE?.categories?.length === 0) {
                        setProducts([])
                    }
                    await setCategories(res?.data?.STORE?.categories)
                    await setSelectId(res?.data?.STORE?.categories[0]?.id)
                    const selectedBranch = options?.header?.branches?.find(item => parseInt(item.id) === parseInt(branchId))
                    await setBranch(selectedBranch)
                    await setLoading(false)
                }

            })
            .catch(() => {
                setLoading(false)
                toast.error('خطایی رخ داده است.')
            })
    }
    const findProducts = async () => {
        const indexArray = categories.findIndex(item => item.id === select_id)
        await setProducts(categories[indexArray]?.products)
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
            <div className={'inside'}>
                {
                    (!loading && products?.length) ? <>
                        <ProductsInMiddle
                            branch={branch}
                            categories={categories}
                            select_id={select_id}
                            setSelectId={setSelectId}
                        />
                        <div style={{
                            direction: 'rtl'
                        }} className={`${styles.container_card} position_relative`}>
                            {products.map(product => {
                                    return (
                                        <EmzaCard product={product}/>
                                    )
                                }
                            )}
                        </div>
                    </> : (loading ? <Loading/> : <div className={`alert alert-primary alert_text w-100 text-center ${styles.no_product}`}>محصولی
                        یافت نشد</div>)
                }


            </div>


            <ChangeTitlePage title='شعبه'/>
        </section>
    )
}
export default Emza
