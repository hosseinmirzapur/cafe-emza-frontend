import styles from './newSlider.module.scss'
import TitleInPage from "../TitleInPage/TitleInPage";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import PaginationSlider from "../Pagination/Pagination";
import NavigationSlider from "../NavigationSlider/NavigationSlider";
import ItemInSlider from "../ItemInSlider/ItemInSlider";

const NewSlider = ({products, title}) => {

    // variables
    const breakpointsSlider = {
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
            slidesPerView: 3,
            spaceBetween: 10
        },
        1000: {
            slidesPerView: 4,
            spaceBetween: 10
        }
    }

    // functions
    return (
        <section className={styles.products_home}>
            <div className='inside'>
                <TitleInPage title={title}/>
                <Swiper className='mt-2'
                        slidesPerView={4}
                        loop={true}
                        modules={[Pagination]}
                        dir="rtl"
                        breakpoints={breakpointsSlider}
                        pagination={PaginationSlider}
                >
                    {products?.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <ItemInSlider key={index} product={item}/>
                        </SwiperSlide>
                    ))}
                    <NavigationSlider slidesLength={products?.length}/>
                </Swiper>
            </div>
        </section>
    )
}
export default NewSlider
