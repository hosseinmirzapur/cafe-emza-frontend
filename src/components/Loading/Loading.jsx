import React from 'react'
import './loading.scss'
import imgCafe from './emzaCafe.jpeg'
import {Default, Ring} from 'react-awesome-spinners'

const Loading = ({message = 'در حال بارگذاری اطلاعات ...', fullScrean = false, classs, height}) => {
    return (
        <div style={{height}} className={fullScrean ? 'containerLoading fullScrean' : `containerLoading ${classs}`}>
            {fullScrean ? <div className='container_image_loading'>
                <img src={imgCafe} alt=""/>
            </div> : <Default color='var(--coffeelight)'/>}
            {/*<Default />*/}
            <p>{message}</p>
        </div>
    )
}
export default Loading