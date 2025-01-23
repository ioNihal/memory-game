
import { useEffect, useState } from 'react'
import styles from '../styles/Card.module.css'

const Card = ({ cards, score, bestScore, setScore, setBestScore }) => {

    const [clickedCards, setClickedCards] = useState([])
    const [shuffledCards, setShuffledCards] = useState([])

    const shuffleCards = () => {
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5)
        setShuffledCards(shuffledCards)
    }

    useEffect(() => {
        shuffleCards()
    }, [cards])

    const handleCardClick = (card) => {
        if (clickedCards.includes(card.id)) {
            setBestScore(score > bestScore ? score : bestScore)
            setScore(0)
            setClickedCards([])
        } else {
            setClickedCards([...clickedCards, card.id])
            setScore(score + 1)
            shuffleCards()
        }
    }

    return (
        shuffledCards.map((card, index) => (
            <div className={styles.card} key={index} onClick={() => handleCardClick(card)}>
                <img key={index} src={card.url} alt={`image-${card.id} by ${card.author}`} className={styles.img} />
            </div>
        ))
    )
}

export default Card