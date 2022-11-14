import styles from './addressItem.module.scss'
import editIcon from './edit.svg'
import deleteIcon from './delete.svg'
import locationIcon from './location.svg'
import userIcon from './user.svg'
import {useState} from "react";
import {deleteAddress} from "../../services/addressService";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/actions/loginActions";
import {Spinner} from "reactstrap";
import handleErrors from "../../helper/handleErrors";
import {useNavigate} from 'react-router-dom'

const AddressItem = ({address, runFunction}) => {

    //variable
    const navigate = useNavigate()
    const [isDisable, setIsDisable] = useState(false)
    const dispatch = useDispatch()
    //functions
    const handleEdit = () => {
        navigate(`/dashboard/edit_address/${address.id}`)
    }
    const handleDeleteAddress = async () => {
        setIsDisable(true)
        try {
            const res = await deleteAddress(address?.id)
            if (res.status === 200) {
                toast.success('آدرس مورد نظر حذف شد.')
                runFunction()
                await dispatch(setUser())
                setIsDisable(false)
            }
        } catch (err) {
            handleErrors(err)
            setIsDisable(false)
        }
    }
    return (
        <div className={styles.address_item}>
            <div className={styles.command_section}>
                <img onClick={() => handleEdit()} src={editIcon} alt=""/>
                {
                    isDisable === false ? <img onClick={() => handleDeleteAddress()} src={deleteIcon} alt=""/> :
                        <Spinner size={'sm'} className='invoice-list-wrapper'
                                 animation="border" color="black"
                                 variant="secondary"/>
                }
            </div>
            <div className={styles.data_section}>
                <div className={styles.container_location}>
                    <p>{address?.location}</p>
                    <img src={locationIcon} alt=""/>
                </div>
                <div className={styles.container_receiver}>
                    <p>{address?.receiver_name}</p>
                    <img src={userIcon} alt=""/>
                </div>
            </div>
        </div>
    )
}
export default AddressItem