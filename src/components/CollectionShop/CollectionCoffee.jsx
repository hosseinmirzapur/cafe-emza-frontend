import styles from './collectionShop.module.scss'
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import SwiperCore, {Pagination, Navigation} from "swiper";
import {Radio, RadioGroup} from "@mantine/core";
import {useState, useEffect} from 'react'
import motor_pic from './grayMotor.svg'
import location_pic from './location.svg'
import {preventDragHandler} from "../../helper/functions";


const CollectionCoffee = ({send_type,carts}) => {
    // console.log(carts)
    const [sendType, setSendType] = useState("دریافت در محل")
    useEffect(() => {
        send_type(sendType)
    }, [sendType])
    return (
        <div className={styles.collection_shop}>
            <p className={styles.title}>مرسوله کافه امضا</p>
            <Swiper modules={[Navigation]}

                    breakpoints={
                        {
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 40
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40
                            }
                        }
                    }
                    scrollbar={{draggable: true}}
                    slidesPerView={6.5} dir="rtl">
                {carts.map(item=>(
                    <SwiperSlide>
                        <div className={styles.card}><img src={item?.product?.image} alt=""/><span>{item?.quantity}</span></div>
                    </SwiperSlide>
                ))}

            </Swiper>
            <div className={styles.container_radio}>
                <RadioGroup value={sendType} onChange={setSendType} defaultValue="دریافت در محل"
                            classNames={{
                                label: styles.label,
                                radioWrapper: styles.radio_wrapper2,
                                radio: 'root_radio',
                            }
                            }
                >
                    <Radio value="ارسال با پیک" label={<div className={styles.radio}>
                        <p className={styles.gray_dark}>ارسال با پیک</p>
                        <img onDragStart={e=>preventDragHandler(e)} src={motor_pic} alt=""/>
                    </div>}/>
                    <Radio value="دریافت در محل" label={<div className={styles.radio}>
                        <p className={styles.gray_dark}>دریافت در محل</p>
                        <img onDragStart={e=>preventDragHandler(e)} src={location_pic} alt=""/>
                    </div>}/>

                </RadioGroup>
            </div>
        </div>
    )
}
export default CollectionCoffee