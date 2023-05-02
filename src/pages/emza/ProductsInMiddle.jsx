import styles from "./emza.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import NavigationEmza from "../../components/NavigationEmza/NavigationEmza";


const ProductsInMiddle = ({branch, categories, setSelectId, select_id}) => {
    return (
        <div className={styles.inside}>
            <p className={`mb-5 ${styles.branch_name}`}>{branch?.name}</p>
            <div className={styles.selector}>
                <Swiper
                    modules={
                        [
                            Navigation,
                            Pagination
                        ]
                    }
                    spaceBetween={10}
                    scrollbar={{draggable: true}}
                    loop={true}
                    slidesPerView={categories.length}
                    dir="rtl"
                >
                    {categories.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div onClick={() => {
                                setSelectId(item.id)
                            }}
                                 className={`${styles.item_select} ${select_id === item.id ? styles.active : ''}`}>
                                <img src={select_id === item.id ? item.active_image : item.passive_image}
                                     alt=""/>
                                <p className={styles.text_item}>{item.title}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                    <NavigationEmza/>
                </Swiper>
            </div>
        </div>
    );
};

export default ProductsInMiddle;
