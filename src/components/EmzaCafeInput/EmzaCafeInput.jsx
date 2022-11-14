import './emzaCafeInput.scss'
import {useState, useRef} from 'react'

const EmzaCafeInput = ({
                           type = 'text',
                           placeholder,
                           number, maxLength,
                           value,
                           handleChange,
                           handleBlur,
                           marginBottom,
                           marginTop,
                           classes, icon = false,
                           textAlignLeft
                       }) => {

    //variables
    const [val, setVal] = useState('')
    const refInput = useRef(null)

    //functions
    //check input just number
    const validate = (e) => {
        if (number) {
            let theEvent = e || window.event;
            let key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
            let regex = /[0-9]|\./;
            if (!regex.test(key)) {
                theEvent.returnValue = false;
                if (theEvent.preventDefault) theEvent.preventDefault();
            }
        }
    }

    return (
        <div className='container_input_cafe'>
            <input ref={refInput} type={type} maxLength={maxLength} id='input_salmode'
                   className={textAlignLeft && (value !== '') ? `textAlignLeft input_cafe ${classes}` : `input_cafe ${classes}`}
                   onKeyPress={(e) => validate(e)} placeholder=" "
                   value={value} pattern={number ? "[0-9]*" : null} onChange={(e) => {
                setVal(e.target.value)
                handleChange(e.target.value)
            }} onBlur={handleBlur}
                   style={{marginBottom, marginTop}}/>
            <label for='input_salmode' className='labelInput'>{placeholder}</label>
        </div>
    )
}
export default EmzaCafeInput