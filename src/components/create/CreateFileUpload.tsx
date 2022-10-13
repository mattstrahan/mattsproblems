import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAppDispatch } from "../../hooks/hooks";
import yaml from 'js-yaml';
import { RepositorySpec } from "../../classes/Repository";
import { ProblemSpec } from "../../classes/Problem";
import { assert, object, number, string, array } from 'superstruct'
import { ExerciseSpec } from "../../classes/Exercise";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { createNewExerciseFromExisting } from "../../reducers/CreateReducer";

const BaseSpec = object({
    problems: object(),
    exercises: object()
});

function validateUpload( spec:unknown ) {
    let errors:string[] = [];

    if(typeof spec !== "object") {
        throw Error("The file failed to load. We couldn't find any object in the file.");
    }
    if(spec === null) {
        throw Error("Specification returned null. I don't quite know how. Sorry, but Typescript is complaining.")
    }
    assert(spec, BaseSpec);
    let problems:{[key:string]: Partial<ProblemSpec>} = {}
    if("problems" in spec) {
        for(let newproblem in spec.problems) {
            try {
                let newProblemObject = spec.problems[newproblem] as Partial<ProblemSpec>;
                problems[newproblem] = newProblemObject;
            }
            catch(error) {
                console.log(error);
                if(typeof error === "string"){
                    errors.push(error);
                }
                if (error instanceof Error) {
                    errors.push(error.message);
                }
            }
        }

        // Let's make sure we still have a problem
        if(problems.length === 0)
            throw Error("No valid problems found in the uploaded specification.")
    }
    let exercises:{[key:string]: Partial<ExerciseSpec>} = {}
    if(spec.exercises !== undefined) {
        for(let newexercise in spec.exercises) {
            try {
                let newExerciseObject = spec.exercises[newexercise] as Partial<ExerciseSpec>;

                if(newExerciseObject.stages === undefined)
                    throw Error(`Exercise ${newexercise} does not have any stages`);
                
                // We now need to check to make sure the problems are actually inside the exercise
                for(let stage of newExerciseObject.stages) {
                    if(stage.type === "problem") {
                        if(!Object.keys(problems).includes(stage.probid))
                            throw Error(`Problem ${stage.probid} not found in supplied problems, but it's required for exercise ${newexercise}.`);
                    }
                }
                exercises[newexercise] = newExerciseObject;

            }
            catch(error) {
                console.log(error);
                if(typeof error === "string"){
                    errors.push(error);
                }
                if (error instanceof Error) {
                    errors.push(error.message);
                }
            }
        }

        // Let's make sure we still have an exercise
        if(exercises.length === 0)
            throw Error("No valid exercises found in the uploaded specification.")
    }

    return {problems: problems, exercises: exercises, errors: errors};
}

interface CreateUploadExerciseComponentProps {
    onCreateExercise: Function
}

export function CreateUploadExerciseComponent({ onCreateExercise }: CreateUploadExerciseComponentProps) {
    const dispatch = useAppDispatch();
    const [specification, setSpecification] = React.useState<{problems:{[key:string]: Partial<ProblemSpec>}, exercises:{[key:string]: Partial<ExerciseSpec>}}>();
	const [fileIsSelected, setFileIsSelected] = React.useState(false);
	const [errors, setErrors] = React.useState<string[]>([]);

    async function selectFile(e:React.ChangeEvent<HTMLInputElement>) {
        if(e.currentTarget.files !== null) {
            setFileIsSelected(true);
            console.log(e.currentTarget.files[0]);
            const filetext = await e.currentTarget.files[0].text();
            try {
                const uvnewspec = yaml.load(filetext);
                const newspec = validateUpload(uvnewspec);
                console.log(`Newspec = ${newspec}`);
                setSpecification({exercises:newspec.exercises, problems:newspec.problems});
                setErrors(newspec.errors);
            }
            catch(error) {
                console.log(error);
                if(typeof error === "string"){
                    setErrors([error]);
                }
                if (error instanceof Error) {
                    setErrors([error.message]);
                }
                console.error(error);
            }
        }
    }

    function startExercise(specification:{exercise:Partial<ExerciseSpec>, problemrepository:{ [key: string]: Partial<ProblemSpec> }}) {
        dispatch(createNewExerciseFromExisting(specification));
        onCreateExercise(true);
    }

    return (
        <Box paddingY={3}>
            <Typography paragraph variant="h3">Upload exercise</Typography>
            <Input type="file" onChange={selectFile} />
            {specification !== undefined ? 
                <List>
                    {Object.keys(specification.exercises).map((key, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => startExercise({exercise:specification.exercises[key], problemrepository:specification.problems})}
                    >
                        <ListItemText primary={specification.exercises[key].title} />
                    </ListItem>
                    ))}
                </List>
                :
                <div></div>
            }
            {errors.length > 0 ?
            <div>
                <Typography paragraph variant="h4">
                    Errors
                </Typography>
                <List>
                    {errors.map((error, index) => (
                    <ListItem
                        key={index}
                    >
                        <ListItemText primary={error} />
                    </ListItem>
                    ))}
                </List>
                </div>
            :<div></div>
            }
        </Box>
    )
}