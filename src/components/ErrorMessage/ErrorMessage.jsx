import styles from './errorMessage.module.scss'

const ErrorMessage = ({error, marginTop, marginBottom, visible}) => {
    if (!error || !visible) return null
    return (
        <p className={styles.errorMessage} style={{marginTop, marginBottom}}>{error}</p>
    );
}
export default ErrorMessage