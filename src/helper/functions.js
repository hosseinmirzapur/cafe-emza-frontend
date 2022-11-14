import {toast} from "react-toastify";

export function numberWithCommas(x) {
    if (x == null) {
        x = ''
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const copyTextToClipboard = (text, message) => {
    if ('clipboard' in navigator) {
        toast.success(message)
        return navigator.clipboard.writeText(text);
    } else {
        return document.execCommand('copy', true, text);
    }
}

export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}
export const findSize = (size) => {
    switch (size) {
        case "small":
            return "S"
        case "medium":
            return "M"
        case "s.p":
            return ""
        default:
            return "L"
    }
}
export const preventDragHandler = e => {
    e.preventDefault();
}
export const scrollToTopFunction = () => {
    console.log("run function")
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
export const goTopAbove = () => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })
    }, 500)
}