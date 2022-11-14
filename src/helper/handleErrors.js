import {toast} from "react-toastify";
import {showErrors} from "./showErrors";

const handleErrors = objError => {
    if (objError.status) {
        switch (objError.status) {
            case 408:
                return toast.error('زمان اجرا دستور به اتمام رسیده.')
            case 400:
                return toast.error(objError.data.message)
            case 405:
                return toast.error('متد استفاده شده اشتباه هستش')
            case 404:
                toast.error('صفحه مورد نظر یافت نشد!')
                return
            case 422:
                showErrors(objError.data.errors)
                return
            case 500:
                return toast.error('خطایی در سرور پیش امده است.')
            case 401:
                localStorage.removeItem('token')
                return toast.error('لطفا ابتدا وارد سایت شوید.')
            case 403:
                return toast.error('شما به این صفحه دسترسی ندارید.')
            case 429:
                return toast.error('تعداد درخواست ها از حد مجاز بیشتر است!')
            case 200:
                return toast.error(objError.data.message)
            default:
                return toast.error(objError.data.message)
        }
    } else {
        // toast.error('عدم دسترسی به اینترنت')
    }
}


export default handleErrors
