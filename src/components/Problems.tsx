import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import React from "react";
import { Problem } from "../classes/Problem";
import { useAppDispatch } from "../hooks/hooks";
import randomCorrectMessage from "../lists/correct";
import { nextProblem } from "../reducers/RepositoryReducer";
import { AnswerComponent, AnswerKey } from "./Answers";
import Markdown from "./Markdown";

export interface ProblemComponentProps {
    number?: number;
    problem: Problem;
    answerKey: Partial<AnswerKey>;
    hidden?: boolean;
}

export function ProblemComponent ({number, problem, answerKey, hidden} : ProblemComponentProps) {
    let isDone = false;
    let ret:JSX.Element[] = [];
    let partnumber = 1;
    const nparts = problem.parts.length;
    const dispatch = useAppDispatch();

    if(hidden)
        return (null);
    
    problem.parts.forEach((part, partindex) => {
        if(answerKey.exercise === undefined || answerKey.exerciseSpecId === undefined || answerKey.stage === undefined)
            return
        const newAnswerKey:AnswerKey = {exercise: answerKey.exercise, exerciseSpecId: answerKey.exerciseSpecId, stage: answerKey.stage, part:partindex};

        ret.push( (
            <div key={partnumber}>
                <h3>Question {number && <span>number</span>}</h3>
                <Markdown jsgFigureStore={part.jsgFigureStore}>{part.question}</Markdown>
                <AnswerComponent hidden={isDone} answer={part.answer} answerKey={newAnswerKey} />
                {!part.answer.isCorrect ? 
            <Button onClick={() => dispatch(nextProblem(newAnswerKey))} >Skip</Button>
            : partindex + 1 === nparts
            ? <div><Alert>{randomCorrectMessage()}</Alert>
              <Button onClick={() => dispatch(nextProblem(newAnswerKey))} >Continue</Button></div>
            : (null)}
            </div>
            ) );
        if (!part.answer.isCorrect) {
            isDone = true;
        }
        partnumber += 1;
    });
    return (<div>
            {ret}
            </div>);
    
}

