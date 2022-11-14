import React from 'react'
import './ringLoading.scss'
import errorIcon from './ErrorIcon.svg'
import successIcon from './SuccessIcon.svg'
import {Ring} from 'react-awesome-spinners'

const RingLoading = ({message = 'در حال بررسی اطلاعات ...',  result = false, icon = true}) => {
    return (
        <div className=  'ringLoading'>
            {!result ? <Ring/> :
                <img src={icon ? successIcon : errorIcon} alt=""/>
            }
            <p>
                {!result ? message : (icon ? 'درخواست شما با موفقیت ثبت شد.' : 'درخواست شما ثبت نشد!')}
            </p>
        </div>
    )
}
export default RingLoading