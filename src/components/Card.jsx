
import { useEffect, useState } from 'react'
import styles from '../styles/Card.module.css'

const Card = ({ cards, score, bestScore, setScore, setBestScore }) => {

    const [clickedCards, setClickedCards] = useState([])
    const [shuffledCards, setShuffledCards] = useState([])
    const [failed, setFailed] = useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5)
        setShuffledCards(shuffledCards)
    }

    useEffect(() => {
        shuffleCards()
    }, [cards])

    const handleCardClick = (card) => {
        if (clickedCards.includes(card.id)) {
            setFailed(true)
            setBestScore(score > bestScore ? score : bestScore)
            setScore(0)
            setClickedCards([])
            const key = setTimeout(() => {
                setFailed(false)
            }, 1000)
        } else {
            setClickedCards([...clickedCards, card.id])
            setScore(score + 1)
            shuffleCards()
        }
    }

    return (
        shuffledCards.map((card, index) => {

            let newUrl = card.url.replace(/\/\d+\/\d+$/, `/${100}/${100}`);

            return (
                <div className={styles.card} key={index} onClick={() => handleCardClick(card)}>
                    <img key={index} src={newUrl} alt={`image-${card.id} by ${card.author}`} className={`${failed ? styles.failed : ''} ${styles.img}`} />
                </div>
            )
        })
    )
}

export default Card