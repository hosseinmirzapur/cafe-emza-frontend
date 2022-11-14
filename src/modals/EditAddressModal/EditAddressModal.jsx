import styles from './editAddress.module.scss'
import {useState} from "react";
import {DialogContent, DialogOverlay} from "@reach/dialog";
import CloseDialog from "../../components/CloseDialog/CloseDialog";
import {Formik} from "formik";
import * as Yup from 'yup'
import {validations} from "../../helper/validationSchema";
import EmzaCaferTextArea from "../../components/EmzaCafeInput/EmzaCaferTextArea";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import EmzaCafeInput from "../../components/EmzaCafeInput/EmzaCafeInput";
import {Spinner} from "reactstrap";
import {editAddress} from "../../services/addressService";
import {setUser} from "../../redux/actions/loginActions";
import {toast} from "react-toastify";
import handleErrors from "../../helper/handleErrors";
import {useDispatch} from "react-redux";

const validationSchema = Yup.object().shape({
    location: Yup.string().required('پر کردن این فیلد الزامی می باشد.'),
    receiver_name: validations.firstname,
    receiver_phone_number: validations.phone_number
})

const EditAddressModal = ({showDialog, closeModal, address, runFunction}) => {

    //variables
    const [isDisable, setIsDisable] = useState(false)
    const dispatch = useDispatch()

    //functions
    const handleEditAddress = async (values) => {
        setIsDisable(true)
        try {
            const res = await editAddress(address.id, values)
            if (res.status === 200) {
                await dispatch(setUser())
                toast.success(res.data.message)
                setIsDisable(false)
                runFunction()
                closeModal()
            }

        } catch (err) {
            setIsDisable(false)
            handleErrors(err)
        }
    }

    return (
        <DialogOverlay isOpen={showDialog} onDismiss={closeModal} style={{background: 'var(--bg-modal)'}}>
            <DialogContent className={styles.dialog_edit}>
                <Formik validationSchema={validationSchema} initialValues={{
                    location: address?.location,
                    receiver_name: address?.receiver_name,
                    receiver_phone_number: address?.receiver_phone_number
                }} onSubmit={values => handleEditAddress(values)}>
                    {({handleSubmit, setFieldTouched, touched, handleChange, errors, values}) => (
                        <div className={styles.div}>
                            <CloseDialog runFunction={closeModal}/>
                            <p className={styles.title}>تغییر آدرس</p>
                            <EmzaCaferTextArea value={values.location} marginBottom={16} placeholder='آدرس'
                                               row={3} handleBlur={() => setFieldTouched('location')}
                                               handleChange={handleChange('location')}/>
                            <ErrorMessage marginBottom={8} error={errors.location}
                                          visible={touched.location}/>
                            <div className={styles.row}>
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
                            <div className={styles.container_submit}>
                                <button onClick={handleSubmit} className={`${styles.btn_submit}`}> {
                                    isDisable === false ? 'ثبت اطلاعات' :
                                        <Spinner size={'sm'} className='invoice-list-wrapper'
                                                 animation="border" color="white"
                                                 variant="secondary"/>
                                }</button>
                            </div>
                        </div>
                    )}

                </Formik>


            </DialogContent>
        </DialogOverlay>
    )
}
export default EditAddressModal