import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { ParameterSpec } from "../../classes/Parameters";
import { VariableSpec } from "../../classes/Variables";
import { defaultenv, envtype, getStrValue } from "../../helpers/env";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addNewPart, moveStage, removeStage, setProblemQuestion, setProblemStage, setProblemTitle, setShowParameters, setShowParts, setShowRepeats } from "../../reducers/CreateReducer";
import Markdown from "../Markdown";
import MPPaper from "../MPPaper";
import { CreateAnswerComponent, CreateShowAnswerComponent } from "./CreateAnswer";
import { CreateParametersComponent } from "./CreateParameters";
import { CreateTextField } from "./CreateTextField";
import { CreateVariablesComponent } from "./CreateVariable";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { ProblemStageSpec } from "../../classes/Exercise";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import MenuIcon from '@mui/icons-material/Menu';
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AnswerSpec } from "../../classes/Answers";
import Tooltip from "@mui/material/Tooltip";

export function getCreateEnv(parameters?: { [key: string]: ParameterSpec }, variables?: { [key: string]: Partial<VariableSpec> }, stopParametersAt:string="", stopVariablesAt:string="") {
    // Go through and get the env from the variables. We only need to loop until we see our own varname.
    let env:envtype = {};
    Object.assign(env, defaultenv);
    if(parameters)
        for(let parameter in parameters) {
            // Have we hit our own variable? Then we don't need to continue building the env.
            if(parameter === stopParametersAt)
                break;
            if(parameters[parameter]?.default !== undefined)
                env[parameter] = parameters[parameter].default;
        }
    if(variables)
        for(let variable in variables) {
            // Have we hit our own variable? Then we don't need to continue building the env.
            if(variable === stopVariablesAt)
                break;
            
            if(variables[variable]?.example !== undefined)
                env[variable] = variables[variable].example;
        }
    
    return env;
}

interface CreateProblemRepeatComponentProps {
    probid: string;
    stageindex: number;
}

export function CreateProblemRepeatComponent({ probid, stageindex }: CreateProblemRepeatComponentProps) {    
    const problemtitle = useAppSelector(state => state.create.problems[probid].title); // Get the main exercise simply to see if it's there

    return (
        <Box paddingY={3} >
        <MPPaper>
            <Typography paragraph variant="h4">{problemtitle ? problemtitle : "Repeated problem"}</Typography>
            <CreateParametersComponent stageindex={stageindex} probid={probid} isRepeat />
            <CreateRepeatProblemSelector stageindex={stageindex} />
        </MPPaper>
        </Box>
    )
}

interface CreateProblemTitleComponentProps {
    probid: string;
    stageindex: number;
}

