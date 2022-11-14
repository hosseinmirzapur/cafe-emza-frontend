import styles from './logo.scss'
import imageLogo from '../../assets/images/logo.svg'
import {Link} from 'react-router-dom'
import {preventDragHandler} from "../../helper/functions";

const Logo = ({className}) => {
    return (
        <Link to='/'>
            <img onDragStart={e=>preventDragHandler(e)} className={`logo ${className}`} src={imageLogo} alt="logo"/>
        </Link>
    )
}
export default Logo