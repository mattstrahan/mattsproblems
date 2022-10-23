import { FillinsAnswer, MultipleChoiceAnswer, NumberAnswer, TextAnswer } from "../classes/Answers";
import { Problem } from "../classes/Problem";
import { AnswerKey, FillinsAnswerComponent, MultipleChoiceAnswerComponent, NumberAnswerComponent, TextAnswerComponent } from "./Answers";
import Markdown from "./Markdown";

export interface ProblemComponentProps {
    number?: number;
    problem: Problem;
    answerKey: Partial<AnswerKey>;
}

export function ProblemComponent ({number, problem, answerKey} : ProblemComponentProps) {
    let isDone = false;
    let ret:JSX.Element[] = [];
    let partnumber = 1;
    
    problem.parts.forEach((part, partindex) => {
        if(isDone)
            return;
        let partanswer;
        if(answerKey.exercise === undefined || answerKey.exerciseSpecId === undefined || answerKey.stage === undefined)
            return
        const newAnswerKey:AnswerKey = {exercise: answerKey.exercise, exerciseSpecId: answerKey.exerciseSpecId, stage: answerKey.stage, part:0};
        if (part.answer.type === 'text') {
            partanswer = <TextAnswerComponent answer={part.answer as TextAnswer} answerKey={{...newAnswerKey, part: partindex}} />;
        } else if (part.answer.type === 'number') {
            partanswer = <NumberAnswerComponent answer={part.answer as NumberAnswer} answerKey={{...newAnswerKey, part: partindex}} />;
        } else if (part.answer.type === 'fillins') {
            partanswer = <FillinsAnswerComponent answer={part.answer as FillinsAnswer} answerKey={{...newAnswerKey, part: partindex}} />;
        } else if (part.answer.type === 'multiplechoice') {
            partanswer = <MultipleChoiceAnswerComponent answer={part.answer as MultipleChoiceAnswer} answerKey={{...newAnswerKey, part: partindex}} />;
        }
        ret.push( (
            <div key={partnumber}>
                <h3>Question {number && <span>number</span>}</h3>
                <Markdown>{part.question}</Markdown>
                { partanswer }
            </div>
            ) );
        if (!part.answer.isCorrect) {
            isDone = true;
            return;
        }
        partnumber += 1;
    });
    return (<div>
            {ret}
            </div>);
    
}

