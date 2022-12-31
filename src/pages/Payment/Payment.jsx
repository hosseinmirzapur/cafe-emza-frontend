import styles from './payment.module.scss'
import ChangeTitle from "../../helper/ChangeTitle";
import CollectionShop from "../../components/CollectionShop/CollectionShop";
import CollectionCoffee from "../../components/CollectionShop/CollectionCoffee";
import {numberWithCommas} from "../../helper/functions";
import DatePicker from "react-datepicker2";
import ErrorMessageDate from "../../components/ErrorMessage/ErrorMessageDate";
import calenderImage from "../../assets/images/calender.svg";
import {useState, useEffect} from 'react'
import {Formik} from "formik";
import {Radio, RadioGroup} from "@mantine/core";
import Loading from "../../components/Loading/Loading";
import locationIcon from "../../components/AddressItem/location.svg";
import userIcon from "../../components/AddressItem/user.svg";
import editIcon from "../../components/AddressItem/edit.svg";
import EditAddressModal from "../../modals/EditAddressModal/EditAddressModal";
import AddAddressModal from "../../modals/EditAddressModal/AddAddressModal";
import {applyPromotion, getBasketData, getDeliveryPrice, goPayment, registerOrder} from "../../services/buyService";
import {Spinner} from "reactstrap";
import handleErrors from "../../helper/handleErrors";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom'


