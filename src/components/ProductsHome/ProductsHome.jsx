import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import styles from './productsHome.module.scss'
import TitleInPage from "../TitleInPage/TitleInPage";
import NavigationSlider from "../NavigationSlider/NavigationSlider";
import PaginationSlider from "../Pagination/Pagination";
import CardProductHome from "../CardProductHome/CardProductHome";

const ProductsHome = ({products}) => {
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
            slidesPerView: 3,
            spaceBetween: 30
        }
    }

    return (
        <section className={styles.products_home}>
            <div className='inside'>
                <TitleInPage title='محصولات ما'/>
                <Swiper className='mt-2'
                        slidesPerView={3}
                        redSlides={true}
                        centeredSlides={true}
                        loop={true}
                        modules={[Pagination]}
                        dir="rtl"
                        breakpoints={breakpoints}
                        pagination={PaginationSlider}
                >
                    {products?.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <CardProductHome product={item}/>
                        </SwiperSlide>
                    ))}
                    <NavigationSlider slidesLength={products?.length}/>
                </Swiper>
            </div>
        </section>
    )
}
export default ProductsHome