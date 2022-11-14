import styles from './searchItem.module.scss'
import rateIcon from "../EmzaCard/rate.svg";
import {useState} from "react";
import {Spinner} from "reactstrap";
import {setBranchId} from "../../redux/actions/optionActions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const SearchItem = ({product, id_branch}) => {

    const [isDisable, setIsDisable] = useState(false)
    const login = useSelector(state => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //functions
    const handleBranches = async () => {
        if (login) {
            setIsDisable(true)
            if (product.is_cafe) {
                await localStorage.setItem("branch_id", id_branch)
                await dispatch(setBranchId(id_branch))
                navigate(`/product_details/${product.id}`, {state: product})
            } else {
                navigate(`/product_market/${product?.id}`)
            }
        } else {
            toast.info('لطفا ابتدا وارد شوید')
            navigate('/login')
        }


    }

    return (
        <div className={styles.card}>
            <div className={styles.container_img}>
                <img src={product.image} alt=""/>
            </div>
            <div className={styles.left}>
                <p className={styles.name}>{product.name}</p>
                {product?.ingredient ?
                    <p className={styles.ingredient}>{product.ingredient}</p>
                    : null}
                <div className={styles.container_rate}>
                    <div className={styles.star}>
                        <p className={styles.rate}>{product.rate_avg !== null ? product.rate_avg : 0}</p>
                        <img src={rateIcon} alt=""/>
                    </div>
                    <button className={styles.btn_buy} onClick={() => handleBranches()} type="submit">{
                        isDisable === false ? 'خرید' :
                            <Spinner size={'sm'} className='invoice-list-wrapper'
                                     animation="border" color="white"
                                     variant="secondary"/>
                    }</button>

                </div>

            </div>


        </div>
    )
}
export default SearchItem