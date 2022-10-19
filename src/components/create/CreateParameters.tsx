import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import DeleteIcon from '@mui/icons-material/Delete';
import Filter1Icon from '@mui/icons-material/Filter1';
import AbcIcon from '@mui/icons-material/Abc';
import { addNewParameter, removeParameter, setExerciseProblemParameter, setParameter } from "../../reducers/CreateReducer";
import React from "react";
import MPPaper from "../MPPaper";
import Grid from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { checkNumber } from "./CreateVariable";
import { CreateTextField } from "./CreateTextField";

interface CreateParameterComponentProps {
    probid: string;
    parname: string;
    stageindex: number;
    isRepeat?: boolean;
    showSet?: boolean;
}


function CreateParameterComponent({ probid, parname, isRepeat, stageindex }: CreateParameterComponentProps) {
    const parameter = useAppSelector(state => state.create.problems?.[probid]?.parameters?.[parname]);
    const exerciseparameters = useAppSelector(state => state.create.exercise?.stages?.[stageindex]?.parameters);
    const dispatch = useAppDispatch();

    if(!parameter)
        return <div>Parameter {parname} not found</div>
    
    function onParameterChange(value: string) {
        dispatch(setExerciseProblemParameter({probid: probid, parname: parname, stageindex: stageindex, value:value}))

        // If it's not the original problem, we set the default to also be the set value
        if(!isRepeat) {
            if(parameter?.type === "number") {
                dispatch(setParameter({probid:probid, parname:parname, parameter:{type:"number", default:Number(value)}}));
            } else {
                dispatch(setParameter({probid:probid, parname:parname, parameter:{type:"string", default:value}}));
            }
        }
    }
    function onParameterTypeChange(newtype: string) {
        if(newtype === "number") {
            let curdefault = parameter?.default;
            if(curdefault === undefined)
                curdefault = "0";
            if(typeof curdefault === "string")
                curdefault = parseInt(curdefault);
            let newdefault = curdefault;
            if(!newdefault)
                newdefault = 0;
            dispatch(setParameter({probid:probid, parname:parname, parameter:{type:"number", default:newdefault}}))
        } else {
            let newdefault = parameter?.default.toString();
            if(newdefault === undefined)
                newdefault = "";
            dispatch(setParameter({probid:probid, parname:parname, parameter:{type:"string", default:newdefault}}))
        }
    }

    return (
        <Grid container xs={12}>
                <Grid xs={12} sm>
                <Box padding={2}>
                    <Typography><IconButton onClick={() => dispatch(removeParameter({probid: probid, parname: parname}))} >
                        <DeleteIcon />
                    </IconButton> Name: {parname}</Typography></Box>
                </Grid>
                <Grid xs={12} sm>
                <Box padding={1}>
                <CreateTextField
                    label="Set value"
                    initial={exerciseparameters !== undefined && exerciseparameters[parname] !== undefined 
                        ? exerciseparameters[parname].toString() 
                        : parameter.default.toString()}
                    handleChange={(e:string) => onParameterChange(e)}
                    sx={{width: "100%"}}
                    errorcheck={parameter.type === "number" ? checkNumber : undefined} />
                </Box>
                </Grid>
                
                {!isRepeat ? 
                <Grid xs="auto">
                <Box padding={1}>
                    <IconButton onClick={() => onParameterTypeChange("number")} disabled={parameter.type === "number"}><Filter1Icon /></IconButton>
                    <IconButton onClick={() => onParameterTypeChange("string")} disabled={parameter.type === "string"}><AbcIcon /></IconButton>
                </Box>
                </Grid>
                : (null) }
        </Grid>
    )
}

interface CreateParametersCompactComponentProps {
    probid: string;
    stageindex: number;
}

export function CreateParametersCompactComponent({ probid, stageindex }: CreateParametersCompactComponentProps) {
    const parameters = useAppSelector(state => state.create.problems[probid].parameters);

    return (
        <List>
            {parameters ? 
                Object.entries(parameters).map((entry, index) => {
                    const parname = entry[0];
                    const parameter = entry[1];
                    const icon = parameter.type === "number" ? <Filter1Icon /> : <AbcIcon />;
                    return (
                    <ListItem>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>Name: {parname}, Default: {parameter.default.toString()}</ListItemText>
                    </ListItem>
                )
                }
                )
                : <div></div>
            }
        </List>
    )
}

interface CreateParametersExpandedComponentProps {
    probid: string;
    isRepeat?: boolean;
    stageindex: number;
}

export function CreateParametersExpandedComponent({ probid, isRepeat, stageindex }: CreateParametersExpandedComponentProps) {
    const parameters = useAppSelector(state => state.create.problems[probid].parameters);
    const [newparname, setNewParName] = React.useState<string>("");
    const dispatch = useAppDispatch();

    // If it's a repeat problem and there's no parameters don't show them
    if(isRepeat && (!parameters || Object.keys(parameters).length === 0))
        return <div></div>;

    return (
        <Box>
        {parameters ? 
            Object.entries(parameters).map((entry, index) => {
                const id = entry[0];
                return <CreateParameterComponent stageindex={stageindex} isRepeat={isRepeat} key={index} probid={probid} parname={id} />
            }
            )
            : <div></div>
        }
        {!isRepeat ? 
        
        <Grid container spacing={1} >
        <Grid xs={8} sm={4} >
        <TextField label="Add new Parameter" value={newparname} onChange={(e) => setNewParName(e.target.value)} sx={{width:"100%"}} />
        </Grid>
        <Grid xs={4} sm={2} >
        <Box padding={1}>
        <IconButton onClick={() => {dispatch(addNewParameter({probid: probid, parname: newparname, type:"number"}));setNewParName("")}}><Filter1Icon /></IconButton>
        <IconButton onClick={() => {dispatch(addNewParameter({probid: probid, parname: newparname, type:"string"}));setNewParName("")}}><AbcIcon /></IconButton>
        </Box>
        </Grid>
        </Grid>
        : (null) }
        </Box>
    )
}


interface CreateParametersComponentProps {
    probid: string;
    isRepeat?: boolean;
    stageindex: number;

}

export function CreateParametersComponent({ probid, isRepeat, stageindex }: CreateParametersComponentProps) {
    const parameters = useAppSelector(state => state.create.problems[probid].parameters);
    const [compact, setCompact] = React.useState(false);

    // If it's a repeat problem and there's no parameters don't show them
    if(isRepeat && (!parameters || Object.keys(parameters).length === 0))
        return <div></div>;

    return (
        <Box paddingY={2}>
            <Grid container spacing={1}>
                <Grid xs><Typography paragraph variant="h6">Parameters</Typography></Grid>
                <Grid xs="auto"><IconButton onClick={() => setCompact(!compact)}>{compact ? <ExpandMoreIcon /> : <ExpandLessIcon />}</IconButton></Grid>
            </Grid>
            
        {compact ? <CreateParametersCompactComponent stageindex={stageindex} probid={probid} /> : <CreateParametersExpandedComponent stageindex={stageindex} isRepeat={isRepeat} probid={probid} />}
        </Box>
    )
}
