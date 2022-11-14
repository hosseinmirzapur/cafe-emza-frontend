import styles from './productMarket.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import image from './bag.jpg'
import {goTopAbove, numberWithCommas, preventDragHandler} from "../../helper/functions";
import ReactStars from "react-rating-stars-component";
import {Spinner} from "reactstrap";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getProduct, rateProduct} from "../../services/productService";
import handleErrors from "../../helper/handleErrors";
import home from './home.svg'
import seed from './seed.svg'
import maker from './maker.svg'
import press from './press.svg'
import Counter from "../../components/Counter/Counter";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../components/Loading/Loading";
import {buy} from "../../services/buyService";
import {toast} from "react-toastify";
import {setUser} from "../../redux/actions/loginActions";
import globe from './44386.png'
import mill from './227127.png'

const ProductMarket = () => {

    //variables
    const [loadingRate, setLoadingRate] = useState(false)
    const [product, setProduct] = useState({})
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(1)
    const [isDisable, setIsDisable] = useState(false)
    const login = useSelector(state => state.login)

    const data = [
        {
            id: 0,
            title: 'نوع قهوه',
            description: product?.coffee_types?.length > 0 ? product?.coffee_types[0].title : '',
            img: home
        },
        {
            id: 1,
            title: 'نوع آسیاب',
            description: product?.mill_types?.length > 0 ? product?.mill_types[0].title : '',
            img: mill
        },
        {
            id: 2,
            title: 'نوع دانه',
            description: product?.bean_types?.length > 0 ? product?.bean_types[0].title : '',
            img: seed
        },
        {
            id: 3,
            title: 'منطقه کشت',
            description: product?.growth_parts?.length > 0 ? product?.growth_parts[0].title : '',
            img: globe
        },
    ]
    const filterOption = data.filter(item => item.description !== '')
    //functions
    const initData = async () => {
        setLoading(true)
        try {
            const res = await getProduct(params.id)
            if (res.status === 200) {
                await setProduct(res.data.product)
                // console.log(res.data.product)
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            handleErrors(err)
        }
    }

    const handleRate = async (rate) => {
        setLoadingRate(true)
        try {
            const res = await rateProduct(params?.id, rate)
            if (res.status === 200) {
                setLoadingRate(false)
                initData()
            }
        } catch (err) {
            handleErrors(err)
            setLoadingRate(false)
        }

    }
    const handleIncrement = () => {
        setCount(count + 1)
    }
    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const handleBuy = async () => {
        if (login) {
            const objBuy = {
                product_id: product?.id,
                quantity: count,
            }
            setIsDisable(true)
            try {
                const res = await buy(objBuy)
                if (res.status === 200) {
                    toast.success('محصول مورد نظر به سبد خرید اضافه شد.')
                    await dispatch(setUser())
                    setIsDisable(false)
                    navigate('/')
                }
            } catch (err) {
                setIsDisable(false)
                handleErrors(err)
            }
        } else {
            toast.warning("برای انجام خرید ابتدا باید وارد حساب کاربری خود شوید")
        }
    }

    useEffect(() => {
        initData()
        goTopAbove()
    }, [params.id])
    return (
        <section className={styles.product_market}>
            {loading ? <Loading classs={styles.loader}/> :
                <div className='inside'>
                    <div className={styles.inside}>
                        <div className={styles.card}>
                            <div className={styles.info}>
                                <div className={styles.top}>
                                    <p className={styles.price}>{numberWithCommas(product?.price)} تومان</p>
                                    <div className={styles.right_top}>
                                        {loadingRate ? <Spinner size={'sm'} className='invoice-list-wrapper'
                                                                animation="border" color="var(--emza)"
                                                                variant="secondary"/>
                                            : <ReactStars
                                                count={5}
                                                value={product?.rate_avg !== null ? product?.rate_avg : 0}
                                                onChange={e => handleRate(e)}
                                                edit={true}
                                                size={22}
                                                activeColor="var(--emza)"
                                                className={styles.rate}
                                            />}
                                        <p className={styles.name}>{product?.name}</p>

                                    </div>
                                </div>
                                <div className={styles.options}>


                                    {filterOption.map((item) => (
                                        <div key={item.id} className={styles.option}>
                                            <img onDragStart={e => preventDragHandler(e)} src={item.img} width={43} alt=""/>
                                            <p className={styles.name_option}>{item.title}</p>
                                            <p className={styles.description}>({item.description})</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.container_bottom}>
                                    {/*<button disabled={isDisable}*/}
                                    {/*        onClick={() => handleGoSentences()}*/}
                                    {/*        className={styles.btn_sentences_2}>انتخاب جمله*/}
                                    {/*</button>*/}
                                    <button disabled={isDisable} onClick={() => handleBuy()} className={styles.btn}
                                            type="submit">
                                        {
                                            isDisable === false ? 'افزودن به سبد خرید' :
                                                <Spinner size={'sm'} className='invoice-list-wrapper'
                                                         animation="border" color="white"
                                                         variant="secondary"/>
                                        }
                                    </button>
                                    <div className={styles.right_bottom}>
                                        <Counter value={count} add={() => handleIncrement()}
                                                 sub={() => handleDecrement()}/>
                                        <p className={styles.counter}>تعداد : </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.container_image}>
                                <img onDragStart={e => preventDragHandler(e)} src={product?.image}
                                     className={styles.img_product} alt=""/>
                            </div>
                        </div>
                        {/*<TitleInPage title='محصولات مشابه'/>*/}
                        {/*<div className={styles.container_card}>*/}
                        {/*    <ProductCard/>*/}
                        {/*    <ProductCard/>*/}
                        {/*    <ProductCard/>*/}
                        {/*</div>*/}
                    </div>
                </div>}
            <ChangeTitlePage title='محصولات فروشگاهی'/>
        </section>
    )
}
export default ProductMarket
