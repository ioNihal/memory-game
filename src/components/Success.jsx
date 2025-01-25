import styles from '../styles/Success.module.css'

const Success = ({ page, setPage, setSuccess , setScore}) => {

    const handleNext = () => {
        setPage(page + 1)
        setScore(0)
        setSuccess(false)
    }

    return (
        <div className={styles.container}>
            <h3>You win!</h3>
            <button className={styles.button} onClick={handleNext}>RESTART or NEXT</button>
        </div>
    )
}

export default Success