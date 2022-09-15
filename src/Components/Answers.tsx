import { Alert, Button, Snackbar, TextField } from "@mui/material";
import React from "react";
import { FillinsAnswer, NumberAnswer, TextAnswer } from "../Classes/Answers";
import { useAppDispatch } from "../Hooks/hooks";
import { answerIsCorrect, nextProblem } from "../Reducers/RepositoryReducer";
import Markdown, { MarkdownFillins } from "./Markdown";

export interface AnswerKey {
    exerciseSpecId?: string;
    exercise?: string;
    stage?: number;
}

export interface AnswerKeyFull {
    exerciseSpecId: string;
    exercise: string;
    stage: number;
}

export interface NumberAnswerComponentProps {
    answer: NumberAnswer;
    answerKey: AnswerKey;
}

export function NumberAnswerComponent({ answer, answerKey }: NumberAnswerComponentProps) {
    const numberAnswer = answer;
    const precision = numberAnswer.precision ? numberAnswer.precision : 0;
    const answerKeyFull = answerKey as AnswerKeyFull;
    const [enteredanswer, setEnteredAnswer] = React.useState('');
    const [opentryagain, setOpenTryAgain] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleCloseTryAgain = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenTryAgain(false);
    };

    const handleSubmit = (event: React.SyntheticEvent, reason?: string) => {
        event.preventDefault();
        if (!enteredanswer) return;
        const variance = parseFloat(enteredanswer) - numberAnswer.value;

        if (variance <= precision && variance >= -1 * precision) {
            setIsCorrect(true);
            dispatch(answerIsCorrect(answerKeyFull));
        } else {
            setOpenTryAgain(true);
        }
    };

    if (isCorrect) {
        return (
            <div>
                <div>
                    {numberAnswer.label ? numberAnswer.label : "Answer: "}
                    {numberAnswer.value}
                </div>
                <Button onClick={() => dispatch(nextProblem(answerKeyFull))} >Continue</Button>
            </div>
        );
    }
    return (
        <div>
            <Snackbar
                open={opentryagain}
                autoHideDuration={4000}
                onClose={handleCloseTryAgain}
            >
                <Alert onClose={handleCloseTryAgain} severity="error">
                    Try again!
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit}>
                {numberAnswer.label ? numberAnswer.label : "Answer: "}
                <TextField
                    autoFocus
                    className="answer"
                    value={enteredanswer}
                    onChange={e => setEnteredAnswer(e.target.value)}
                />
                <Button type="submit">Submit answer</Button>
            </form>
            <Button onClick={() => dispatch(nextProblem(answerKeyFull))} >Skip</Button>
        </div>
    );
}

export interface FillinsAnswerComponentProps {
    answer: FillinsAnswer;
    answerKey: AnswerKey;
}

export function FillinsAnswerComponent({ answer, answerKey }: FillinsAnswerComponentProps) {
    const fillinAnswer = answer;
    const answerKeyFull = answerKey as AnswerKeyFull;

    // This is used to hold the initial answers for each fillin - a whole bunch of blanks
    const initea: string[] = Array(fillinAnswer.fillins.length).fill('');
    console.log("Fillins: " + JSON.stringify(fillinAnswer.fillins))

    // A hook for the values of entered fillins
    const [enteredanswer, setEnteredAnswer] = React.useState(initea);
    const [opentryagain, setOpenTryAgain] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const dispatch = useAppDispatch();

    // This is fed into onChange for each input.
    const onFillinChange = (id: string, event: { target: HTMLInputElement; }, reason?: string) => {
        console.log(`current entered answer: ${enteredanswer}`);
        const fillin_id = parseInt(id.substring(7));
        const newenteredanswers = enteredanswer;
        newenteredanswers[fillin_id] = event.target.value;
        setEnteredAnswer(newenteredanswers);
        console.log(enteredanswer);
        console.log(`${id} with value ${event.target.value}`);
    };


    const handleCloseTryAgain = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenTryAgain(false);
    };

    const handleSubmit = (event: React.SyntheticEvent, reason?: string) => {
        event.preventDefault();
        for (let i = 0; i < enteredanswer.length; i += 1) {
            if (!enteredanswer[i]) return;
            const variance =
                parseFloat(enteredanswer[i]) - fillinAnswer.fillins[i].value;

            console.log(
                `Variance: ${variance}, precision: ${fillinAnswer.fillins[i].precision}`
            );
            if (
                variance > fillinAnswer.fillins[i].precision ||
                variance < -1 * fillinAnswer.fillins[i].precision
            ) {
                setOpenTryAgain(true);
                return;
            }
        }
        setIsCorrect(true);
        dispatch(answerIsCorrect(answerKeyFull));
    };

    if (isCorrect) {
        return (
            <div>
                <div>
                    <Markdown>{fillinAnswer.label ? fillinAnswer.label : "Answer: "}</Markdown>
                    <Markdown>{fillinAnswer.answertext}</Markdown>
                </div>
                <Button onClick={() => dispatch(nextProblem(answerKeyFull))} >Continue</Button>
            </div>
        );
    }
    return (
        <div>
            <Snackbar
                open={opentryagain}
                autoHideDuration={4000}
                onClose={handleCloseTryAgain}
            >
                <Alert onClose={handleCloseTryAgain} severity="error">
                    Try again!
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit}>
                <Markdown>{fillinAnswer.label ? fillinAnswer.label : "Answer: "}</Markdown>
                <MarkdownFillins onFillinChange={onFillinChange}>{fillinAnswer.answerfillins}</MarkdownFillins>
                <Button type="submit">Submit answer</Button>
            </form>
            <Button onClick={() => dispatch(nextProblem(answerKeyFull))} >Skip</Button>
        </div>
    );
}

export interface TextAnswerComponentProps {
    answer: TextAnswer;
    answerKey: AnswerKey;
}

export function TextAnswerComponent({ answer, answerKey }: TextAnswerComponentProps) {
    const textAnswer = answer as TextAnswer;
    return (<p>{textAnswer.text}</p>);
}