import styles from "./productDetails.module.scss";

import {Radio} from "@mantine/core";

const SizeRadio = ({value, label, icon}) => {
    console.log({
        value, label, icon
    })

    return (
        <Radio
            value={value}
            name='size'
            label={
                <div className={styles.item_size}
                >
                    <p>{label}</p>
                    <img
                        alt=''
                        className={styles.icons}
                        src={icon}
                    />
                </div>
            }
        />
    );
};

export default SizeRadio;
