import {useQuery} from "@tanstack/react-query";
import {useBackButton, useMainButton} from "@tma.js/sdk-react";
import axios from "axios";
import React, {FC, useEffect, useState} from "react";

const URL = "http://127.0.0.1:8080/learning/web/"

export const LearnPage: FC = () => {
    const [cards, setCards] = useState<LearningCard[]>([])
    const mainButton = useMainButton();
    const backButton = useBackButton();

    useEffect(() => {
        mainButton.hide();
        backButton.show();
    }, []);

    const {isLoading, data, error} = useQuery<LearningCard[]>({
        queryKey: ['learningCards'],
        queryFn: () => axios.get(URL + 'learning/cards/en/for/ru')
            .then((response) => {
                console.log(`response: ${response}`)
                return response.data
            })
            .catch((e) => {
                console.log(e);
                return e;
            })
    });

    return (
        <>
            <div>Card to learn</div>
            <div>Data: {data?.toString()}</div>
            <div>Error: {error?.toString()}</div>
            <div>Cards: {cards.toString()}</div>
            <ul>
                {cards.map(card => <li key={card.id.toString()}>{card.sentence}</li>)}
            </ul>
        </>
    );
}

class LearningCard {
    constructor(
        public readonly id: Number,
        public readonly sentence: String,
        public readonly learningPhrase: String,
        public readonly learningPhraseTranslation: String,
        public readonly sentenceTranslation: String,
        public readonly sentenceWordsTranslation: String,
        public readonly tips: String[],
        public readonly possiblePhrases: String[]
    ) {
    }
}