import user from './user.svg'
import history from './history.svg'
import rate from './rate.svg'
import location from './location.svg'
import notification from './notification.svg'

export const dataSidebar = [
    {id: 0, title: 'تاریخچه سفارشات', icon: history, path: '/dashboard/history'},
    {id: 1, title: 'حساب کاربری', icon: user, path: '/dashboard/profile'},
    {id: 2, title: 'اعلانات', icon: notification, path: '/dashboard/notification'},
    {id: 3, title: 'آدرس های من', icon: location, path: '/dashboard/address'},
    {id: 4, title: 'امتیازهای من', icon: rate, path: '/dashboard/rate'},
]