import styles from './market.module.scss'
import ChangeTitlePage from "../../helper/ChangeTitle";
import TitleInPage from "../../components/TitleInPage/TitleInPage";
import {RadioGroup, Radio, Checkbox, CheckboxGroup} from '@mantine/core';
import {useState, useEffect} from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import {Drawer, ScrollArea} from '@mantine/core';
import {useParams} from 'react-router-dom'
import {getMarket} from "../../services/pagesServeice";
import Loading from "../../components/Loading/Loading";
import _ from 'lodash'
import {goTopAbove} from "../../helper/functions";

const Market = () => {

    const params = useParams()
    const [checkValue, setCheckValue] = useState([]);
    const [gender, setGender] = useState('low');
    const [opened, setOpened] = useState(false);
    const [market, setMarket] = useState([])
    const [loading, setLoading] = useState(true)
    const [beanTypes, setBeanTypes] = useState([])
    const [coffeeTypes, setCoffeeTypes] = useState([])
    const [growthParts, setGrowthParts] = useState([])
    const [millTypes, setMillTypes] = useState([])
    const [filterArray, setFilterArray] = useState([])

    const [valuesBeanTypes, setValuesBeanTypes] = useState([]);
    const [valuesCoffeeTypes, setValuesCoffeeTypes] = useState([]);
    const [valuesGrowthParts, setValuesGrowthParts] = useState([]);
    const [valuesMillTypes, setValuesMillTypes] = useState([]);
    const [title, setTitle] = useState('')

    const classCheckBoxs = {
        root: 'root_check_box',
        label: styles.label_check_box,
        input: 'input_check_box',
        icon: 'icon_check_box'
    }


    //functions
    const resetArray = () => {
        setValuesBeanTypes([])
        setValuesCoffeeTypes([])
    }

    const filterProducts = async () => {
        setLoading(true)
        const resultArray = []
        if (valuesGrowthParts.length > 0) {
            market.map(item => {
                if (valuesGrowthParts.includes(item?.growth_parts[0]?.title)) {
                    resultArray.push(item)
                }
            })
        }
        if (valuesBeanTypes.length > 0) {
            market.map(item => {
                if (valuesBeanTypes.includes(item?.bean_types[0]?.title)) {
                    resultArray.push(item)
                }
            })
        }
        if (valuesMillTypes.length > 0) {
            market.map(item => {
                if (valuesMillTypes.includes(item?.mill_types[0]?.title)) {
                    resultArray.push(item)
                }
            })
        }
        if (valuesCoffeeTypes.length > 0) {
            market.map(item => {
                if (valuesCoffeeTypes.includes(item?.coffee_types[0]?.title)) {
                    resultArray.push(item)
                }
            })
        }
        let uniqueChars = [...new Set(resultArray)];
        // console.log("result array is :", [...new Set(resultArray)])
        // console.log("result array is :", resultArray)
        await setFilterArray(uniqueChars)
        // sorting()
        setLoading(false)
        // sorting()
    }

    const sorting = async () => {
        setLoading(true)
        switch (gender) {
            case "low":
                filterArray.sort((a, b) => a.price - b.price)
                setTimeout(() => {
                    setLoading(false)
                }, 500)
                return
            case "gron":
                filterArray.sort((a, b) => b.price - a.price)
                setTimeout(() => {
                    setLoading(false)
                }, 500)
                return
            case "new":
                filterArray.sort((a, b) => a.created_at - b.created_at)

                setTimeout(() => {
                    setLoading(false)
                }, 500)
                return
            case "rate":
                filterArray.sort((a, b) => b.created_at - a.created_at)

                setTimeout(() => {
                    setLoading(false)
                }, 500)
                return
        }
        setLoading(false)
        // console.log(filterArray)
    }
    const checkEmpty = async () => {
        if (valuesBeanTypes.length < 1 && valuesCoffeeTypes.length < 1 && valuesMillTypes.length < 1 && valuesGrowthParts.length < 1) {
            await setFilterArray(market)
        }
    }
    const initMarket = async () => {
        setLoading(true)
        const arrProducts = []
        try {
            const res = await getMarket()
            // console.log(res.data)
            if (res.status === 200) {
                console.log(res.data)
                await setBeanTypes(res?.data?.beanTypes)
                await setCoffeeTypes(res?.data?.coffeeTypes)
                await setGrowthParts(res?.data?.growthParts)
                await setMillTypes(res?.data?.millTypes)
                res?.data?.products.map(product => {
                    if (product.category_id === parseInt(params.id)) {
                        const p = {...product, rate_avg: product?.rate_avg.toString()}
                        arrProducts.push(p)
                        // arrProducts.push(product)
                    }
                })
                await setTitle(res?.data?.products[0]?.category?.title)
                await setMarket(arrProducts)
                await setFilterArray(arrProducts)
                setLoading(false)
                // sorting()

            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    useEffect(() => {
        setTitle(market[0]?.category?.title)
    }, [market])
    useEffect(() => {
        // sorting()
    }, [filterArray])
    useEffect(() => {
        filterProducts()
        checkEmpty()
    }, [valuesBeanTypes, valuesCoffeeTypes, valuesGrowthParts, valuesMillTypes])

    useEffect(() => {
        sorting()
    }, [gender])
    useEffect(() => {
        resetArray()
        initMarket()
        goTopAbove()
        // setFilterArray(market)
    }, [])
    useEffect(() => {
        initMarket()
    }, [params?.id])
    return (
        <section className={styles.market_page}>
            <ChangeTitlePage title='فروشگاه'/>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="فیلتر"
                padding="xl"
                size="xl"
            >
                <ScrollArea style={{height: 550}}>
                    {coffeeTypes.length > 0 ? <div className={styles.card_filter}>
                        <p className={styles.title_card_filter}>انواع قهوه</p>
                        <CheckboxGroup defaultValue={valuesCoffeeTypes}
                                       onChange={setValuesCoffeeTypes}
                                       classNames={{
                                           root: styles.root_check,
                                           label: styles.label_check_box,
                                           input: 'input_check_box',
                                           icon: 'icon_check_box'
                                       }}>
                            {coffeeTypes.map(item => (
                                <Checkbox key={item.id} value={item.title} label={item.title}/>
                            ))}
                        </CheckboxGroup>
                    </div> : null}
                    {growthParts.length > 0 ? <div className={styles.card_filter}>
                        <p className={styles.title_card_filter}>منطقه کشت</p>
                        <CheckboxGroup defaultValue={valuesGrowthParts} onChange={setValuesGrowthParts}
                                       classNames={{
                                           root: styles.root_check,
                                           label: styles.label_check_box,
                                           input: 'input_check_box',
                                           icon: 'icon_check_box'
                                       }}>
                            {growthParts.map(item => (
                                <Checkbox key={item.id} value={item.title} label={item.title}/>
                            ))}
                        </CheckboxGroup>
                    </div> : null}
                    {beanTypes.length > 0 ? <div className={styles.card_filter}>
                        <p className={styles.title_card_filter}>نوع دانه</p>
                        <CheckboxGroup defaultValue={valuesBeanTypes} onChange={setValuesBeanTypes}
                                       classNames={{
                                           root: styles.root_check,
                                           label: styles.label_check_box,
                                           input: 'input_check_box',
                                           icon: 'icon_check_box'
                                       }}>
                            {beanTypes.map(item => (
                                <Checkbox key={item.id} value={item.title} label={item.title}/>
                            ))}
                        </CheckboxGroup>
                    </div> : null}
                    {millTypes.length > 0 ? <div className={styles.card_filter}>
                        <p className={styles.title_card_filter}>نوع آسیاب</p>
                        <CheckboxGroup defaultValue={valuesMillTypes} onChange={setValuesMillTypes}
                                       classNames={{
                                           root: styles.root_check,
                                           label: styles.label_check_box,
                                           input: 'input_check_box',
                                           icon: 'icon_check_box'
                                       }}>
                            {millTypes.map(item => (
                                <Checkbox key={item.id} value={item.title} label={item.title}/>
                            ))}
                        </CheckboxGroup>
                    </div> : null}
                </ScrollArea>
                <button onClick={() => setOpened(false)} type="submit">اعمال فیلتر</button>

            </Drawer>
            <div className='inside'>
                {loading ? <Loading/> :
                    <div className={styles.inside}>
                        <TitleInPage title={title}/>
                        <div className={styles.inside_market}>
                            <div className={styles.content}>
                                <div className={styles.select_categories}>
                                    <RadioGroup value={gender} onChange={setGender}
                                                classNames={{
                                                    label: styles.label_radio,
                                                    radioWrapper: styles.radio_wrapper,
                                                    radio: 'input_radio ',
                                                    icon: 'icon_radio',
                                                    root: styles.root_radio,
                                                    inner: styles.radio_inner
                                                }
                                                }>
                                        <Radio value="rate" label="محبوب ترین"/>
                                        <Radio value="low" label="ارزان ترین"/>
                                        <Radio value="gron" label="گرانترین"/>
                                        <Radio value="new" label="جدیدترین"/>
                                    </RadioGroup>
                                </div>
                                <div className={styles.container_products}>
                                    {/*{market.map((product, index) => (*/}
                                    {filterArray.map((product, index) => (
                                        <ProductCard key={index} product={product}/>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.container_btn_filter}>
                                <button className='btn btn-primary' onClick={() => setOpened(true)}>مشاهده فیلتر
                                </button>
                            </div>
                            <div className={styles.filtering}>
                                <div className={styles.container_btn_filter}>
                                    <button className='btn btn-primary' onClick={() => setOpened(true)}>مشاهده فیلتر
                                    </button>
                                </div>
                                {coffeeTypes.length > 0 ? <div className={styles.card_filter}>
                                    <p className={styles.title_card_filter}>انواع قهوه</p>
                                    <CheckboxGroup defaultValue={valuesCoffeeTypes}
                                                   onChange={setValuesCoffeeTypes}
                                                   classNames={classCheckBoxs}>
                                        {coffeeTypes.map(item => (
                                            <Checkbox key={item.id} value={item.title} label={item.title}/>
                                        ))}
                                    </CheckboxGroup>
                                </div> : null}
                                {growthParts.length > 0 ? <div className={styles.card_filter}>
                                    <p className={styles.title_card_filter}>منطقه کشت</p>
                                    <CheckboxGroup defaultValue={valuesGrowthParts} onChange={setValuesGrowthParts}
                                                   classNames={classCheckBoxs}>
                                        {growthParts.map(item => (
                                            <Checkbox key={item.id} value={item.title} label={item.title}/>
                                        ))}
                                    </CheckboxGroup>
                                </div> : null}
                                {beanTypes.length > 0 ? <div className={styles.card_filter}>
                                    <p className={styles.title_card_filter}>نوع دانه</p>
                                    <CheckboxGroup defaultValue={valuesBeanTypes} onChange={setValuesBeanTypes}
                                                   classNames={classCheckBoxs}>
                                        {beanTypes.map(item => (
                                            <Checkbox key={item.id} value={item.title} label={item.title}/>
                                        ))}
                                    </CheckboxGroup>
                                </div> : null}
                                {millTypes.length > 0 ? <div className={styles.card_filter}>
                                    <p className={styles.title_card_filter}>نوع آسیاب</p>
                                    <CheckboxGroup defaultValue={valuesMillTypes} onChange={setValuesMillTypes}
                                                   classNames={classCheckBoxs}>
                                        {millTypes.map(item => (
                                            <Checkbox key={item.id} value={item.title} label={item.title}/>
                                        ))}
                                    </CheckboxGroup>
                                </div> : null}
                            </div>
                        </div>
                    </div>

                }
            </div>
        </section>
    )
}
export default Market