export function CreateProblemTitleComponent({probid, stageindex} : CreateProblemTitleComponentProps) {
    const title = useAppSelector(state => state.create?.problems?.[probid]?.title); // Get the main exercise simply to see if it's there
    const showParameters = useAppSelector(state => state.create?.problems?.[probid]?.showParameters);
    const showParts = useAppSelector(state => state.create?.problems?.[probid]?.showParts);
    const showRepeats = useAppSelector(state => state.create?.problems?.[probid]?.showRepeats);
    const [editTitle, setEditTitle] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
            <Box paddingY={2}>
                <Grid container>
                    <Grid xs>
                        {editTitle
                        ? <div>
                            <TextField label="Title" value={title ? title : ""} onChange={(e) => dispatch(setProblemTitle({probid:probid, title:e.target.value}))} />
                            <Tooltip title="Finish editing problem title" arrow ><IconButton onClick={() => setEditTitle(false)}><DoneIcon /></IconButton></Tooltip>
                          </div>
                        :
                            <Typography variant="h3">{title}
                            <Tooltip title="Edit problem title" arrow><IconButton onClick={() => setEditTitle(true)}><EditIcon /></IconButton></Tooltip>
                            </Typography>
                        }
                    </Grid>
                    <Grid xs="auto">
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>
                            <ListItemText onClick={() => dispatch(setShowParameters({probid:probid, setting: !showParameters}))}>Show parameters</ListItemText>
                            <Switch inputProps={{ 'aria-label': 'controlled' }} checked={showParameters} onChange={(e) => dispatch(setShowParameters({probid:probid, setting: e.target.checked}))} />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText onClick={() => dispatch(setShowParts({probid:probid, setting: !showParts}))}>Show parts</ListItemText>
                            <Switch inputProps={{ 'aria-label': 'controlled' }} checked={showParts} onChange={(e) => dispatch(setShowParts({probid:probid, setting: e.target.checked}))} />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText onClick={() => dispatch(setShowRepeats({probid:probid, setting: !showRepeats}))}>Show repeat slider</ListItemText>
                            <Switch inputProps={{ 'aria-label': 'controlled' }} checked={showRepeats} onChange={(e) => dispatch(setShowRepeats({probid:probid, setting: e.target.checked}))} />
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <ArrowUpwardIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText onClick={() => {handleClose(); dispatch(moveStage({stageindex:stageindex, direction:"up"}))}}>Move problem up</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <ArrowDownwardIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText onClick={() => {handleClose(); dispatch(moveStage({stageindex:stageindex, direction:"down"}))}}>Move problem down</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText onClick={() => {handleClose(); dispatch(removeStage({stageindex:stageindex}))}}>Remove problem</ListItemText>
                        </MenuItem>
                    </Menu>
                    </Grid>
                </Grid>
            </Box>
        )
}

interface CreateRepeatProblemSelectorProps {
    stageindex: number;
}

export function CreateRepeatProblemSelector({ stageindex }: CreateRepeatProblemSelectorProps) {    
    const problemstage = useAppSelector(state => state.create?.exercise?.stages?.[stageindex]); // Get the main exercise simply to see if it's there
    const [currentValue, setCurrentValue] = React.useState<number>(1);

    const dispatch = useAppDispatch();
    if(!problemstage)
        return (<div>Problem stage not found for CreateRepeatProblemSelector</div>)
    if(problemstage.type !== "problem")
        return (<div>Problem stage not a problem for CreateRepeatProblemSelector</div>)
    
    if(problemstage.repeats && problemstage.repeats !== currentValue && typeof problemstage.repeats === "number")
        setCurrentValue(problemstage.repeats)

    function setRepeats(repeats:number|number[]) {
        var setrepeats = 1;
        if(typeof repeats === "number") {
            setrepeats = repeats;
        } else {
            setrepeats = repeats[0];
        }
        setrepeats = Math.floor(setrepeats);
        if(setrepeats<1)
            setrepeats = 1;
        if(setrepeats > 50)
            setrepeats = 50;
        setCurrentValue(setrepeats)
        if(problemstage !== undefined && problemstage.type === "problem") {
            const newproblemstage:ProblemStageSpec = {...problemstage, repeats:setrepeats};
            dispatch(setProblemStage({stageindex:stageindex, problemstage: newproblemstage}));
        }
    }

    return (
        <Box>How many times should we show this problem?
            
        <Grid container spacing={2} alignItems="center">
        <Grid xs>
            <Slider value={currentValue} defaultValue={1} step={1} marks min={1} max={10} onChange={(e, newValue) => setRepeats(newValue)} />
        </Grid>
        <Grid xs="auto">
            <Input
            value={currentValue.toString()}
            size="small"
            onChange={(e) => setRepeats(parseInt(e.target.value))}
            inputProps={{
                step: 1,
                min: 1,
                max: 20,
                type: 'number'
            }}
            />
        </Grid>
        </Grid>
            
        </Box>
    )
}

interface CreatePartComponentProps {
    probid: string;
    partindex?: number;
}

