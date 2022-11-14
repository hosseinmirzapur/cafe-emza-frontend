import {toast} from "react-toastify";

export const showErrors = errors => {
    const arrErrors = Object.keys(errors)
    arrErrors.map(error => {
        toast.error(errors[error][0])
    })
}