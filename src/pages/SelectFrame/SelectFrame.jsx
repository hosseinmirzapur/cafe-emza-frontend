import styles from './SelectFrame.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import pic_back from "../SelectSentence/pic_back.svg";
import Leaf from "../../components/Leaf/Leaf";
import {Formik} from "formik";
import * as Yup from 'yup'
import {Checkbox} from '@mantine/core';
import {validations} from "../../helper/validationSchema";
import EmzaCafeInput from "../../components/EmzaCafeInput/EmzaCafeInput";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {useState, useEffect} from 'react'
import {dataFrame} from "./dataFrame";
import {Radio, RadioGroup} from "@mantine/core";
import {useLocation, useNavigate} from 'react-router-dom'
import {Spinner} from "reactstrap";
import handleErrors from "../../helper/handleErrors";
import {buy, editOrder} from "../../services/buyService";
import {toast} from "react-toastify";
import {setUser} from "../../redux/actions/loginActions";
import {useDispatch, useSelector} from "react-redux";
import {goTopAbove} from "../../helper/functions";

const validationSchema = Yup.object().shape({
    from: validations.firstname,
    to: validations.firstname
})
const SelectFrame = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [checked, setChecked] = useState(false);
    const [isDisable, setIsDisable] = useState(false)
    const [frame, setFrame] = useState('comment')
    const dispatch = useDispatch()
    // const options = useSelector(state => state)
    const branchId = localStorage.getItem('branch_id')
    // console.log("branch_id: " + branchId)
    // console.log("branch_id from redux: " + options.branchId)
    const handleBuy = async (values) => {
        const obj = {...state.obj, ...values, frame}
        setIsDisable(true)

        if (checked) {
            if (obj["id"]) {
                try {
                    const res = await editOrder(obj)
                    if (res.status === 200) {
                        toast.success(res.data.message)
                        setIsDisable(false)
                        navigate('/cart')
                    }

                } catch (err) {
                    handleErrors(err)
                    setIsDisable(false)
                }
            } else {
                try {
                    const res = await buy(obj, branchId)
                    if (res.status === 200) {
                        await dispatch(setUser())
                        setIsDisable(false)
                        navigate('/emza')
                        toast.success("از انتخابت خوشم اومد!")
                    }

                } catch (err) {
                    handleErrors(err)
                    setIsDisable(false)
                }
            }
        } else {
            setIsDisable(false)
            toast.error('پذیرفتن مسئولیت امضا الزامی است.')
        }

    }

    useEffect(() => {
        goTopAbove()
    }, [])
    return (
        <section className={styles.select_frame_page}>
            <img src={pic_back} className={styles.img_back} alt=""/>
            <Formik initialValues={{from: '', to: ''}} validationSchema={validationSchema}
                    onSubmit={values => handleBuy(values)}>
                {({handleChange, handleSubmit, values, setFieldTouched, errors, touched}) => (
                    <div className='inside'>
                        <div className={styles.inside}>
                            <div className={styles.right}>
                                <div className='w-100'>
                                    <EmzaCafeInput marginBottom={16} type='text' value={values.from}
                                                   handleChange={handleChange('from')}
                                                   handleBlur={() => setFieldTouched('from')}
                                                   placeholder="فرستنده"/>
                                    <ErrorMessage error={errors.from} visible={touched.from}/>
                                </div>
                                <p className={state.language === 'فارسی' ? styles.persian_text : styles.english_text}>
                                    {state.language === 'فارسی' ? state.sentence.farsi_text : state.sentence.english_text}
                                </p>
                                <div className='w-100'>
                                    <EmzaCafeInput marginBottom={16} type='text' value={values.to}
                                                   handleChange={handleChange('to')}
                                                   handleBlur={() => setFieldTouched('to')}
                                                   placeholder="گیرنده"/>
                                    <ErrorMessage error={errors.to} visible={touched.to}/>
                                </div>
                                <Leaf className={styles.leaf}/>
                            </div>
                            <div className={styles.left}>
                                <p className={styles.text_select_frame}>لطفا قالب متن را انتخاب کنید :</p>
                                <div className={styles.container_radio}>
                                    <RadioGroup value={frame} onChange={setFrame}
                                                classNames={{
                                                    label: styles.label_radio,
                                                    // radioWrapper: 'radioWrapper',
                                                    radioWrapper: styles.radio_wrapper_frame,
                                                    // radioWrapper: styles,
                                                    radio: 'root_radio',
                                                    // radio: styles.root,
                                                }
                                                }
                                    >
                                        {dataFrame.map((item, index) => (
                                            <Radio key={index} value={item.value} label={<div className={styles.label}>
                                                <p>{item.title}</p>
                                                <img className={styles.shape} src={item.icon} alt=""/>
                                            </div>}/>
                                        ))}

                                    </RadioGroup>
                                </div>
                                <div className={styles.section_button}>
                                    <div className={styles.right_section_button}>
                                        {/*<img src={icon} alt=""/>*/}
                                        {/*<p>مسئولیت متن اضافه شده با مشتری می باشد.</p>*/}
                                        <Checkbox checked={checked} classNames={{
                                            root: styles.root_check,
                                            label: styles.label_check_box,
                                            input: 'input_check_box',
                                            icon: 'icon_check_box'
                                        }}
                                                  label='مسئولیت متن اضافه شده با مشتری می باشد.'
                                                  onChange={(event) => setChecked(event.currentTarget.checked)}/>
                                    </div>
                                    <button onClick={handleSubmit} disabled={isDisable} className={styles.btn}>{
                                        isDisable === false ? 'افزودن به سبد خرید' :
                                            <Spinner size={'sm'} className='invoice-list-wrapper'
                                                     animation="border" color="white"
                                                     variant="secondary"/>
                                    }</button>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
            <ChangeTitlePage title='انتخاب قالب'/>
        </section>
    )
}
export default SelectFrame
