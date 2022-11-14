import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as HiIcons from "react-icons/hi";

export const dataMobileMenu = [

    {id: 2, title: 'باشگاه', path: '/club', icon: < GiIcons.GiBlackFlag className="iconSi"/>},
    {id: 3, title: 'ارتباط با ما ', path: '/contact_us', icon: < BsIcons.BsChatQuoteFill className="iconSi"/>},
    {id: 4, title: 'درباره ما', path: '/about_us', icon: < FaIcons.FaBookReader className="iconSi"/>},
    {id: 7, title: 'قوانین و مقررات', path: '/rules', icon: < MdIcons.MdOutlineSecurity className="iconSi"/>},
    {id: 8, title: 'استخدام', path: '/recruitment', icon: < HiIcons.HiDocumentSearch className="iconSi"/>},
    // {id: 8, title: 'بلاگ', path: '/recruitment', icon: < FaIcons.FaBloggerB className="iconSi"/>},
    {id: 98, title: 'مشارکت', path: '/participation', icon: < FaIcons.FaHandshake className="iconSi"/>},
    {
        id: 10,
        title: 'سوالات متداول',
        path: '/faq',
        icon: < AiIcons.AiFillQuestionCircle className="iconSi"/>
    },
]