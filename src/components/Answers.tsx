import { Alert, Button, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/system/Box";
import React from "react";
import { FillinsAnswer, MultipleChoiceAnswer, NumberAnswer, TextAnswer } from "../classes/Answers";
import { useAppDispatch } from "../hooks/hooks";
import randomCorrectMessage from "../lists/correct";
import randomTryAgainMessage from "../lists/tryagain";
import { answerIsCorrect, nextProblem } from "../reducers/RepositoryReducer";
import Markdown, { MarkdownFillins } from "./Markdown";
import Grid from "@mui/material/Unstable_Grid2";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";

export interface AnswerKey {
    exerciseSpecId: string;
    exercise: string;
    stage: number;
    part: number;
}

export interface NumberAnswerComponentProps {
    answer: NumberAnswer;
    answerKey: AnswerKey;
}

export function NumberAnswerComponent({ answer, answerKey }: NumberAnswerComponentProps) {
    const numberAnswer = answer;
    const precision = numberAnswer.precision ? numberAnswer.precision : 0;
    const [enteredanswer, setEnteredAnswer] = React.useState('');
    const [opentryagain, setOpenTryAgain] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.SyntheticEvent, reason?: string) => {
        event.preventDefault();
        if (!enteredanswer) return;
        const variance = parseFloat(enteredanswer) - numberAnswer.value;

        if (variance <= precision && variance >= -1 * precision) {
            setIsCorrect(true);
            dispatch(answerIsCorrect(answerKey));
        } else {
            setOpenTryAgain(true);
        }
    };

    if (isCorrect) {
        return (
            <div>
                <Grid container>
                    <Grid xs="auto">
                        <Box padding={2}><Markdown>{answer.label ? answer.label : "Answer: "}</Markdown></Box>
                    </Grid>
                    <Grid xs>
                        <TextField
                            disabled
                            className="correct-answer"
                            value={enteredanswer}
                        />
                    <Alert onClose={() => {}}>{randomCorrectMessage()}</Alert>
                </Grid>
            </Grid>
            <Box paddingY={2}>{opentryagain ? <Alert onClose={() => {}} severity="error">{randomTryAgainMessage()}</Alert> : (null)}</Box>
                <Button onClick={() => dispatch(nextProblem(answerKey))} >Continue</Button>
        </div>
        );
    }
    return (
        <div>
            <Grid container>
                <Grid xs="auto">
                    <Box padding={2}><Markdown>{answer.label ? answer.label : "Answer: "}</Markdown></Box>
                </Grid>
                <Grid xs>
                    <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        className="answer"
                        value={enteredanswer}
                        onChange={e => {setEnteredAnswer(e.target.value); setOpenTryAgain(false)}}
                    />
                    <Button type="submit">Submit answer</Button>
                    </form>
                <Box paddingY={2}>{opentryagain ? <Alert onClose={() => {}} severity="error">{randomTryAgainMessage()}</Alert> : (null)}</Box>
                </Grid>
            </Grid>
            <Button onClick={() => dispatch(nextProblem(answerKey))} >Skip</Button>
        </div>
    );
}

export interface FillinsAnswerComponentProps {
    answer: FillinsAnswer;
    answerKey: AnswerKey;
}

export function FillinsAnswerComponent({ answer, answerKey }: FillinsAnswerComponentProps) {
    const fillinAnswer = answer;

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
        const fillin_id = parseInt(id.substring(7));
        const newenteredanswers = enteredanswer;
        newenteredanswers[fillin_id] = event.target.value;
        setEnteredAnswer(newenteredanswers);
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
        dispatch(answerIsCorrect(answerKey));
    };

    if (isCorrect) {
        return (
            <div>
                <div>
                    <Markdown>{fillinAnswer.label ? fillinAnswer.label : "Answer: "}</Markdown>
                    <Markdown>{fillinAnswer.answertext}</Markdown>
                    <Alert onClose={() => {}}>{randomCorrectMessage()}</Alert>
                </div>
                <Button onClick={() => dispatch(nextProblem(answerKey))} >Continue</Button>
            </div>
        );
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Markdown>{fillinAnswer.label ? fillinAnswer.label : "Answer: "}</Markdown>
                <MarkdownFillins autoFocus onFillinChange={onFillinChange}>{fillinAnswer.answerfillins}</MarkdownFillins>
                <Button type="submit">Submit answer</Button>
                <Box paddingY={2}>{opentryagain ? <Alert onClose={() => {}} severity="error">{randomTryAgainMessage()}</Alert> : (null)}</Box>
            </form>
            <Button onClick={() => dispatch(nextProblem(answerKey))} >Skip</Button>
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

export interface MultipleChoiceComponentProps {
    answer: MultipleChoiceAnswer;
    answerKey: AnswerKey;
}

export function MultipleChoiceAnswerComponent({ answer, answerKey }: MultipleChoiceComponentProps) {
    const [opentryagain, setOpenTryAgain] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClick = (index:number) => {
        if (index === answer.answer) {
            setIsCorrect(true);
            dispatch(answerIsCorrect(answerKey));
        } else {
            setOpenTryAgain(true);
        }
    };

    if (isCorrect) {
        return (
            <div>
            <Grid container>
            <Grid xs="auto">
                <Box paddingY={4}><Markdown>{answer.label ? answer.label : "Answer: "}</Markdown></Box>
            </Grid>
                <Grid xs>
                <List>
                    {answer.values.map((answerValue, index) => 
                        <ListItem key={index}>
                            <ListItemButton selected={answer.answer === index} >
                                <Markdown>{answerValue}</Markdown>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
                </Grid>
            </Grid>
                <Alert onClose={() => {}}>{randomCorrectMessage()}</Alert>
                <Button onClick={() => dispatch(nextProblem(answerKey))} >Continue</Button>
            </div>
        );
    }
    return (
        <div>
            <Grid container>
                <Grid xs="auto">
                    <Box padding={2}><Markdown>{answer.label ? answer.label : "Answer: "}</Markdown></Box>
                </Grid>
                <Grid xs>
                <List>
                    <Divider />
                    {answer.values.map((answerValue, index) => 
                        <Box>
                        <ListItem key={index}>
                            <ListItemButton onClick={() => handleClick(index)}>
                                <Markdown>{answerValue}</Markdown>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        </Box>
                    )}
                </List>
                </Grid>
            </Grid>
            <Box paddingY={2}>{opentryagain ? <Alert onClose={() => {}} severity="error">{randomTryAgainMessage()}</Alert> : (null)}</Box>
            <Button onClick={() => dispatch(nextProblem(answerKey))} >Skip</Button>
        </div>
    );
}