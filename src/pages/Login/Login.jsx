import './login.scss'
import leftBack from './leftBack.svg'
import rightBack from './rightBack.svg'
// import cupImage from './cup-min.png'
import cupImage from './register.png'
import {useState, useEffect} from 'react'
import EmzaCafeInput from "../../components/EmzaCafeInput/EmzaCafeInput";
import {Spinner} from "reactstrap";
import {Formik} from "formik";
import ErrorMessage from './../../components/ErrorMessage/ErrorMessage';
import * as Yup from 'yup'
import {sendMobileNumber} from "../../services/authService";
import {toast} from "react-toastify";
import {showErrors} from "../../helper/showErrors";
import MobileConfirm from "../../components/MobileConfirm/MobileConfirm";
import leafImage from '../../assets/images/leaf.svg'
import Leaf from "../../components/Leaf/Leaf";

const validationSchema = Yup.object().shape({
    phone_number: Yup.string().matches(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/, 'شماره موبایل معتبر نیست').required('این فیلد الزامی می باشد.').length(11, 'طول شماره تلفن باید 11 کاراکتر باشد.'),
})

const Login = () => {

    //variables
    const [isDisable, setIsDisable] = useState(false)
    const [confirmMode, setConfirmMode] = useState(false)

    const handleMobileNumber = async (values) => {
        // console.log(values)
        setIsDisable(true)
        try {
            const res = await sendMobileNumber(values)
            if (res.status === 200) {
                toast.success(res.data.message)
                setConfirmMode(true)
            }
            setIsDisable(false)
        } catch (err) {
            setIsDisable(false)
            showErrors(err)
            // console.log(err.data)
        }
    }
    useEffect(() => {
        setConfirmMode(false)
        // setConfirmMode(true)
        return () => {
            setConfirmMode(false)
        }
    }, [])
    return (
        <div className='login'>
            {/*<img src={leftBack} className='left_back' alt=""/>*/}
            {/*<img src={rightBack} className='right_back' alt=""/>*/}
            <img src={cupImage} alt="" className='cup_image'/>
            <Formik initialValues={{phone_number: ''}} onSubmit={values => handleMobileNumber(values)}
                    validationSchema={validationSchema}>
                {({values, errors, handleChange, handleSubmit, handleBlur, touched, setFieldTouched}) => (
                    <div className='inside_login' >
                        <div className='right_inside'>
                            {confirmMode ? null : <div className='card_login' onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    handleSubmit()
                                }
                            }}>
                                <Leaf/>
                                <p className='title_card_login'>به امضا کافه خوش آمدید</p>
                                <p className='text_login'>برای ورود شماره موبایلتان را وارد کنید تا کد فعال سازی برای
                                    شما ارسال
                                    شود.</p>
                                <EmzaCafeInput number type='tel' value={values.phone_number} marginBottom={32}
                                               handleChange={handleChange('phone_number')}
                                               handleBlur={() => setFieldTouched('phone_number')}
                                               textAlignLeft={true}
                                               maxLength={11} placeholder='شماره همراه'/>
                                <ErrorMessage error={errors.phone_number} visible={touched.phone_number}/>
                                <button onClick={() => handleSubmit()} className='btn_login'>{
                                    isDisable === false ? 'تایید' :
                                        <Spinner size={'sm'} className='invoice-list-wrapper'
                                                 animation="border" color="white"
                                                 variant="secondary"/>
                                }
                                </button>
                            </div>}
                            {confirmMode && <MobileConfirm objMobile={values}/>}
                        </div>

                    </div>
                )}
            </Formik>
        </div>
    )
}
export default Login