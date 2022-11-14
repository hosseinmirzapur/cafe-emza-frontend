import leafImage from '../../assets/images/leaf.svg'
import './leaf.scss'

const Leaf = ({className}) => {
    return (
        <img className={`image_leaf ${className}`} src={leafImage} alt="leaf image"/>
    )
}
export default Leaf