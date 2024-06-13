import {useQuery} from "@tanstack/react-query";
import {useBackButton, useMainButton} from "@tma.js/sdk-react";
import axios from "axios";
import React, {FC, useEffect, useState} from "react";

const URL = 'http://10.164.16.83:8080/';

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
        queryFn: () => axios.get(URL + 'learning/web/cards/error', {
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            }
        })
            .then((response) => {
                console.log(`response: ${response.data}`)
                return response.data
            })
    });

    return (
        <>
            <div>Card to learn</div>
            <div>Data: {data?.toString()}</div>
            <div>Error: {error?.toString()}</div>
            <div>Cards:</div>
            <ul>
                {data?.map(card => <li key={card.id.toString()}>{card.sentence}</li>)}
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
        public readonly nativeSentenceTranslation: String,
        public readonly literalSentenceTranslation: String,
        public readonly tips: String[],
        public readonly possiblePhrases: String[]
    ) {
    }
}