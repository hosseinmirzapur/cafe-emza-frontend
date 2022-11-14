import styles from './bestSelling.module.scss'
import TitleInPage from "../TitleInPage/TitleInPage";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import PaginationSlider from "../Pagination/Pagination";
import NavigationSlider from "../NavigationSlider/NavigationSlider";
import CardBestSelling from "../CardBestSelling/CardBestSelling";

const BestSelling = ({products}) => {
    console.log("products is : ", products)
    const breakpoints = {
        320: {
            slidesPerView: 2,
            spaceBetween: 2
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 2
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 10
        }
    }
    return (
        <section className={styles.best_section}>
            <div className='inside'>
                <TitleInPage title='پرفروش ترین ها'/>
                <Swiper className='mt-3' slidesPerView={3}
                        redSlides={true}
                        centeredSlides={true}
                        loop={true}
                        modules={[Pagination]}
                        dir="rtl"
                        breakpoints={breakpoints}
                        pagination={PaginationSlider}>
                    {products?.map(item => (
                        <SwiperSlide key={item.id}>
                            <CardBestSelling product={item}/>
                        </SwiperSlide>
                    ))}
                    <NavigationSlider slidesLength={products?.length}/>
                </Swiper>
            </div>
        </section>
    )
}
export default BestSelling