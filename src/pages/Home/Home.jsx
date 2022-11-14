import './home.scss'
import {useEffect, useState} from 'react'
import {getDataPage} from "../../services/pagesServeice";
import ProductsHome from "../../components/ProductsHome/ProductsHome";
import Loading from "../../components/Loading/Loading";
import BestSelling from "../../components/BestSelling/BestSelling";
import ApplicationHome from "../../components/ApplicationHome/ApplicationHome";
import Player from "../../components/Player/Player";
import Instagram from "../../components/Instagram/Instagram";
import BannerHome from "../../components/BannerHome/BannerHome";
import SelectBranch from "../../components/SelectBranch/SelectBranch";
import NewSlider from "../../components/NewSlider/NewSlider";

const Home = () => {
    //variable
    const [loading, setLoading] = useState(false)
    const [dataHome, setDataHome] = useState({})
    const [instagramItems, setInstagramItems] = useState([])

    //functions
    const initData = async () => {
        setLoading(true)
        try {
            const res = await getDataPage('MAIN_PAGE')
            if (res.status === 200) {
                const data = res?.data?.MAIN_PAGE
                await setDataHome(data)
                await setInstagramItems(data?.insta_pics)
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        initData()
    }, [])

    return (
        <div className='home'>
            {loading ? <Loading fullScrean={true}/> :
                <div className='inside_home'>
                    <BannerHome images={dataHome.banners}/>
                    <SelectBranch/>
                    {/*<ProductsHome products={dataHome.products}/>*/}
                    <NewSlider title="محصولات ما" products={dataHome.products}/>
                    <Player/>
                    {/*<BestSelling products={dataHome.most_bought}/>*/}
                    <NewSlider title="پرفروش ترین ها" products={dataHome.most_bought}/>

                    <ApplicationHome/>
                    <Instagram images={instagramItems}/>
                </div>
            }

        </div>
    )
}
export default Home
