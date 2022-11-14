import styles from './search_page.module.scss'
import TitleInPage from "../../components/TitleInPage/TitleInPage";
import ChangeTitlePage from "../../helper/ChangeTitle";
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import handleErrors from "../../helper/handleErrors";
import {findProducts} from "../../services/productService";
import Loading from "../../components/Loading/Loading";
import SearchItem from "../../components/SearchItem/SearchItem";

const SearchPage = () => {

    //variables
    const params = useParams()
    const [branches, setBranches] = useState([])
    const [loading, setLoading] = useState(true)
    const [txt_input, set_txt_input] = useState("")

    // functions
    const findProduct = async (stringSearch) => {
        setLoading(true)
        try {
            const res = await findProducts(stringSearch)
            console.log("res is : ", res.data.branches)
            if (res.status === 200) {
                await setBranches(res.data.branches)
                setLoading(false)
                // set_txt_input("")
            }
        } catch (err) {
            // console.log(err)
            setLoading(false)
            handleErrors(err)
        }
    }

    useEffect(()=>{
        console.log(branches)
    },[branches])
    useEffect(() => {
        findProduct(params?.key)
    }, [])
    useEffect(() => {
        findProduct(params?.key)
    }, [params?.key])

    return (
        <section className={styles.page}>
            <div className="inside">
                <div className={styles.inside}>
                    <div className={styles.search_box} onKeyDown={e => {
                        if (e.key === 'Enter' && txt_input !== "") {
                            findProduct(txt_input)
                        }
                    }}>
                        <div className={styles.inside_search_box}>
                            <button onClick={() => findProduct(txt_input)} className={styles.btn_search}
                                    type="submit">بیاب
                            </button>
                            <input value={txt_input} onChange={e => set_txt_input(e.target.value)}
                                   className={styles.input} placeholder="جستجو" type="text"/>
                        </div>
                    </div>
                    <TitleInPage title="نتیجه جستجو"/>
                    {loading ? <Loading/> :
                        <div className={styles.container_cards}>
                            {branches?.length > 0 ?
                                branches?.map((branch, index) => (
                                    <div key={index} className={styles.container_branches}>
                                        <p className={styles.branch_name}>{branch?.name}</p>
                                        <div className={styles.container}>
                                            {branch?.products?.map(product => (
                                                <SearchItem id_branch={branch.id} key={product.id} product={product}/>
                                            ))}
                                        </div>
                                    </div>
                                )) :
                                <div className='w-100 alert alert-primary alert_text'>محصولی یافت نشد.</div>
                            }
                        </div>
                    }
                </div>
            </div>
            <ChangeTitlePage title="جستجو"/>
        </section>
    )
}
export default SearchPage