import styles from './selectBranch.module.scss'
import Leaf from "../Leaf/Leaf";
import {setBranchId} from "../../redux/actions/optionActions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useClickOutside} from "@mantine/hooks";

const SelectBranch = () => {
    //variable
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const ref = useClickOutside(() => setShowMenu(false));
    const options = useSelector(state => state.options)


    const handleBranches = async (id) => {
        await localStorage.setItem("branch_id", id)
        await dispatch(setBranchId(id))
        setShowMenu(false)
        navigate('/emza')
    }
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Leaf className={styles.leaf}/>
                <p className={styles.title}>کافه امضا</p>
                <p className={styles.text}>به سفارش خود روح و جان ببخشید.</p>
                <p className={styles.text}>لذت خرید کالای سفارشی شده با محصولات امضا کافه</p>

                <button onClick={() => setShowMenu(true)}>امضا خود را سفارش دهید</button>
                {showMenu && <div ref={ref} className={styles.menu}>
                    {options?.header?.branches.map(item => (
                        <p className={styles.subtitle} onClick={() => handleBranches(item.id)}>شعبه {item?.name}</p>
                    ))}
                </div>}
            </div>
        </div>
    )
}
export default SelectBranch