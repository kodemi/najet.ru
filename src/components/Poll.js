import React, { useState, useEffect } from 'react';
import Poll from 'react-polls';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import firebase from '../Firebase';
import { devices } from '../constants';

const Wrapper = styled.div`
    [class^='styles_votes'] {
        display: none;
    }

    [class^='styles_answers'] {
        flex-direction: row;
        flex-wrap: wrap;
        li {
            width: 48%;
            margin: 5px 1%;
        }
        @media ${devices.mobile} {
            flex-direction: column;
            li {
                width: 100%;
                margin: 5px 0;
            }
        }
    }
`;

const getLocaleAnswers = (answers, locale) =>
    answers.map((answer) => ({
        option: answer.option[locale],
        votes: answer.votes,
    }));

let db;

const useVotes = (id, locale) => {
    let [answers, setAnswers] = useState([]);
    let [question, setQuestion] = useState('');
    let [voted, setVoted] = useState(false);

    useEffect(() => {
        db = firebase.firestore();
        db.collection('polls')
            .doc(id)
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    return;
                }
                const { answers, question } = doc.data();
                setQuestion(question[locale]);
                setAnswers(answers);
            });
    }, []);
    const setVotes = (voteAnswer) => {
        const newAnswers = answers.map((answer) => {
            if (answer.option[locale] === voteAnswer) {
                answer.votes++;
            }
            return answer;
        });
        setAnswers(newAnswers);
        setVoted(true);
        db.collection('polls')
            .doc(id)
            .set(
                {
                    answers: newAnswers,
                },
                { merge: true }
            );
    };
    return { answers, setVotes, question, voted };
};

export default injectIntl(({ id, intl: { locale } }) => {
    const { question, answers, setVotes, voted } = useVotes(id, locale);
    let localeAnswers = getLocaleAnswers(answers, locale);

    return (
        <Wrapper>
            {!!db && !!question && !!localeAnswers.length && (
                <Poll
                    key={voted}
                    question={question}
                    answers={localeAnswers}
                    onVote={setVotes}
                />
            )}
        </Wrapper>
    );
});
