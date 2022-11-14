import styles from './cartItem.module.scss'
import {numberWithCommas, preventDragHandler} from "../../helper/functions";
import Counter from "../Counter/Counter";
import {useState} from 'react'
import arrow from './arrow.svg'
import {Collapse} from '@mantine/core';
import {useNavigate} from 'react-router-dom'
import DeleteModal from "../../modals/DeleteModal/DeleteModal";
import handleErrors from "../../helper/handleErrors";
import {editCart} from "../../services/buyService";
import heat_icon from './health.svg'
import comment_icon from './message.svg'
import cloud_icon from './cloud.svg'

const CartItem = ({cart, runFunction}) => {
    //variables
    const navigate = useNavigate()
    const [isDisable, setIsDisable] = useState(false)
    const [showDialogDelete, setShowDialogDelete] = useState(false)
    const [quantity, setQuantity] = useState(cart.quantity)
    const [showDetails, setShowDetails] = useState(false)

    const handleFindFrame = frame => {
        switch (frame) {
            case "comment":
                return comment_icon
            case "cloud":
                return cloud_icon
            default:
                return heat_icon
        }
    }
    const handleSub = async () => {
        if (quantity === 1) {
            setShowDialogDelete(true)
        } else {
            // await setQuantity(quantity - 1)
            handleEditCart(quantity - 1)
        }
    }
    const handleAdd = async () => {
        // await setQuantity(quantity + 1)
        handleEditCart(quantity + 1)
    }
    const handleEditCart = async (count) => {
        setIsDisable(true)
        try {
            const res = await editCart(count, cart.id)
            if (res.status === 200) {
                runFunction()
            }
            setIsDisable(false)
        } catch (err) {
            setIsDisable(false)
            handleErrors(err)
        }
    }

    const findSize = () => {
        switch (cart?.size) {
            case 'small':
                return 'کوچک'
            case 'medium':
                return 'متوسط'
            default:
                return 'بزرگ'
        }
    }


    return (

        <div className={styles.item}>
            <div className={styles.top_card}>
                <div className={styles.section}>
                    <p className={styles.total_price}>{numberWithCommas(quantity * cart?.price)}{cart.from !== null ?
                        <img onDragStart={e=>preventDragHandler(e)} src={arrow} onClick={() => setShowDetails(!showDetails)}
                             className={`${styles.arrow_image} ${showDetails ? styles.rotate : null}`}
                             alt=""/> : null}</p>
                </div>
                <div className={styles.section}>
                    <Counter value={quantity} sub={() => handleSub()} add={() => handleAdd()}/>
                </div>
                <div className={styles.section}>
                    <p className={styles.price}>
                        {numberWithCommas(cart?.price)} تومان</p>
                </div>
                <div className={styles.description}>
                    <div className={styles.name_size}>
                        <p className={styles.name}>{cart?.product?.name}</p>
                        {cart?.size !== "s.p" ? <p className={styles.size}>سایز لیوان : {findSize()}</p> : null}
                    </div>
                    <div className={styles.container_image}>
                        <img src={cart?.product?.image} onDragStart={e=>preventDragHandler(e)} className={styles.img_product} alt=""/>
                    </div>
                </div>
            </div>
            <Collapse className={styles.container_collapse} in={showDetails}>
                <div className={styles.collapse}>
                    <img src={handleFindFrame(cart?.frame)} onDragStart={e=>preventDragHandler(e)} className={styles.img_frame} alt=""/>
                    <p>از طرف {cart.from}</p>
                    <p>{cart.sentence}</p>
                    <p>به {cart.to}</p>
                    <button onClick={() => {
                        navigate('/sentences', {
                            state: {
                                // objectOrder: {
                                id: cart.id,
                                sizeId: cart.size,
                                quantity: cart.quantity,
                                product_id: cart.product.id
                                // }
                            }
                        })
                    }}>ویرایش مضا
                    </button>
                </div>
            </Collapse>
            <DeleteModal cart_id={cart.id} image={cart?.product?.image} runFunction={() => runFunction()}
                         showDialog={showDialogDelete}
                         closeModal={() => setShowDialogDelete(false)}/>
        </div>
    )
}
export default CartItem