export function CreatePartComponent({ probid, partindex }: CreatePartComponentProps) {
    const problem = useAppSelector(state => state.create.problems[probid]); // Get the main exercise simply to see if it's there
    const dispatch = useAppDispatch();

    if(!problem)
        return <div>Problem not {probid} found.</div>
    
    const question:string | undefined = partindex === undefined ? problem.question : problem?.additionalparts?.[partindex]?.question;

    if(question === undefined)
        return <div>Part not found</div>
    
    const env = getCreateEnv(problem.parameters, problem.variables);

    return (
        <Box>
            {partindex !== undefined ? <Typography paragraph variant="h5">Part {partindex+2}</Typography> : (null)}
            <Typography paragraph variant="h6">Question</Typography>
            <CreateTextField nunjucks multiline label="" initial={problem.question} handleChange={(e:string) => dispatch(setProblemQuestion({probid:probid, text:e, partindex:partindex}))} env={env} />
            <CreateAnswerComponent env={env} probid={probid} partindex={partindex} />
        </Box>
    )
}

interface CreateShowPartComponentProps {
    probid: string;
    partindex?: number;
}

export function CreateShowPartComponent({ probid, partindex }: CreateShowPartComponentProps) {
    const problem = useAppSelector(state => state.create.problems[probid]);

    if(!problem)
        return <div>Problem not {probid} found.</div>
    
    const question:string | undefined = partindex === undefined ? problem.question : problem?.additionalparts?.[partindex]?.question;
    const answer:Partial<AnswerSpec> | undefined = partindex === undefined ? problem.answer : problem?.additionalparts?.[partindex]?.answer;

    if(question === undefined)
        return <div>Part not found</div>
    if(answer === undefined)
        return <div>Part not found</div>
    
    const env = getCreateEnv(problem.parameters, problem.variables);

    return (
        <Box>
            {partindex !== undefined ? <Typography paragraph variant="h6">Part {partindex+2}</Typography> : (null)}
            <Markdown>{question ? getStrValue(question, env) : ""}</Markdown>
            <CreateShowAnswerComponent answer={answer} env={env} />
        </Box>
    )
}

interface CreateProblemComponentProps {
    probid: string;
    stageindex: number;
}

export function CreateProblemComponent({ probid, stageindex }: CreateProblemComponentProps) {
    const problem = useAppSelector(state => state.create.problems[probid]); // Get the main exercise simply to see if it's there
    const dispatch = useAppDispatch();

    if(!problem)
        return <div>Problem not {probid} found.</div>

    return (
        <Box paddingY={3} >
        <MPPaper>
            <CreateProblemTitleComponent stageindex={stageindex} probid={probid} />
            {problem.showParameters ? <CreateParametersComponent stageindex={stageindex} probid={probid} /> : (null)}
            <CreateVariablesComponent probid={probid} />
            <Grid container spacing={4}>
                <Grid xs={12} sm={6}>
                    <Box>
                    {problem.showParts ? <Typography paragraph variant="h5">Part 1</Typography> : (null)}
                    <CreatePartComponent probid={probid} />
                    {problem.showParts && problem.additionalparts !== undefined ? problem.additionalparts.map((part, index) => <CreatePartComponent probid={probid} partindex={index} />) : (null)}
                    {problem.showParts && problem.additionalparts !== undefined ? <Button onClick={() => dispatch(addNewPart({probid: probid}))}>Add new part</Button> : (null)}
                    </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                    <Paper>
                        <Box padding={3}>
                        <Typography paragraph variant="h5">Example</Typography>
                        {problem.showParts ? <Typography paragraph variant="h6">Part 1</Typography> : (null)}
                        <CreateShowPartComponent probid={probid} />
                        {problem.showParts && problem.additionalparts !== undefined ? problem.additionalparts.map((part, index) => <CreateShowPartComponent probid={probid} partindex={index} />) : (null)}
                        <Button disabled>Submit answer</Button> <Button disabled>Skip</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            {problem.showRepeats ? <CreateRepeatProblemSelector stageindex={stageindex} /> : (null)}
        </MPPaper>
        </Box>
    )
}