import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { AnswerSpec, buildFillinsAnswer, buildNumberAnswer, buildTextAnswer, combinePartialAnswerValues, FillinsAnswerSpec, NumberAnswerSpec, TextAnswerSpec } from "../../classes/Answers";
import { envtype, getStrValue } from "../../helpers/env";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setAnswer } from "../../reducers/CreateReducer";
import Markdown from "../Markdown";
import { CreateTextField } from "./CreateTextField";
import Grid from "@mui/material/Unstable_Grid2";
import { checkNumber } from "./CreateVariable";

interface CreateTextAnswerProps {
    answer: Partial<TextAnswerSpec>;
    onChange: Function;
    env: envtype;
}

function CreateTextAnswerComponent({ answer, onChange, env }: CreateTextAnswerProps) {


    return (
        <div>
        <Grid container spacing={2}>
        <Grid xs={12}>
            <CreateTextField nunjucks label="Label" initial={answer.label ? answer.label : ""} handleChange={(e:string) => onChange({type:"text", label:e})} env={env} />
        </Grid><Grid xs={12}>
            <CreateTextField nunjucks label="Answer" initial={answer.text ? answer.text : ""} handleChange={(e:string) => onChange({type:"text", text:e})} env={env} />
        </Grid></Grid>
        </div>
    )
}


interface CreateNumberAnswerProps {
    answer: Partial<NumberAnswerSpec>;
    onChange: Function;
    env: envtype;
}

function CreateNumberAnswerComponent({ answer, onChange, env }: CreateNumberAnswerProps) {


    return (
        <div>
            <Grid container spacing={2}>
            <Grid xs={12}>
            <CreateTextField nunjucks label="Label" initial={answer.label ? answer.label : ""} handleChange={(e:string) => onChange({type:"number", label:e})} env={env} />
            </Grid>
                <Grid xs={4}>
            <CreateTextField nunjucks label="Answer" errorcheck={checkNumber} initial={answer.value ? answer.value.toString() : ""} handleChange={(e:string) => onChange({type:"number", value:e})} env={env} />
            </Grid>
                <Grid xs={4}>
            
            <CreateTextField nunjucks label="Precision" errorcheck={checkNumber} initial={answer.precision ? answer.precision.toString() : ""} handleChange={(e:string) => onChange({type:"number", precision:e})} env={env} />
            </Grid>
                <Grid xs={4}>
            <CreateTextField nunjucks label="Decimal places" errorcheck={checkNumber} initial={answer.decimals ? answer.decimals.toString() : ""} handleChange={(e:string) => onChange({type:"number", decimals:e})} env={env} />
            </Grid>
            </Grid>
        </div>
    )
}


interface CreateFillinsAnswerProps {
    answer: Partial<FillinsAnswerSpec>;
    onChange: Function;
    env?: envtype;
}

function CreateFillinsAnswerComponent({ answer, onChange, env }: CreateFillinsAnswerProps) {


    return (
        <div>
            <Box padding={2}>
        <CreateTextField nunjucks label="Label" initial={answer.label ? answer.label : ""} handleChange={(e:string) => onChange({type:"fillins", label:e})} env={env} />
        <CreateTextField
                nunjucks
                label="Answer"
                initial={answer.value ? answer.value : ""}
                handleChange={(e:string) => onChange({type:"fillins", value:e})}
                env={{...env, fillin: (value: number, precision?: number) => { }}} />
                </Box>
        </div>
    )
}


interface CreateAnswerProps {
    probid: string;
    partindex?: number;
    env: envtype;
}

