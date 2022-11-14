import styles from './delete.module.scss'
import {DialogOverlay, DialogContent} from '@reach/dialog';
import pic from './pic.png'

import CloseDialog from "../../components/CloseDialog/CloseDialog";
import {useState} from "react";
import {Spinner} from "reactstrap";
import handleErrors from "../../helper/handleErrors";
import {deleteCart} from "../../services/buyService";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/actions/loginActions";

const DeleteModal = ({showDialog, closeModal, runFunction, cart_id, image}) => {

    // variables
    const [isDisable, setIsDisable] = useState(false)
    const dispatch = useDispatch()

    //functions
    const handleDeleteCart = async () => {
        setIsDisable(true)
        try {
            const res = await deleteCart(cart_id)
            if (res.status === 200) {
                await dispatch(setUser())
                toast.success('آیتم مورد نظر حذف شد.')
                setIsDisable(false)
                runFunction()
                closeModal()
            }
        } catch (err) {
            setIsDisable(false)
            handleErrors(err)
            closeModal()
        }
    }


    return (
        <DialogOverlay isOpen={showDialog} onDismiss={closeModal} style={{background: 'var(--bg-modal)'}}>
            <DialogContent className={styles.dialog_delete} onKeyDown={e => {
                if (e.key === 'Enter') {
                    handleDeleteCart()
                }
            }}>
                <CloseDialog runFunction={closeModal}/>
                <p className={styles.title}>آیا از حذف آیتم مطمئن هستین؟</p>
                {/*<img src={pic} className={styles.img} alt=""/>*/}
                <img src={image} className={styles.img} alt=""/>
                <div className={styles.container_btn}>
                    <button disabled={isDisable} onClick={() => closeModal()} className={styles.cancel_btn}>لغو</button>
                    <button disabled={isDisable} onClick={() => handleDeleteCart()} className={styles.confirm_btn}>
                        {
                            isDisable === false ? 'حذف' :
                                <Spinner size={'sm'} className='invoice-list-wrapper'
                                         animation="border" color="white"
                                         variant="secondary"/>
                        }
                    </button>
                </div>
            </DialogContent>
        </DialogOverlay>
    )
}
export default DeleteModal

