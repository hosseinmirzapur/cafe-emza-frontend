import {Fragment, useEffect} from 'react'
import EmzaCafe from "./EmzaCafe";
import {ToastContainer} from "react-toastify";
import {useLocation} from 'react-router-dom'
import {useWindowScroll} from "@mantine/hooks";

const App = () => {

    //variables
    const location = useLocation()
    const {pathname} = location
    const [scroll, scrollTo] = useWindowScroll();

    useEffect(() => {
        scrollTo({y: 0});
        window.scrollTo({
            top: 0
        })
    }, [location.pathname])

    return (
        <Fragment>
            <EmzaCafe/>
            <ToastContainer position='top-right' closeOnClick={true}/>
        </Fragment>
    )
}
export default App
