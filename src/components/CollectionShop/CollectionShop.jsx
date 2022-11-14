import styles from './collectionShop.module.scss'
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import SwiperCore, {Pagination, Navigation} from "swiper";
import imgProduct from './product.png'
import {Radio, RadioGroup} from "@mantine/core";
import {useState} from 'react'
import motor_pic from './motor.svg'
import {preventDragHandler} from "../../helper/functions";

const CollectionShop = ({carts}) => {
    const [sendType, setSendType] = useState("post")
    return (
        <div className={styles.collection_shop}>
            <p className={styles.title}>مرسوله فروشگاه</p>
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
                {carts.map((cart, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.card}><img src={cart?.product?.image}
                                                          alt=""/><span>{cart?.quantity}</span></div>
                    </SwiperSlide>
                ))}

            </Swiper>
            <div className={styles.container_radio}>
                <RadioGroup value={sendType} onChange={setSendType} defaultValue="post"
                            classNames={{
                                label: styles.label,
                                radioWrapper: styles.radio_wrapper,
                                radio: 'root_radio',
                            }
                            }
                >
                    <Radio value="post" label={<div className={styles.radio}>
                        <p>ارسال با پیک</p>
                        <img onDragStart={e=>preventDragHandler(e)} src={motor_pic} alt=""/>
                    </div>}/>

                </RadioGroup>
            </div>
        </div>
    )
}
export default CollectionShop