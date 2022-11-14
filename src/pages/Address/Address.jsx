import styles from './address.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import Loading from "../../components/Loading/Loading";
import {Link} from 'react-router-dom'
import AddressItem from "../../components/AddressItem/AddressItem";
import {getAddress} from "../../services/addressService";

const Address = () => {

    //variables
    const [showLoading, setLoading] = useState(true)
    const [addresses, setAddresses] = useState([])
    const user = useSelector(state => state.user)

    const initData = async () => {
        setLoading(true)
        const res = await getAddress()
        if (res.status === 200) {
            await setAddresses(res.data.addresses)
            setLoading(false)
        }

    }

    useEffect(() => {
        initData()
    }, [])
    return (
        <section className={styles.address_page}>
            {showLoading ? <Loading/> : addresses?.length > 0 ?
                addresses.map((address, index) => (
                    <AddressItem runFunction={()=>initData()} key={index} address={address}/>
                ))
                :
                <div className='alert alert-primary alert_text'>آدرس برای شما ثبت نشده است.</div>
            }
            <Link to='/dashboard/add_edit_address'>
                <button className='btn_dashboard'>افزودن آدرس جدید</button>

            </Link>

            <ChangeTitlePage title='آدرس ها'/>
        </section>
    )
}
export default Address