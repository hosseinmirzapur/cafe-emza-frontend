import styles from './recruitment.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import TitleInPage from "../../components/TitleInPage/TitleInPage";
import {Formik} from "formik";
import * as Yup from 'yup'
import {validations} from "../../helper/validationSchema";
import EmzaCafeInput from "../../components/EmzaCafeInput/EmzaCafeInput";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {useRef, useState} from 'react'
import {Spinner} from "reactstrap";
import pic_back from './pic_back.svg'
import handleErrors from "../../helper/handleErrors";
import {cv} from "../../services/pagesServeice";
import {toast} from "react-toastify";

const validationSchema = Yup.object().shape({
    firstname: validations.firstname,
    lastname: validations.lastname,
    email: validations.email,
    phone: validations.phone_number,
    major: Yup.string().required('پر کردن این فیلد الزامی است.'),
    cv_file: Yup.mixed().nullable().required('لطفا رزومه انتخاب کنید.')
})

const Recruitment = () => {
    const btnUpload = useRef()
    const [isDisable, setIsDisable] = useState(false)
    const handleOpenDialog = () => {
        btnUpload.current.click()
    }
    const handleRegister = async (values, resetForm) => {
        console.log(values)
        setIsDisable(true)
        const formData = new FormData()
        formData.append("firstname", values.firstname)
        formData.append("lastname", values.lastname)
        formData.append("email", values.email)
        formData.append("major", values.major)
        formData.append("phone", values.phone)
        formData.append('cv_file', values.cv_file)
        try {
            const res = await cv(formData)
            if (res.status === 200) {
                toast.success('درخواست شما ثبت شد.')
                setIsDisable(false)
              await  resetForm()
            }
        } catch (err) {
            setIsDisable(false)
            console.log(err)
            handleErrors(err)
        }

    }
    return (
        <section className={styles.recruitment_page}>
            <img src={pic_back} className={styles.pic_back} alt=""/>
            <ChangeTitlePage title='استخدام'/>
            <div className='inside'>
                <div className={styles.inside}>
                    <TitleInPage title='استخدام'/>
                    <Formik initialValues={{
                        firstname: '',
                        lastname: '',
                        phone: '',
                        email: '',
                        major: '',
                        cv_file: null
                    }}
                            onSubmit={(values, {resetForm}) => handleRegister(values, resetForm)}
                            validationSchema={validationSchema}>
                        {({
                              values,
                              setFieldValue,
                              errors,
                              handleSubmit,
                              handleChange,
                              touched,
                              setFieldTouched
                          }) => (
                            <div className={styles.card}>
                                <div className={styles.inside_card}>
                                    <div>
                                        <EmzaCafeInput value={values.firstname} placeholder='نام'
                                                       handleChange={handleChange('firstname')}
                                                       marginBottom={16}
                                                       handleBlur={() => setFieldTouched('firstname')}/>
                                        <ErrorMessage marginBottom={8} error={errors.firstname}
                                                      visible={touched.firstname}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.lastname} placeholder='نام خانوادگی'
                                                       handleChange={handleChange('lastname')}
                                                       marginBottom={16}
                                                       handleBlur={() => setFieldTouched('lastname')}/>
                                        <ErrorMessage marginBottom={8} error={errors.lastname}
                                                      visible={touched.lastname}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.phone} placeholder='شماره تماس'
                                                       handleChange={handleChange('phone')} maxLength={11}
                                                       marginBottom={16} type='tel' textAlignLeft={true} number={true}
                                                       handleBlur={() => setFieldTouched('phone')}/>
                                        <ErrorMessage error={errors.phone} visible={touched.phone}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.email} placeholder='ایمیل'
                                                       handleChange={handleChange('email')}
                                                       marginBottom={16} type='email' textAlignLeft={true}
                                                       handleBlur={() => setFieldTouched('email')}/>
                                        <ErrorMessage error={errors.email} visible={touched.email}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.major} placeholder='رشته تحصیلی'
                                                       handleChange={handleChange('major')}
                                                       marginBottom={16} type='text'
                                                       handleBlur={() => setFieldTouched('major')}/>
                                        <ErrorMessage error={errors.major} visible={touched.major}/>
                                    </div>
                                    <div>
                                        <div className={styles.container_up}>
                                            <div className={styles.container_btn_upload}>
                                                <button disabled={isDisable} onClick={() => handleOpenDialog()}
                                                        className='btn_login'>آپلود
                                                    فایل
                                                    رزومه
                                                </button>
                                            </div>
                                            <p>فایل مورد نظر دارای فرمت pdf باشد.</p>
                                        </div>
                                        <ErrorMessage marginTop={5} error={errors.cv_file} visible={touched.cv_file}/>
                                    </div>
                                    <input accept=".pdf"
                                           onChange={event => setFieldValue("cv_file", event.target.files[0])}
                                           ref={btnUpload}
                                           className={styles.btnUpload} type='file'/>
                                </div>
                                <div className={styles.container_submit}>
                                    <button disabled={isDisable} onClick={handleSubmit}
                                            className={`btn_login ${styles.btn_submit}`}>
                                        {
                                            isDisable === false ? 'ارسال درخواست' :
                                                <Spinner size={'sm'} className='invoice-list-wrapper'
                                                         animation="border" color="white"
                                                         variant="secondary"/>
                                        }
                                    </button>
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}
export default Recruitment