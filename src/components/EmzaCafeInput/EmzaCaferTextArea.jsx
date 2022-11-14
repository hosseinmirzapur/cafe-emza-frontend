import './emzaCafeInput.scss'
import {useState, useRef} from 'react'

const EmzaCafeTextArea = ({
                              placeholder,
                              value,
                              handleChange,
                              handleBlur,
                              marginBottom,
                              marginTop,row=5,
                              classes, icon = false,
                          }) => {

    //variables
    const [val, setVal] = useState('')
    const refInput = useRef(null)

    //functions

    return (
        <div className='container_input_cafe'>
            <textarea  rows={row} id='textarea_salmode' placeholder=" "
                      className={ `textarea_cafe ${classes}`}
                      value={value} onChange={(e) => {
                setVal(e.target.value)
                handleChange(e.target.value)
            }} onBlur={handleBlur}
                      style={{marginBottom, marginTop}}/>
            {/*<label onClick={() => refInput.current.focus()}*/}
            {/*       className={val.length > 0 ? 'labelInput filled' : 'labelInput'}*/}
            {/*>{placeholder}</label>*/}
            <label for='textarea_salmode' className='labelTextArea'>{placeholder}</label>
        </div>
    )
}
export default EmzaCafeTextArea