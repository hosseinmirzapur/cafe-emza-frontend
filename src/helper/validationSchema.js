import * as Yup from "yup";

export const validations = {
    phone_number: Yup.string().matches(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/, 'شماره موبایل معتبر نیست').required('این فیلد الزامی می باشد.').length(11, 'طول شماره تلفن باید 11 کاراکتر باشد.'),
    firstname: Yup.string().required('پر کردن این فیلد الزامیست.'),
    lastname: Yup.string().required('پر کردن این فیلد الزامیست.'),
    city: Yup.string().required('پر کردن این فیلد الزامیست.'),
    province: Yup.string().required('پر کردن این فیلد الزامیست.'),
    birthdate: Yup.string().required('پرکردن این فیلد الزامی است.'),
    email: Yup.string().email('ایمیل وارد شده معتبر نمی باشد.')
}
