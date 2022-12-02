import styles from './buttonContactUs.module.scss'
import {Formik} from "formik";
import * as Yup from 'yup'
import {validations} from "../../helper/validationSchema";
import EmzaCafeInput from "../EmzaCafeInput/EmzaCafeInput";
import {useState, useEffect} from "react";
import {Spinner} from "reactstrap";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import EmzaCaferTextArea from "../EmzaCafeInput/EmzaCaferTextArea";
import {Select} from '@mantine/core';

import whatsapp from '../../assets/images/social_media/whatsapp.svg'
import instagram from '../../assets/images/social_media/instagram.svg'
import youtube from '../../assets/images/social_media/youtube.svg'
import twitter from '../../assets/images/social_media/twitter.svg'
import iconTelegram from './../../assets/images/telegramIcon.svg'
import post from './post.svg'
import phone from './phone.svg'
import location from './location.svg'
import handleErrors from "../../helper/handleErrors";
import {contact_us_form} from "../../services/pagesServeice";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import Loading from "../Loading/Loading";

const validationSchema = Yup.object().shape({
    email: validations.email,
    description: Yup.string().required('پر کردن این فیلد الزامیست.'),
    full_name: Yup.string().required('پر کردن این فیلد الزامیست.'),
    phone_number: Yup.string().matches(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/, 'شماره موبایل معتبر نیست').required('این فیلد الزامی می باشد.').length(11, 'طول شماره تلفن باید 11 کاراکتر باشد.'),
    title: Yup.string().required('پر کردن این فیلد الزامیست.')
})
const initialValues =
    {
        full_name: '',
        phone_number: '',
        title: '',
        email: '',
        description: ''
    }


