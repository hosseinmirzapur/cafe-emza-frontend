import React, {useEffect} from 'react';

const ChangeTitlePage = ({title = ''}) => {
    useEffect(() => {
        document.title = `امضا کافه | ${title}`
    }, [])
    return null;
}

export default ChangeTitlePage;