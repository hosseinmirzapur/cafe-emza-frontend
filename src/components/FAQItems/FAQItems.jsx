import {Collapse} from '@mantine/core';
import {useState} from 'react'
import styles from './faqItems.module.scss'
import arrowImage from './arrow.svg'

const FAQItems = ({faq, index}) => {
    const [opened, setOpen] = useState(false);
    return (
        <div className={styles.container_faq}>
            <div className={styles.section_question} onClick={() => setOpen((o) => !o)}>
                <img src={arrowImage}
                     className={opened ? `${styles.rotate_arrow} ${styles.arrow_image}` : styles.arrow_image} alt=""/>
                <p className={styles.text_question}>{faq ? `${index + 1} - ${faq.question}` : 'نحوه ثبت نام چگونه است؟'}</p>
            </div>
            <Collapse className='w-100' in={opened}>
                <p className={styles.text_answer}>{faq ? faq.answer : 'sfasfadf af adf adsf asdf asdf sadf sdf sdf df f sdf dfqwere wer qwsfasfadf af adf adsf asdf asdf sadf sdf sdf df f sdf dfqwere wer qwsfasfadf af adf adsf asdf asdf sadf sdf sdf df f sdf dfqwere wer qwsfasfadf af adf adsf asdf asdf sadf sdf sdf df f sdf dfqwere wer qwsfasfadf af adf adsf asdf asdf sadf sdf sdf df f sdf dfqwere wer qw'}</p>
            </Collapse>
        </div>
    )
}
export default FAQItems