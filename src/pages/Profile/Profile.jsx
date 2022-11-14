import styles from './profile.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import {Formik} from "formik";
import * as Yup from 'yup'
import {validations} from "../../helper/validationSchema";
import EmzaCafeInput from "../../components/EmzaCafeInput/EmzaCafeInput";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {useDispatch, useSelector} from "react-redux";
import {useState, useRef, useEffect} from "react";
import {Radio, RadioGroup} from "@mantine/core";
import {Spinner} from "reactstrap";
import Loading from "../../components/Loading/Loading";
import DatePicker from "react-datepicker2";
import ErrorMessageDate from "../../components/ErrorMessage/ErrorMessageDate";
import calenderImage from "../../assets/images/calender.svg";
import moment from 'moment-jalaali'
import {userUpdate} from "../../services/authService";
import {setUser} from "../../redux/actions/loginActions";
import {toast} from "react-toastify";
import {showErrors} from "../../helper/showErrors";
import handleErrors from "../../helper/handleErrors";

const validationSchema = Yup.object().shape({
    firstname: validations.firstname,
    lastname: validations.lastname,
    city: validations.city,
    province: validations.province,
    birthdate: validations.birthdate,
    phone_number: validations.phone_number,
})
const Profile = () => {


    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [gender, setGender] = useState(user?.profile?.gender)
    const [isDisable, setIsDisable] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleChangeProfile = async (values) => {
        const objProfile = {...values, gender}
        setIsDisable(true)
        try {
            const res = await userUpdate(objProfile)
            if (res.status === 200) {
                await dispatch(setUser())
                toast.success(res.data.message)
                setIsDisable(false)
            }
        } catch (err) {
            setIsDisable(false)
            handleErrors(err)
            // showErrors(err)
        }
    }
    const handleSetGender = async () => {
        await setGender(user?.profile?.gender)
        setLoading(false)
    }
    const initData = async () => {
        setTimeout(() => {
            setGender(user?.profile?.gender)
            handleSetGender()
            // setLoading(false)
        }, 3000)
        // await setGender(user?.profile?.gender)

    }

    useEffect(() => {
        initData()
    }, [])
    return (
        <section className={styles.profile_page}>
            {loading ? <Loading/> :
                <Formik validationSchema={validationSchema} initialValues={{
                    firstname: user?.firstname,
                    lastname: user?.lastname,
                    city: user?.profile?.city,
                    birthdate: user?.profile?.birthdate,
                    province: user?.profile?.province,
                    phone_number: user?.phone_number,

                }} onSubmit={values => handleChangeProfile(values)}>
                    {({handleSubmit, setFieldValue, setFieldTouched, values, handleChange, errors, touched}) => (

                        <div className={styles.inside_profile} onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleSubmit()
                            }
                        }}>
                            <div className={styles.row}>
                                <div className='d-flex justify-content-start align-items-center'>
                                    <RadioGroup value={gender} onChange={setGender} defaultValue={gender}
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
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className='w-100'>
                                    <EmzaCafeInput marginBottom={16} type='text' value={values?.firstname}
                                                   handleChange={handleChange('firstname')}
                                                   handleBlur={() => setFieldTouched('firstname')} placeholder='نام'/>
                                    <ErrorMessage error={errors.firstname} visible={touched.firstname}/>
                                </div>
                                <div className='w-100'>
                                    <EmzaCafeInput marginBottom={16} type='text' value={values?.lastname}
                                                   handleChange={handleChange('lastname')}
                                                   handleBlur={() => setFieldTouched('lastname')}
                                                   placeholder="نام خانوادگی"/>
                                    <ErrorMessage error={errors.lastname} visible={touched.lastname}/>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className='w-100'>
                                    <div className='container_date_picker'>
                                        <label className={styles.label_date}>تاریخ تولد</label>
                                        <DatePicker
                                            className='date_picker2'
                                            placeholder='تاریخ تولد'
                                            isGregorian={false}
                                            value={user?.profile?.birthdate ? moment(user?.profile?.birthdate) : null}
                                            isUTC={true}
                                            timePicker={false}
                                            showTodayButton={false}
                                            onChange={value => {
                                                setFieldValue('birthdate', value.local('es').format('YYYY/M/D'))
                                            }}
                                            onBlur={() => setFieldTouched('birthdate')}
                                        />
                                        <ErrorMessageDate error={errors.birthdate} visible={touched.birthdate}/>
                                        <img src={calenderImage} className='calender_image' alt="image calender"/>
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <EmzaCafeInput marginBottom={16} type='tel' value={values?.phone_number}
                                                   handleChange={handleChange('phone_number')} number={true}
                                                   maxLength={11}
                                                   handleBlur={() => setFieldTouched('phone_number')}
                                                   textAlignLeft={true}
                                                   placeholder="شماره موبایل"/>
                                    <ErrorMessage error={errors.phone_number} visible={touched.phone_number}/>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className='w-100'>
                                    <EmzaCafeInput marginBottom={16} type='text' value={values?.province}
                                                   handleChange={handleChange('province')}
                                                   handleBlur={() => setFieldTouched('province')} placeholder='استان'/>
                                    <ErrorMessage error={errors.province} visible={touched.province}/>
                                </div>
                                <div className='w-100'>
                                    <EmzaCafeInput marginBottom={16} type='text' value={values?.city}
                                                   handleChange={handleChange('city')}
                                                   handleBlur={() => setFieldTouched('city')} placeholder='شهر'/>
                                    <ErrorMessage error={errors.city} visible={touched.city}/>
                                </div>
                            </div>


                            <button type='submit' disabled={isDisable} className='btn_dashboard'
                                    onClick={handleSubmit}>{
                                isDisable === false ? 'ثبت اطلاعات' :
                                    <Spinner size={'sm'} className='invoice-list-wrapper'
                                             animation="border" color="white"
                                             variant="secondary"/>
                            }</button>
                        </div>
                    )}
                </Formik>
            }
            <ChangeTitlePage title='اطلاعات کاربر'/>
        </section>
    )
}
export default Profile