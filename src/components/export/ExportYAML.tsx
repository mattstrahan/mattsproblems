import { ExerciseSpec, StageSpec } from "../../classes/Exercise";
import { ProblemSpec } from "../../classes/Problem";
import yaml from "js-yaml"
import saveAs from "file-saver";

export function ExportYAML( problemspecs:{ [key: string]: Partial<ProblemSpec> }, exercisespec:Partial<ExerciseSpec>, textstages:{[key: string]:string}|undefined) {
    const title = exercisespec.title ? exercisespec.title : "exercise";
    let newstages: StageSpec[] = [];

    // The exercise creator will separate out the text stages from the exercise stages to stop constant re-rendering of the 
    // entire screen every time a single letter is changed. This gets the text from the textstages parameter
    // and puts it back in the exercise stages.
    if(textstages !== undefined) {
        if(exercisespec.stages !== undefined)
            for (let stage in exercisespec.stages) {
                const es:StageSpec = exercisespec.stages[stage];
                if(es.type === 'text' && es.textstageid && es.textstageid in textstages) {
                    const newstage:StageSpec = {...es, text:textstages[es.textstageid]};
                    delete newstage.textstageid;
                    newstages.push(newstage);
                } else {
                    newstages.push({...es});
                }
            }
    } else {
        newstages = exercisespec.stages ? exercisespec.stages : [];
    }
    
    var regex=/[^a-zA-Z\-_.&\s]+/g;
    const filename = title.replace(regex, '');
    const structure = {
        problems: problemspecs,
        exercises: {[title]: {...exercisespec, stages:newstages}}
    };
    (async () => {
        const doc = await yaml.dump(structure);
        const blob = await new Blob([doc]);
        saveAs(blob, `${filename}.yaml`);
    })();
}