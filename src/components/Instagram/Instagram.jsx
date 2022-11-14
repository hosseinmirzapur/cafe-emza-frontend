import styles from './instagram.module.scss'
import TitleInPage from "../TitleInPage/TitleInPage";

import Marquee from "react-marquee-slider";
import {useEffect, useState} from "react";
import FirstSection from "./FirstSection";
import CenterImage from "./CenterImage";
import SectionSecound from "./SectionSecound";

const Instagram = ({images}) => {

    //variables

    const [data, setData] = useState([])

    const initData = async () => {
        const step = 9
        const resultArray = []
        const countStep = parseInt(images.length / step)
        let start = 0

        for (let i = 0; i <= step * countStep; i = i + step) {
            const arr = images.slice(i, i + step)
            const obj = {images: arr}
            resultArray.push(obj)
            start = start + (step * countStep)
        }
        await setData(resultArray)
    }
    useEffect(() => {
        initData()
    }, [])

    return (
        <div className={styles.instagram_section}>
            <div className='inside'>
                <TitleInPage title='# امضا با حس عشق'/>
            </div>
            <div className={styles.inside}>
                <div className={styles.container_images}>

                    <div>
                        <Marquee direction='rtl' velocity={5}>
                            {data.map((item, index) => (
                                <div key={index} className={styles.container_divs}>
                                    <FirstSection key={index} data={item?.images}/>
                                    {item?.images?.length > 4 ? <CenterImage img={item}/> : null}
                                    {item?.images?.length > 5 ? <SectionSecound data={item?.images}/> : null}
                                </div>

                            ))}
                        </Marquee>
                    </div>


                </div>
            </div>
        </div>
    )
}
export default Instagram
