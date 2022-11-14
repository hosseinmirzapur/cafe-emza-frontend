import styles from './addEditAddress.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import {Formik} from "formik";
import * as Yup from 'yup'
import {validations} from "../../helper/validationSchema";
import EmzaCaferTextArea from "../../components/EmzaCafeInput/EmzaCaferTextArea";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import EmzaCafeInput from "../../components/EmzaCafeInput/EmzaCafeInput";
import {useState, useEffect} from "react";
import {Spinner} from "reactstrap";
import handleErrors from "../../helper/handleErrors";
import {createAddress} from "../../services/addressService";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/actions/loginActions";
import {useNavigate, useParams} from 'react-router-dom'
import Loading from "../../components/Loading/Loading";

const validationSchema = Yup.object().shape({
    location: Yup.string().required('پر کردن این فیلد الزامی می باشد.'),
    receiver_name: validations.firstname,
    receiver_phone_number: validations.phone_number
})
const AddEditAddress = ({match}) => {

    //variables
    const user = useSelector(state => state.user)
    const params = useParams()
    const [isDisable, setIsDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const [objEdit, setObjEdit] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialValueAdd = {
        location: '',
        receiver_name: '',
        receiver_phone_number: ''
    }
    const handleAddress = async (values) => {
        setIsDisable(true)
        try {
            const res = await createAddress(values)
            if (res.status === 200) {
                await dispatch(setUser())
                toast.success(res.data.message)
                setIsDisable(false)
                navigate('/dashboard/address')
            }

        } catch (err) {
            setIsDisable(false)
            handleErrors(err)
        }
    }


    return (
        <section className={styles.add_address_page}>
            <Formik initialValues={params?.id ? objEdit : initialValueAdd} validationSchema={validationSchema}
                    onSubmit={values => handleAddress(values)}>
                {({handleSubmit, setFieldTouched, touched, handleChange, errors, values}) => (
                    <>
                        {loading ? <Loading/> :
                            <div className={styles.inside} onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    handleSubmit()
                                }
                            }}>
                                <EmzaCaferTextArea value={values.location} marginBottom={16} placeholder='آدرس'
                                                   row={3} handleBlur={() => setFieldTouched('location')}
                                                   handleChange={handleChange('location')}/>
                                <ErrorMessage marginBottom={8} error={errors.location}
                                              visible={touched.location}/>
                                <div className={styles.container_inputs}>
                                    <div>
                                        <EmzaCafeInput value={values.receiver_name} placeholder='گیرنده سفارش'
                                                       handleChange={handleChange('receiver_name')}
                                                       marginBottom={16}
                                                       handleBlur={() => setFieldTouched('receiver_name')}/>
                                        <ErrorMessage marginBottom={8} error={errors.receiver_name}
                                                      visible={touched.receiver_name}/>
                                    </div>
                                    <div>
                                        <EmzaCafeInput value={values.receiver_phone_number} placeholder='شماره تماس'
                                                       handleChange={handleChange('receiver_phone_number')}
                                                       marginBottom={16} type='tel' textAlignLeft={true} number={true}
                                                       maxLength={11}
                                                       handleBlur={() => setFieldTouched('receiver_phone_number')}/>
                                        <ErrorMessage marginBottom={8} error={errors.receiver_phone_number}
                                                      visible={touched.receiver_phone_number}/>
                                    </div>

                                </div>
                                <button disabled={isDisable} onClick={handleSubmit} className='btn_dashboard'>
                                    {
                                        isDisable === false ? 'ثبت اطلاعات' :
                                            <Spinner size={'sm'} className='invoice-list-wrapper'
                                                     animation="border" color="white"
                                                     variant="secondary"/>
                                    }
                                </button>
                            </div>
                        }
                    </>
                )}
            </Formik>
            <ChangeTitlePage title='آدرس جدید'/>
        </section>
    )
}
export default AddEditAddress