import EmzaCafeInput from "../EmzaCafeInput/EmzaCafeInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {Spinner} from "reactstrap";
import {useEffect, useState} from "react";
import ShowTimer from "../ShowTimer/ShowTimer";
import {codeConfirm, registerUser, sendMobileNumber} from "../../services/authService";
import {Formik} from "formik";
import * as Yup from 'yup'
import {toast} from "react-toastify";
import {showErrors} from "../../helper/showErrors";
import {RadioGroup, Radio, Checkbox, CheckboxGroup} from '@mantine/core';
import {validations} from "../../helper/validationSchema";
import DatePicker from 'react-datepicker2'
import calenderImage from './../../assets/images/calender.svg'
import {useNavigate} from 'react-router-dom'
import ErrorMessageDate from "../ErrorMessage/ErrorMessageDate";
import handleErrors from "../../helper/handleErrors";
import {useDispatch} from "react-redux";
import {setUser, userLogin} from "../../redux/actions/loginActions";
import {preventDragHandler} from "../../helper/functions";

const validationSchema = Yup.object().shape({
    firstname: validations.firstname,
    lastname: validations.lastname,
    city: validations.city,
    province: validations.province,
    birthdate: validations.birthdate
})

const MobileConfirm = ({objMobile}) => {
    //variables
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isDisable, setIsDisable] = useState(false)
    const [isDisableSendAgain, setIsDisableSendAgain] = useState(false)
    const [sendAgain, setSendAgain] = useState(false)
    const [formData, setFormData] = useState(false)
    const [checkValue, setCheckValue] = useState([]);
    const [gender, setGender] = useState('MALE');
    const [referral_code, setReferral_code] = useState('')
    const [btnDisable, setBtnDisable] = useState(false)

    const [number, setNumber] = useState(['', '', '', '', '', ''])
    const numOfFields = 6;
    let codeNumber = ''
    //functions
    const handleCodeConfirm = async () => {
        const code = number.join('')
        const objCode = {
            verification_code: code
        }
        if (code.length > 5) {
            setIsDisable(true)
            // setIsDisableSendAgain(true)
            try {
                const res = await codeConfirm(objCode)
                if (res.status === 200) {
                    setIsDisable(false)
                    if (res.data.exist === false) {
                        toast.success(res.data.message)
                        setFormData(true)
                    } else {
                        localStorage.setItem('token', res.data.token)
                        dispatch(userLogin())
                        dispatch(setUser())
                        navigate('/')
                        toast.success(res.data.message)
                    }
                    setIsDisable(false)
                }
            } catch (err) {
                setIsDisable(false)
                handleErrors(err)
                // showErrors(err)
            }
        } else {
            toast.error('لطفا کد را کامل وارد کنید.')
        }
    }
    const handleSendAgain = async () => {
        setIsDisable(true)
        setSendAgain(true)
        setIsDisableSendAgain(true)
        try {
            const res = await sendMobileNumber(objMobile)
            if (res.status === 200) {
                toast.success(res.data.message)
                setSendAgain(false)
            }
            setIsDisable(false)
        } catch (err) {
            setIsDisable(false)
            showErrors(err)
            setIsDisable(false)
        }
    }
    const handleTextChange = (e, index) => {
        const {maxLength, value, name} = e.target;
        const [fieldName, fieldIndex] = name.split("-");
        let temp = [...number]
        temp[index] = value;
        setNumber(temp)
        codeNumber = temp
        if (value.length >= maxLength) {
            if (parseInt(fieldIndex, 10) < numOfFields) {
                const nextSibling = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );
                if (nextSibling !== null) {
                    nextSibling.focus();
                    return
                }
            }
        }
        if (value === '') {
            const previousSibling = document.querySelector(
                `input[name=ssn-${parseInt(index)}]`
            );
            if (previousSibling !== null) {
                previousSibling.focus();
                return
            }
        }
    }

    const handleRegister = async (values) => {
        const code = number.join('')
        const objCode = {
            verification_code: code
        }
        const result = checkValue.includes('rules')
        let objData = {...values, ...objMobile, ...objCode, gender}
        if (referral_code.length > 0) {
            objData = {...objData, referral_code}
        }
        console.log(objData)
        if (result) {
            // navigate('/dashboard')
            setIsDisable(true)
            try {
                const res = await registerUser(objData)
                if (res.status === 200) {
                    toast.success(res.data.message)
                    await localStorage.setItem("token", res.data.token)
                    await dispatch(setUser())
                    await dispatch(userLogin())
                    setIsDisable(false)
                    console.log(res)
                    navigate('/dashboard/profile')
                }
                //     setIsDisable(false)
            } catch (err) {
                setIsDisable(false)
                console.log(err)
                handleErrors(err)
                //     // showErrors(err)
            }
        } else {
            toast.error('فیلد قوانین و مقررات الزامی است.')
        }
    }

    return (
        <>
            {formData ?
                <Formik validationSchema={validationSchema} onSubmit={values => handleRegister(values)} initialValues={{
                    firstname: '',
                    lastname: '',
                    city: '',
                    birthdate: '',
                    province: '',
                }}>
                    {({
                          setFieldValue,
                          handleChange,
                          handleSubmit,
                          values,
                          errors,
                          setFieldTouched,
                          touched
                      }) => (
                        <div className='card_login card_form_data' onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleSubmit()
                            }
                        }}>
                            <p className='title_card_login'>ثبت نام</p>
                            <p className='text_login'>برای خرید از کافه امضا و استفاده از خدمات سایت لازم است ثبت نام
                                کنید:</p>
                            <RadioGroup value={gender} onChange={setGender}
                                        classNames={{
                                            label: 'label_radio',
                                            radioWrapper: 'radioWrapper',
                                            radio: 'root_radio',
                                        }
                                        }
                            >
                                <Radio value="FEMALE" label="خانم"/>
                                <Radio value="MALE" label="آقا"/>

                            </RadioGroup>
                            <EmzaCafeInput marginBottom={16} type='text' value={values.firstname}
                                           handleChange={handleChange('firstname')}
                                           handleBlur={() => setFieldTouched('firstname')} placeholder='نام'/>
                            <ErrorMessage error={errors.firstname} visible={touched.firstname}/>
                            <EmzaCafeInput marginBottom={16} type='text' value={values.lastname}
                                           handleChange={handleChange('lastname')}
                                           handleBlur={() => setFieldTouched('lastname')} placeholder="نام خانوادگی"/>
                            <ErrorMessage error={errors.lastname} visible={touched.lastname}/>
                            <div className='container_date_picker'>
                                <DatePicker
                                    className='date_picker2'
                                    placeholder='تاریخ تولد'
                                    isGregorian={false}
                                    isUTC={true}
                                    timePicker={false}
                                    showTodayButton={false}
                                    onChange={value => {
                                        setFieldValue('birthdate', value.local('es').format('YYYY/M/D'))
                                    }}
                                    onBlur={() => setFieldTouched('birthdate')}
                                />
                                <ErrorMessageDate error={errors.birthdate} visible={touched.birthdate}/>
                                <img onDragStart={e => preventDragHandler(e)} src={calenderImage}
                                     className='calender_image' alt="image calender"/>
                            </div>
                            <div className='container_city'>
                                <div><EmzaCafeInput marginBottom={16} type='text' value={values.province}
                                                    handleChange={handleChange('province')}
                                                    handleBlur={() => setFieldTouched('province')} placeholder='استان'/>
                                    <ErrorMessage error={errors.province} visible={touched.province}/></div>
                                <div><EmzaCafeInput marginBottom={16} type='text' value={values.city}
                                                    handleChange={handleChange('city')}
                                                    handleBlur={() => setFieldTouched('city')} placeholder='شهر'/>
                                    <ErrorMessage error={errors.city} visible={touched.city}/></div>
                            </div>
                            <EmzaCafeInput marginBottom={16} type='text' value={referral_code}
                                           handleChange={e => setReferral_code(e)}
                                           placeholder="کد معرف"/>
                            <CheckboxGroup defaultValue={[]} value={checkValue} onChange={setCheckValue} classNames={{
                                root: 'root_check_box',
                                label: 'label_check_box',
                                input: 'input_check_box',
                                icon: 'icon_check_box'
                            }}>
                                <Checkbox value="rules"
                                          label="قوانین و مقررات امضا کافه را میپذیرم."
                                />
                            </CheckboxGroup>
                            <button disabled={btnDisable} type='submit' onClick={handleSubmit} className='btn_login'>{
                                isDisable === false ? 'تایید' :
                                    <Spinner size={'sm'} className='invoice-list-wrapper'
                                             animation="border" color="white"
                                             variant="secondary"/>
                            }
                            </button>
                        </div>
                    )}
                </Formik>
                :
                <div className='card_login' onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleCodeConfirm()
                    }
                }}>
                    <p className='title_card_login'>وارد کردن کد فعال سازی</p>
                    <p className='text_login'>کد شش رقمی به شماره شما ارسال شده است. کد را در کادر زیر وارد
                        کنید.</p>
                    <div className='containerInputCodeOPT'>
                        {number.map((_, index) =>
                            <input key={index} maxLength={1} onChange={(e) => handleTextChange(e, index)}
                                   name={`ssn-${index + 1}`} className='inputCodeOPt' type="number"/>
                        )
                        }
                    </div>
                    {!sendAgain ? <ShowTimer marginTop='8px' setSendAgain={setSendAgain}
                                             runFunction={() => setSendAgain(true)}/> : null}
                    {!sendAgain ?
                        <button disabled={btnDisable} onClick={() => handleCodeConfirm()} className='btn_login'>{
                            isDisable === false ? 'تایید' :
                                <Spinner size={'sm'} className='invoice-list-wrapper'
                                         animation="border" color="white"
                                         variant="secondary"/>
                        }
                        </button> : null}
                    {sendAgain ? <p onClick={() => handleSendAgain()} className='text_send_again'>
                        {
                            isDisable === false ? 'ارسال مجدد کد' :
                                <Spinner size={'sm'} className='invoice-list-wrapper'
                                         animation="border" color="#56311F"
                                         variant="secondary"/>
                        }
                    </p> : null}
                </div>
            }
        </>

    )
}
export default MobileConfirm