const ButtonContactUs = () => {

    //varible
    const login = useSelector(state => state.login)
    const [isDisable, setIsDisable] = useState(false)
    const [branche, set_branche] = useState({})
    const [branches, setBranches] = useState([])
    const options = useSelector(state => state.options)
    const branchesList = options?.header?.branches
    const [loading, setLoading] = useState(true)
    const [branche_id, set_branche_id] = useState(-1)

    //functions
    const handleRegister = async (values, resetForm) => {

        if (login) {
            setIsDisable(true)
            try {
                const res = await contact_us_form(values)
                if (res.status === 200) {
                    toast.success(res.data.message)
                    setIsDisable(false)
                    resetForm()
                }

            } catch (err) {
                setIsDisable(false)
                handleErrors(err)
            }
        } else {
            toast.info('برای ثبت الزامیست که وارد حساب کاربری خود شوید.')
        }

    }
    // const findBrnach = async () => {
    //     const obj = branches?.find(item => item.id === branche_id)
    //     await set_branche(obj)
    // }

    const createData = async () => {
        setLoading(true)
        const arrResult = []
        branchesList.map(item => {
            const obj = {...item, label: item?.name, value: item?.id}
            arrResult.push(obj)
        })
        await setBranches(arrResult)
        await set_branche(branches[0])
        setLoading(false)
    }
    const findBranch = async () => {
        setLoading(true)
        const obj = branches.find(item => item.id == branche_id)
        await set_branche(obj)
        setLoading(false)
    }
    useEffect(() => {
        createData()
    }, [])

    useEffect(() => {
        findBranch()
    }, [branche_id])
    return (
        <section className={styles.button_contact_us}>
            <div className='inside'>
                <div className={styles.inside}>
                    <div className={styles.left}>
                        <div className={styles.card}>
                            <Formik initialValues={initialValues} validationSchema={validationSchema}
                                    onSubmit={(values, {resetForm}) => handleRegister(values, resetForm)}>
                                {({handleSubmit, values, setFieldTouched, handleChange, errors, touched}) => (
                                    <div onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            handleSubmit()
                                        }
                                    }} className={'d-flex flex-column gap-1'}>
                                        <p className={styles.title_card}>ارتباط با امور مشتریان</p>
                                        <p className={styles.title_card1}>همچنین شما می توانید شکایات، انتقادات و
                                            پیشنهادات سازنده خود را از این طریق با ما در میان بگذارید.</p>
                                        <EmzaCafeInput placeholder='نام و نام خانوادگی'
                                                       handleChange={handleChange('full_name')}
                                                       handleBlur={() => setFieldTouched('full_name')} marginBottom={18}
                                                       value={values.full_name}/>
                                        <ErrorMessage error={errors.full_name} visible={touched.full_name}/>
                                        <EmzaCafeInput placeholder='ایمیل (اختیاری)'
                                                       textAlignLeft={true}
                                                       handleChange={handleChange('email')}
                                                       handleBlur={() => setFieldTouched('email')}
                                                       value={values.email} type='email'/>
                                        <p className={styles.email_section}>* در صورت وارد نمودن ایمیل، میتوانید از
                                            نتیجه بررسی پیام خود مطلع شوید</p>
                                        <ErrorMessage error={errors.email} visible={touched.email}/>

                                        <EmzaCafeInput value={values.phone_number} marginBottom={16}
                                                       handleChange={handleChange('phone_number')}
                                                       handleBlur={() => setFieldTouched('phone_number')}
                                                       placeholder='شماره تماس' type='tel' textAlignLeft={true}
                                                       number={true}
                                        />
                                        <ErrorMessage error={errors.phone_number} visible={touched.phone_number}/>

                                        <EmzaCafeInput value={values.title} marginBottom={16}
                                                       handleChange={handleChange('title')}
                                                       handleBlur={() => setFieldTouched('title')}
                                                       placeholder='عنوان' type='text'
                                        />
                                        <ErrorMessage error={errors.title} visible={touched.title}/>

                                        <EmzaCaferTextArea value={values.description} marginBottom={16}
                                                           handleChange={handleChange('description')}
                                                           handleBlur={() => setFieldTouched('description')}
                                                           placeholder='توضیحات'
                                        />
                                        <ErrorMessage error={errors.description} visible={touched.description}/>
                                        <button type='button' disabled={isDisable} className='btn_login'
                                                onClick={handleSubmit}>{
                                            isDisable === false ? 'ارسال' :
                                                <Spinner size={'sm'} className='invoice-list-wrapper'
                                                         animation="border" color="white"
                                                         variant="secondary"/>
                                        }</button>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </div>
                    {loading ? <Loading/> : <div className={styles.right}>
                        <p className={styles.title}>ما را در شبکه های اجتماعی دنبال کنید</p>
                        <Select
                            classNames={{
                                label: styles.label_select,
                                wrapper: styles.wrapper,
                                input: styles.input_select,
                                item: styles.item_select,
                                root: styles.root
                            }}
                            placeholder='انتخاب شعبه'
                            label="شعبه مورد نظر را انتخاب کنید :"
                            // defaultValue={branches[0]?.id.toString()}
                            data={branches} onChange={set_branche_id}
                        />
                        {branche_id == -1 ? null : <div className={styles.container_icons}>
                            {branche?.instagram ?
                                <a href={branche?.instagram} target="_blank"> <img src={instagram}
                                                                                   alt=""/></a> : null}
                            {branche?.whatsapp ?
                                <a href={branche?.whatsapp} target="_blank"> <img src={whatsapp}
                                                                                  alt=""/></a> : null}
                            {branche?.youtube ?
                                <a href={branche?.youtube} target="_blank"> <img src={youtube}
                                                                                 alt=""/></a> : null}
                            {branche?.twitter ?
                                <a href={branche?.twitter} target="_blank"> <img src={twitter}
                                                                                 alt=""/></a> : null}
                            {/*{branche?.telegram ?*/}
                            {/*    <a href={branche?.telegram} target="_blank"> <img src={iconTelegram}*/}
                            {/*                                                      alt=""/></a> : null}*/}
                        </div>
                        }                        <p className={styles.text}>با توجه به حجم بالای تماس ها ممکن است امکان
                        پاسخگویی به تمام درخواست
                        های شما وجود نداشته
                        باشد. لذا خواهشمند است تا جای ممکن سوالات و مشکلات خود را با پشتیبانی آنلاین یا از طریق
                        ایمیل با این بخش مطرح کنید.</p>
                        {/*<p className={styles.text}>هفت روز هفته در 24 ساعت شبانه روز در پاسخگوی شما هستیم.</p>*/}
                        {branche?.address ? <div className={styles.div_data}>
                            <p>{branche?.address}</p>
                            <img src={location} alt=""/>
                        </div> : null}
                        {branche?.phone_number ? <div className={styles.div_data}>
                            <a href={`tel:${branche?.phone_number}`}>{branche?.phone_number}</a>
                            <img src={phone} alt=""/>
                        </div> : null}
                        {/*<div className={styles.div_data}>*/}
                        {/*    <p>mfarshbaf92@yahoo.com</p>*/}
                        {/*    <img src={post} alt=""/>*/}
                        {/*</div>*/}
                    </div>}
                </div>
            </div>
        </section>
    )
}
export default ButtonContactUs
