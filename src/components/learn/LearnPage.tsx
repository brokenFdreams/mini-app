import {useBackButton, useMainButton} from "@tma.js/sdk-react";
import React, {FC, useEffect, useState} from "react";

export const LearnPage: FC = () => {
    useMainButton().hide();
    useBackButton().show();
    const [cards, setCards] = useState([])

    useEffect(() => {
        console.log('fetch cards');
        fetch('http://localhost:8080/learning/web/learning/cards/en/for/ru',
            {
                method: 'get',
                headers: new Headers({
                    'userId': 'userId',
                    'Content-Type': 'application/json',
                })
            }
        )
            .then(response => response.json())
            .then(json => {
                console.log(cards);
                setCards(json);
            });
    });
    return (
        <>
            <div>Card to learn</div>
            <div>Cards size: {cards.length}</div>
            <div>Cards: {cards}</div>
            <ul>
                {cards.map(card => <li>{card.sentence}</li>)}
            </ul>
        </>
    );
}

class LearningCard {
    constructor(
        id: Number,
        sentence: String,
        learningPhrase: String,
        learningPhraseTranslation: String,
        sentenceTranslation: String,
        sentenceWordsTranslation: String,
        tips: String[],
        possiblePhrases: String[]
    ) {
    }
}