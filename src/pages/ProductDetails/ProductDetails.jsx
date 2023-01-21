import styles from './productDetails.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import {numberWithCommas, preventDragHandler} from "../../helper/functions";
import ReactStars from "react-rating-stars-component";
import {Radio, RadioGroup} from "@mantine/core";
import {useState, useEffect} from 'react'
import large from './large.svg'
import small from './small.svg'
import x_large from './xlarge.svg'
import PN from "persian-number";
import Counter from "../../components/Counter/Counter";
import handleErrors from "../../helper/handleErrors";
import {Spinner} from "reactstrap";
import {useNavigate, useParams} from 'react-router-dom'
import {buy} from "../../services/buyService";
import {toast} from "react-toastify";
import {getProduct, rateProduct} from "../../services/productService";
import Loading from "../../components/Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/actions/loginActions";

const ProductDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const login = useSelector(state => state.login)
    const dispatch = useDispatch()
    const [count, setCount] = useState(1)
    const [size, setSize] = useState(product.sizes ? product?.sizes[0]?.size : null)
    const [loadingRate, setLoadingRate] = useState(false)
    const [price, setPrice] = useState(0)
    const [isDisable, setIsDisable] = useState(false)
    const [loading, setLoading] = useState(true)

    //functions
    const initData = async () => {
        setLoading(true)
        try {
            const res = await getProduct(params.id)
            if (res.status === 200) {
                await setProduct(res.data.product)
                await setSize(res?.data?.product?.sizes[0]?.size)
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
            handleErrors(err)
        }
    }
    const handleGoSentences = () => {
        const objBuy = {
            product_id: params?.id,
            quantity: count,
            sizeId: findSize(),
            sentence_id: null,
            sentence_language: null,
            frame: null,
            to: null,
            from: null
        }
        navigate('/sentences', {state: objBuy})
    }
    const handleBuy = async () => {
        if (login) {
            const objBuy = {
                product_id: params?.id,
                quantity: count,
                sizeId: findSize(),
                sentence_id: null,
                sentence_language: null,
                frame: null,
                to: null,
                from: null
            }
            setIsDisable(true)
            try {
                const res = await buy(objBuy)
                if (res.status === 200) {
                    await dispatch(setUser())
                    setIsDisable(false)
                    navigate('/emza')
                    toast.success("از انتخابت خوشم اومد!")
                }
            } catch (err) {
                setIsDisable(false)
                handleErrors(err)
            }
        } else {
            toast.warning("برای انجام خرید ابتدا باید وارد حساب کاربری خود شوید")
        }
    }
    const handleRate = async (rate) => {
        setLoadingRate(true)
        try {
            const res = await rateProduct(params?.id, rate)
            console.log("res is : ", res)
            setLoadingRate(false)
        } catch (err) {
            console.log(err)
            handleErrors(err)
            setLoadingRate(false)
        }

    }
    const findSize = () => {
        switch (size) {
            case 'small':
                return 1
            case 'medium':
                return 2
            default:
                return 3
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
    const persianSize = () => {
        switch (size) {
            case 'small':
                return 'کوچک'
            case 'medium':
                return 'متوسط'
            case 'large':
                return 'بزرگ'
            default:
                return ''
        }
    }
    const findPrice = async () => {
        const obj = product.sizes.find(item => item.size === size)
        if (obj) {
            await setPrice(obj.pivot.price)
        } else return 0
    }

    useEffect(() => {
        initData()
    }, [])

    useEffect(() => {
        findPrice()
    }, [size])
    return (
        <section className={styles.details_page}>
            <div className='inside'>
                {loading ? <Loading classs='loader'/> :
                    <div className={styles.inside}>
                        <div className={styles.card}>
                            <div className={styles.info_section}>
                                <div className={styles.top}>
                                    <p className={styles.price}>{numberWithCommas(price)} تومان</p>
                                    <div className={styles.top_right}>
                                        <p className={styles.product_name}>{product?.name}</p>
                                        {loadingRate ? <Spinner size={'sm'} className='invoice-list-wrapper'
                                                                animation="border" color="var(--emza)"
                                                                variant="secondary"/>
                                            : <ReactStars
                                                count={5}
                                                value={product.rate_avg !== null ? product.rate_avg : 0}
                                                onChange={e => handleRate(e)}
                                                edit={true}
                                                size={22}
                                                activeColor="var(--emza)"
                                                className={styles.rate}
                                            />}
                                    </div>
                                </div>
                                <p className={styles.content}>{product?.ingredient}</p>
                                <p className={styles.size}>سایز:</p>
                                <RadioGroup
                                    defaultValue={size}
                                    value={size}
                                    onChange={setSize}
                                    classNames={{
                                        // label: 'label_radio',
                                        label: styles.label_radio,
                                        radioWrapper: 'radioWrapper',
                                        radio: 'root_radio',
                                        // radio:styles.mehdi
                                    }
                                    }
                                >

                                    {product?.sizes[2] ? <Radio value="large" name='size'
                                                                label={<div className={styles.item_size}><p>بزرگ</p><img
                                                                    alt='' className={styles.icons}
                                                                    src={x_large}/>
                                                                </div>}/> : null}
                                    {product?.sizes[1] ? <Radio value="medium" name='size'
                                                                label={<div className={styles.item_size}><p>متوسط</p>
                                                                    <img
                                                                        alt='' className={styles.icons}
                                                                        src={large}/>
                                                                </div>}/> : null}
                                    {product?.sizes[0] ? <Radio value="small" name='size'
                                                                label={<div className={styles.item_size}><p>کوچک</p><img
                                                                    alt='' className={styles.icons}
                                                                    src={small}/>
                                                                </div>}/> : null}
                                </RadioGroup>
                                <div className={styles.center}>
                                    <div className={styles.container_btns}>
                                        <button
                                            disabled={isDisable}
                                            onClick={() => handleGoSentences()}
                                            className={styles.btn_sentences}
                                            hidden={product?.printable != true}
                                        >انتخاب جمله
                                        </button>
                                        <button disabled={isDisable} onClick={() => handleBuy()}
                                                className={styles.btn_sentences}>
                                            {
                                                isDisable === false ? 'افزودن به سبد خرید' :
                                                    <Spinner size={'sm'} className='invoice-list-wrapper'
                                                             animation="border" color="white"
                                                             variant="secondary"/>
                                            }
                                        </button>
                                    </div>

                                    <div className={styles.center_right}>
                                        <Counter value={count} add={() => handleIncrement()}
                                                 sub={() => handleDecrement()}/>
                                        <p className={styles.sum}>تعداد :</p>
                                    </div>
                                </div>
                                <p className={styles.text}>{PN.convert(count)} عدد {product.name} {persianSize()}</p>
                            </div>
                            <div className={styles.container_image}>
                                <img onDragStart={e => preventDragHandler(e)} className={styles.img} src={product.image}
                                     alt=""/>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <ChangeTitlePage title='جزئیات محصول'/>
        </section>
    )
}
export default ProductDetails