const Payment = () => {
    //variable
    const [code, setCode] = useState('')
    const [address, setAddress] = useState([])
    const [address_id, setAddress_id] = useState(address[0]?.id.toString())
    const [loading, setLoading] = useState(true)
    const [objAddress, setObjAddress] = useState({})
    const [editModal, setEditModal] = useState(false)
    const [showAddAddress, setShowAddAddress] = useState(false)
    const [disablePromotion, setDisablePromotion] = useState(false)
    const [sendPrice, setSendPrice] = useState(0)
    const [send_type, setSend] = useState("ارسال با پیک")
    const [totalPrice, setTotalPrice] = useState(0)
    const [loadingPage, setLoadingPage] = useState(false)
    const [shopItems, setShopItems] = useState([])
    const [coffeeItems, setCoffeeItems] = useState([])

    const navigate = useNavigate()

    //functions

    const handlePromotion = async () => {
        setDisablePromotion(true)
        try {
            const res = await applyPromotion(code)
            if (res.status === 200) {
                await setAddress(res?.data?.addresses)
                await setAddress_id(res?.data?.addresses[0]?.id.toString())
                await setSendPrice(res?.data?.send_price)
                await setTotalPrice(res?.data?.total_price)
                // console.log(res)
                setDisablePromotion(false)
            }
        } catch (err) {
            console.log(err)
            setDisablePromotion(false)
            handleErrors(err)
        }
    }

    const initData = async () => {
        const arrayCoffee = []
        const arrayShop = []
        setLoading(true)
        const obj = {
            promotion_code: ''
        }
        try {
            const res = await getBasketData(obj)
            const res1 = await getDeliveryPrice()
            await setSendPrice(res1?.data?.delivery_prices[0]?.price)
            if (res.status === 200) {
                await setAddress(res?.data?.addresses)
                await setAddress_id(res?.data?.addresses[0]?.id.toString())
                // await setSendPrice(res?.data?.send_price)
                await setTotalPrice(res?.data?.total_price)
                const {cart_items} = res.data
                // console.log(cart_items)
                if (cart_items.length < 1) {
                    navigate('/cart')
                }
                cart_items.map(cart => {
                    if (cart.size === "s.p") {
                        arrayShop.push(cart)
                    } else {
                        arrayCoffee.push(cart)
                    }
                })
                await setShopItems(arrayShop)
                await setCoffeeItems(arrayCoffee)
                setLoading(false)
            }

        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    const handleEdit = async (obj) => {
        await setObjAddress(obj)
        setEditModal(true)
    }
    const handleBuy = async (values) => {
        const obj = {...values, address_id, description: '', promotion_code: '', send_type}
        // console.log("object is : ", obj)
        setLoadingPage(true)
        try {
            const res = await registerOrder(obj)
            if (res.status === 200) {
                toast.success(res.data.message)
                const res2 = await goPayment()
                if (res2.status === 200) {
                    const a = document.createElement('a')
                    a.href = res2.data.link
                    // a.target = '_blank'
                    a.click()
                    a.remove()
                }
                console.log(res2)
                setLoadingPage(false)
            }
        } catch (err) {
            setLoadingPage(false)
            handleErrors(err)
        }

    }
    // useEffect(() => {
    //     console.log(sendPrice)
    // }, [sendPrice])
    useEffect(() => {
        initData()
    }, [])

    return (
        <section className={styles.payment_page}>
            <EditAddressModal runFunction={() => initData()} address={objAddress} closeModal={() => setEditModal(false)}
                              showDialog={editModal}/>
            <AddAddressModal runFunction={() => initData()} showDialog={showAddAddress}
                             closeModal={() => setShowAddAddress(false)}/>
            <div className='inside'>
                <Formik onSubmit={values => handleBuy(values)} initialValues={{delivery_date: ''}}
                >
                    {({
                          setFieldValue,
                          handleSubmit,
                          errors,
                          setFieldTouched,
                          touched
                      }) => (
                        <div className={styles.inside}>
                            {shopItems.length > 0 ? <CollectionShop carts={shopItems}/> : null}
                            {coffeeItems.length > 0 ?
                                <CollectionCoffee carts={coffeeItems} send_type={(e) => setSend(e)}/> : null}
                            <div className={send_type !== 'ارسال با پیک' ? 'd-flex text-center align-middle justify-content-center mb-5' : styles.container_bottom}>
                                <div className={styles.card}>
                                    <p className={styles.title}>خلاصه صورت حساب شما</p>
                                    <div className={styles.row}>
                                        <p className={styles.price}>{numberWithCommas(totalPrice)} تومان</p>
                                        <p className={styles.label_text}>جمع کل سبد خرید:</p>
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.price}>{numberWithCommas(send_type === "ارسال با پیک" ? sendPrice : 0)} تومان</p>
                                        <p className={styles.label_text}>هزینه ارسال:</p>
                                    </div>
                                    <div className={styles.row_date}>
                                        <div className={styles.left_row_data}>
                                            {/*<div className={styles.container_date_picker}>*/}
                                            {/*    <DatePicker*/}
                                            {/*        className='date_picker2'*/}
                                            {/*        placeholder='تاریخ تحویل'*/}
                                            {/*        isGregorian={false}*/}
                                            {/*        showTodayButton={false}*/}
                                            {/*        onChange={value => {*/}
                                            {/*            setFieldValue('delivery_date', value.format('jYYYY/jM/jD HH:mm'))*/}
                                            {/*        }}*/}
                                            {/*        onBlur={() => setFieldTouched('delivery_date')}*/}
                                            {/*    />*/}
                                            {/*    <ErrorMessageDate error={errors.delivery_date}*/}
                                            {/*                      visible={touched.delivery_date}/>*/}
                                            {/*    <img src={calenderImage} className='calender_image'*/}
                                            {/*         alt="image calender"/>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className={styles.div_code}>
                                            <button disabled={disablePromotion} onClick={() => handlePromotion()}>
                                                {
                                                    disablePromotion === false ? 'اعمال' :
                                                        <Spinner size={'sm'} className='invoice-list-wrapper'
                                                                 animation="border" color="white"
                                                                 variant="secondary"/>
                                                }
                                            </button>
                                            <input value={code} placeholder="کد تخفیف"
                                                   onChange={e => setCode(e.target.value)} type="text"/>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.total_price}>{numberWithCommas(send_type === "ارسال با پیک" ? (parseInt(totalPrice) + parseInt(sendPrice)) : totalPrice)} تومان</p>
                                        <p className={styles.label_text}>مبلغ قابل پرداخت:</p>
                                    </div>
                                    <div className={styles.container_btn}>
                                        <button type='button' disabled={loadingPage} onClick={handleSubmit}
                                                className={styles.btn_submit}>
                                            {
                                                loadingPage === false ? 'پرداخت نهایی و ثبت سفارش' :
                                                    <Spinner size={'sm'} className='invoice-list-wrapper'
                                                             animation="border" color="white"
                                                             variant="secondary"/>
                                            }
                                        </button>
                                    </div>
                                </div>
                                {send_type !== 'ارسال با پیک' ? null : <div className={styles.card}>
                                    <p className={styles.title}>آدرس تحویل سفارش</p>
                                    {loading ? <Loading/> :
                                        // (address.length > 0 ?
                                        <div className={styles.container_options}>
                                            <RadioGroup value={address_id} onChange={setAddress_id} defaultValue="post"
                                                        classNames={{
                                                            label: styles.label,
                                                            radioWrapper: styles.radio_wrapper2,
                                                            radio: 'root_radio',
                                                        }
                                                        }
                                            >
                                                {
                                                    address.map((item, index) => (
                                                        <Radio key={index} value={item.id.toString()}
                                                               label={
                                                                   <div className={styles.radio}>
                                                                       <div className={styles.top_address}>
                                                                           <div className={styles.right_top_address}>
                                                                               <img src={locationIcon} alt=""/>
                                                                               <p>{item?.location}</p>
                                                                           </div>
                                                                           <img className={styles.edit_image}
                                                                                onClick={() => {
                                                                                    handleEdit(item)
                                                                                }} src={editIcon} alt=""/>

                                                                       </div>
                                                                       <div className={styles.container_receiver}>
                                                                           <img src={userIcon} alt=""/>
                                                                           <p>{item?.receiver_name}</p>
                                                                       </div>

                                                                   </div>}
                                                        />
                                                    ))
                                                }

                                            </RadioGroup>
                                            <div className={styles.container_add_address}>
                                                <button onClick={() => setShowAddAddress(true)}
                                                        className={styles.btn_add_address}>افزودن آدرس جدید
                                                </button>
                                            </div>
                                        </div>
                                        // : <div className='alert alert-primary alert_text'>آدرس برای شما ثبت نشده
                                        //     است.</div>)
                                    }
                                </div>}

                            </div>
                        </div>

                    )}
                </Formik>
            </div>
            <ChangeTitle title='پرداخت'/>
        </section>
    )
}
export default Payment
