import styles from './errorMessage.module.scss'

const ErrorMessageDate = ({error, marginTop, marginBottom, visible}) => {
    if (!error || !visible) return null
    return (
        <p className={styles.errorMessageDate} style={{marginTop, marginBottom}}>{error}</p>
    );
}
export default ErrorMessageDate