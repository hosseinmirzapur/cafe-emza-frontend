import './closeModal.scss'
import icon from './icon.svg'

const CloseDialog = ({runFunction}) => {
    return (
        <img src={icon} onClick={() => runFunction()} className='closeDialogBtn' alt=""/>
    )
}
export default CloseDialog