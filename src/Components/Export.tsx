import { useAppSelector } from "../hooks/hooks";
import * as nunjucks from 'nunjucks';
import { useParams } from "react-router-dom";
import { unified } from "unified";
import markdown from "remark-parse";
import docx from "remark-docx";
import { saveAs } from "file-saver";
import { Exercise } from "../classes/Exercise";
import Markdown from "./Markdown";

const worksheetTemplate = `
{%if exercise.title %}# {{exercise.title}} {% else %}# Worksheet {% endif %}

{% for stage in exercise.stages %}
{% if stage.type == "text" or stage.type == "finish" %}
{{stage.text}}
{% elif stage.type == "problem" %}
## Question {{stage.questionnumber}}

{{stage.question}}
{% if stage.answer.type == "text" %}
{{stage.answer.label}} __________
{% elif stage.answer.type == "fillins" %}
{{stage.answer.label}} {{stage.answer.answerworksheet | safe}}
{% elif stage.answer.type == "number" %}
{{stage.answer.label}} __________
{%- endif %}
{%- endif %}
{%- endfor %}

# Answers

{% for stage in exercise.stages %}
{%- if stage.type == "problem" %}
{% if stage.answer.type == "text" %}
{{stage.answer.label}} {{stage.answer.text}}
{% elif stage.answer.type == "fillins" %}
{{stage.answer.label}} {{stage.answer.answertext | safe}}
{% elif stage.answer.type == "number" %}
{{stage.answer.label}} {{stage.answer.value}}
{%- endif %}
{%- endif %}
{%- endfor %}
`;

interface WorksheetComponentProps {
    exerciseId?: string;
}

export function WorksheetComponent({ exerciseId }: WorksheetComponentProps) {
    const currentExercise = useAppSelector(state => state.repository.currentExercise); // The current list of exercises
    const exercises = useAppSelector(state => state.repository.exercises); // The current list of exercises

    let params = useParams();

    if (!exerciseId) //It's not in props
        exerciseId = params.exerciseId;

    if (!exerciseId) //It's not in params, so let's use the outlet
        exerciseId = currentExercise;

    if (!(exercises && exercises[exerciseId])) {
        return (<div>Exercise not found</div>);
    }

    const worksheet = nunjucks.renderString(worksheetTemplate, { exercise: exercises[exerciseId] });
    return(<Markdown>{worksheet}</Markdown>);
}

interface exportDOCXProps {
    exercise: Exercise;
}

export function exportDOCX({ exercise }: exportDOCXProps) {
    const processor = unified().use(markdown).use(docx, { output: "blob" });

    const text = nunjucks.renderString(worksheetTemplate, { exercise: exercise });;

    (async () => {
        const doc = await processor.process(text);
        const blob = await doc.result as Blob;
        saveAs(blob, "worksheet.docx");
    })();
}