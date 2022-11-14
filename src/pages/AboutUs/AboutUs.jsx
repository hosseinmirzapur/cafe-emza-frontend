import styles from "./aboutUs.module.scss";
import ChangeTitle from "../../helper/ChangeTitle";
import {useState, useEffect} from 'react'
import handleErrors from "../../helper/handleErrors";
import {getDataPage} from "../../services/pagesServeice";
import AboutUsItem from "../../components/AboutUsItem/AboutUsItem";
import Loading from "../../components/Loading/Loading";
import {useSelector} from "react-redux";
import {goTopAbove, preventDragHandler, scrollToTopFunction} from "../../helper/functions";

const AboutUs = () => {
    // scrollToTopFunction()
    //variables
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const options = useSelector(state => state.options)

    //functions
    const initData = async () => {
        setLoading(true)
        try {
            const res = await getDataPage('about_us')
            if (res.status === 200) {
                await setData(res.data.ABOUT_US.about_us)
                setLoading(false)
                // scrollToTopFunction()
            }
        } catch (err) {
            setLoading(false)
            handleErrors(err)
            console.log(err)
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })

        initData()
        goTopAbove()
    }, [])
    return (
        <section className={styles.about_page}>

            <div className="inside">
                {loading ? <Loading height='700px' classs='loader'/> :
                    data.map((item, index) => (
                        <AboutUsItem key={index} key_item={index} item={item}/>
                    ))
                }

                <p className={styles.sub_title}>شعبه های کافه امضا</p>
                <div className={styles.container_images}>
                    {options?.header?.branches?.map((item, index) => (
                        <div key={index} className={styles.image_card}>
                            <div className={styles.cover}>{item?.name}</div>
                            <img onDragStart={e => preventDragHandler(e)} src={item?.branch_image} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
            <ChangeTitle title="درباره ما"/>
        </section>
    );
};
export default AboutUs;