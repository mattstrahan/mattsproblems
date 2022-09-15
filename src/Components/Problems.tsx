import ReactMarkdown from "react-markdown";
import { FillinsAnswer, NumberAnswer, TextAnswer } from "../Classes/Answers";
import { Problem } from "../Classes/Problem";
import { AnswerKey, FillinsAnswerComponent, NumberAnswerComponent, TextAnswerComponent } from "./Answers";

export interface ProblemComponentProps {
    number?: number;
    problem: Problem;
    answerKey: AnswerKey;
}

export function ProblemComponent ({number, problem, answerKey} : ProblemComponentProps) {
    let answer;
    let isDone = false;
    let ret = [];
    let partnumber = 1;
    for(let part of problem.parts) {
        let partanswer;
        if (!part.question)
            part.question = "";
        if (part.answer.type === 'text') {
            partanswer = <TextAnswerComponent answer={part.answer as TextAnswer} answerKey={answerKey} />;
        } else if (part.answer.type === 'number') {
            partanswer = <NumberAnswerComponent answer={part.answer as NumberAnswer} answerKey={answerKey} />;
        } else if (part.answer.type === 'fillins') {
            partanswer = <FillinsAnswerComponent answer={part.answer as FillinsAnswer} answerKey={answerKey} />;
        }
        ret.push( (
            <div key={partnumber}>
                <h3>Question {number && <span>number</span>}</h3>
                <ReactMarkdown>{part.question}</ReactMarkdown>
                { partanswer }
            </div>
            ) );
        if (!part.answer.isCorrect) {
            isDone = true;
            break;
        }
        partnumber += 1;
    }
    if (!isDone) {
        if (problem.answer.type === 'text'){
            answer = <TextAnswerComponent answer={problem.answer as TextAnswer} answerKey={answerKey} />;
        } else if (problem.answer.type === 'number') {
            answer = <NumberAnswerComponent answer={problem.answer as NumberAnswer} answerKey={answerKey} />;
        } else if (problem.answer.type === 'fillins') {
            answer = <FillinsAnswerComponent answer={problem.answer as FillinsAnswer} answerKey={answerKey} />;
        }
        ret.push((
            <div key={partnumber}>
                <h3>Question {number && <span>number</span>}</h3>
                <ReactMarkdown>{problem.question}</ReactMarkdown>
                {answer}
            </div>
        ));
    }
    return (<div>
            {ret}
            </div>);
    
}

