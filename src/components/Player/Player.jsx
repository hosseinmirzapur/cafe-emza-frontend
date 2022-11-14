import styles from './player.module.scss'
import back from './back.svg'
import {useEffect, useState} from 'react'
import handleErrors from "../../helper/handleErrors";
import {getVideo} from "../../services/pagesServeice";
import Loading from "../Loading/Loading";

const Player = () => {

    //variables
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')

    //functions
    const handleVideo = async () => {
        setLoading(true)
        try {
            const {data} = await getVideo()
            await setUrl(data?.video?.url)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            handleErrors(err)
        }
    }

    useEffect(() => {
        handleVideo()
    }, [])
    return (
        <section className={styles.player_section}>
            <img src={back} className={styles.wave_pic} alt=""/>
            <div className={styles.container_video}>
                {loading ? <Loading/> :
                    <video
                        // poster={poster}
                        // src='https://emza-group.ir/video/cafe-emza-video.mp4' controls className={styles.player}>
                        src={url} controls className={styles.player}>
                        {/*<source src="./UseRef.mp4" type="video/mp4"/>*/}
                    </video>
                }
            </div>
        </section>
    )
}
export default Player