export function CreateAnswerComponent({ probid, partindex, env }: CreateAnswerProps) {

    const mainanswer = useAppSelector(state => state.create.problems[probid].answer);
    const additionalparts = useAppSelector(state => state.create.problems[probid].additionalparts);
    const dispatch = useAppDispatch();

    const answer = partindex === undefined ? mainanswer : additionalparts?.[partindex]?.answer;

    const [answertype, setAnswerType] = React.useState(0);
    const [numberanswer, setNumberAnswer] = React.useState<Partial<NumberAnswerSpec>>(
        answer !== undefined && answer.type === "number" ? answer : 
            {type: "number",
            label: "Answer:",
            value: "",
            precision: "",
            decimals: ""
        });
    const [textanswer, setTextAnswer] = React.useState<Partial<TextAnswerSpec>>(
        answer !== undefined && answer.type === "text" ? answer : 
            {type: "text",
            label: "Answer:",
            text: ""
        });
    const [fillinsanswer, setFillinsAnswer] = React.useState<Partial<FillinsAnswerSpec>>(
        answer !== undefined && answer.type === "fillins" ? answer : 
            {type: "fillins",
            label: "Answer:",
            value: ""
        });

    if(answer === undefined)
    return <div>Part not found</div>;

    const changeAnswer = (oldanswer:Partial<AnswerSpec>, newanswer:Partial<AnswerSpec>, setFunction:Function) => {
        const subanswer = combinePartialAnswerValues(oldanswer, newanswer);
        dispatch(setAnswer({probid:probid, answer:subanswer}));
        setFunction(subanswer);
    }

    if(!answer)
        return <div>Problem not found</div>;

    const onChangeTab = (event: React.SyntheticEvent, newtype: number) => {
        setAnswerType(newtype);
        console.log(`new tab ${newtype}`)
        if(newtype === 0)
            dispatch(setAnswer({probid:probid, answer:numberanswer}));
        else if(newtype === 1)
            dispatch(setAnswer({probid:probid, answer:textanswer}));
        else if(newtype === 2)
            dispatch(setAnswer({probid:probid, answer:fillinsanswer}));
    };

    return (
        <Box paddingY={2}><Typography paragraph variant="h6">Answer</Typography>
        <Tabs value={answertype} onChange={onChangeTab} >
          <Tab label="Number" />
          <Tab label="Text" />
          <Tab label="Fillins" />
        </Tabs>
        <div hidden={answertype !== 0}>
            <CreateNumberAnswerComponent
                answer={numberanswer}
                env={env}
                onChange={(newanswer:Partial<NumberAnswerSpec>) => {changeAnswer(numberanswer, newanswer, setNumberAnswer)}} />
        </div>
        <div hidden={answertype !== 1}>
            <CreateTextAnswerComponent answer={textanswer}
                env={env}
                onChange={(newanswer:Partial<TextAnswerSpec>) => {changeAnswer(textanswer, newanswer, setTextAnswer)}} />
        </div>
        <div hidden={answertype !== 2}>
            <CreateFillinsAnswerComponent
                answer={fillinsanswer}
                env={env}
                onChange={(newanswer:Partial<FillinsAnswerSpec>) => {changeAnswer(fillinsanswer, newanswer, setFillinsAnswer)}} />
        </div>
        </Box>
    )
}


interface CreateShowAnswerProps {
    answer?: Partial<AnswerSpec>;
    env: envtype;
}

export function CreateShowAnswerComponent({ answer, env }: CreateShowAnswerProps) {
    if(answer === undefined)
        return <div>Answer not found</div>
    
    if(answer.type === "text"){
        var textanswer = buildTextAnswer(answer as TextAnswerSpec, env);
        return (
            <div>
            <Grid container spacing={2}>
            <Grid xs="auto">
            <Markdown>{textanswer.label ? getStrValue(textanswer.label, env) : ""}</Markdown>
            </Grid><Grid xs>
                <TextField disabled value={textanswer.text} />
            </Grid></Grid>
            </div>
        )
    }
    
    if(answer.type === "number"){
        var numberanswer = buildNumberAnswer(answer as NumberAnswerSpec, env);
        return (
            <div>
            <Grid container spacing={2}>
            <Grid xs="auto">
            <Markdown>{numberanswer.label ? getStrValue(numberanswer.label, env) : ""}</Markdown>
            </Grid><Grid xs>
            <TextField disabled value={numberanswer.value} />
            </Grid></Grid>
            </div>
        )
    }
    
    if(answer.type === "fillins"){
        var fillinsanswer = buildFillinsAnswer(answer as FillinsAnswerSpec, env);
        return (
            <div>
            <Grid container spacing={2}>
            <Grid xs="auto">
            <Markdown>{fillinsanswer.label ? getStrValue(fillinsanswer.label, env) : ""}</Markdown>
            </Grid><Grid xs>
            <Markdown >{fillinsanswer.answertext}</Markdown>
            </Grid></Grid>
            </div>
        )
    }

    return (
        <div>Answer not supported. {JSON.stringify(answer)}
        </div>
    )
}