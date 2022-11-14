import styles from './Participation.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import pic_back from "../Recruitment/pic_back.svg";
import TitleInPage from "../../components/TitleInPage/TitleInPage";
import {Formik} from "formik";
import * as Yup from 'yup'
import {validations} from "../../helper/validationSchema";
import {useState} from "react";
import EmzaCafeInput from "../../components/EmzaCafeInput/EmzaCafeInput";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {Spinner} from "reactstrap";
import EmzaCaferTextArea from "../../components/EmzaCafeInput/EmzaCaferTextArea";
import handleErrors from "../../helper/handleErrors";
import {association} from "../../services/pagesServeice";
import {toast} from "react-toastify";

const validationSchema = Yup.object().shape({
    full_name: validations.firstname,
    real_estate_status: validations.lastname,
    ownership_type: validations.lastname,
    permission_type: validations.lastname,
    phone: validations.phone_number,
    postal_code: validations.firstname,
    description: validations.firstname,
    email: validations.email,
})

const Participation = () => {
    const [isDisable, setIsDisable] = useState(false)
    const handleRegister = async (values, resetForm) => {
        setIsDisable(true)
        try {
            const res = await association(values)
            if (res.status === 200) {
                resetForm()
                toast.success('درخواست شما با موفقیت ثبت شد.')
                setIsDisable(false)
            }
        } catch (err) {
            setIsDisable(false)
            console.log(err)
            handleErrors(err)
        }
    }
    return (
        <section className={styles.participation_page}>
            <img src={pic_back} className={styles.pic_back} alt=""/>
            <ChangeTitlePage title='مشارکت'/>
            <div className="inside">
                <div className={styles.inside}>
                    <TitleInPage title='درخواست همکاری'/>
                    <Formik initialValues={{
                        full_name: '',
                        real_estate_status: '',
                        ownership_type: '',
                        permission_type: '',
                        phone: '',
                        postal_code: '',
                        description: '',
                        email: '',
                    }}
                            onSubmit={(values, {resetForm}) => handleRegister(values, resetForm)}
                            validationSchema={validationSchema}>
                        {({
                              values,
                              errors,
                              handleSubmit,
                              handleChange,
                              touched,
                              setFieldTouched
                          }) => (
                            <div className={styles.card}>
                                <div className={styles.inside_card}>
                                    <div>
                                        <EmzaCafeInput value={values.full_name} placeholder='نام و نام خانوادگی'
                                                       handleChange={handleChange('full_name')}
                                                       marginBottom={16}
                                                       handleBlur={() => setFieldTouched('full_name')}/>
                                        <ErrorMessage marginBottom={8} error={errors.full_name}
                                                      visible={touched.full_name}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.real_estate_status} placeholder='خلاصه وضعیت ملک'
                                                       handleChange={handleChange('real_estate_status')}
                                                       marginBottom={16}
                                                       handleBlur={() => setFieldTouched('real_estate_status')}/>
                                        <ErrorMessage marginBottom={8} error={errors.real_estate_status}
                                                      visible={touched.real_estate_status}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.ownership_type} placeholder='نوع مالکیت'
                                                       handleChange={handleChange('ownership_type')}
                                                       marginBottom={16}
                                                       handleBlur={() => setFieldTouched('ownership_type')}/>
                                        <ErrorMessage marginBottom={8} error={errors.ownership_type}
                                                      visible={touched.ownership_type}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.permission_type} placeholder='نوع جواز'
                                                       handleChange={handleChange('permission_type')}
                                                       marginBottom={16}
                                                       handleBlur={() => setFieldTouched('permission_type')}/>
                                        <ErrorMessage marginBottom={8} error={errors.permission_type}
                                                      visible={touched.permission_type}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.phone} placeholder='شماره تماس'
                                                       handleChange={handleChange('phone')}
                                                       marginBottom={16}
                                                       handleBlur={() => setFieldTouched('phone')}/>
                                        <ErrorMessage marginBottom={8} error={errors.phone}
                                                      visible={touched.phone}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.email} placeholder='ایمیل'
                                                       handleChange={handleChange('email')} textAlignLeft={true}
                                                       marginBottom={16} type='email'
                                                       handleBlur={() => setFieldTouched('email')}/>
                                        <ErrorMessage marginBottom={8} error={errors.email}
                                                      visible={touched.email}/>
                                    </div>
                                    <div>
                                        <EmzaCaferTextArea value={values.postal_code} marginBottom={16}
                                                           placeholder='آدرس پستی'
                                                           handleBlur={() => setFieldTouched('postal_code')}
                                                           handleChange={handleChange('postal_code')}/>
                                        <ErrorMessage marginBottom={8} error={errors.postal_code}
                                                      visible={touched.postal_code}/>
                                    </div>
                                    <div>
                                        <EmzaCaferTextArea value={values.description} marginBottom={16}
                                                           placeholder='اطلاعات ملک'
                                                           handleBlur={() => setFieldTouched('description')}
                                                           handleChange={handleChange('description')}/>
                                        <ErrorMessage marginBottom={8} error={errors.description}
                                                      visible={touched.description}/>
                                    </div>
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
export default Participation