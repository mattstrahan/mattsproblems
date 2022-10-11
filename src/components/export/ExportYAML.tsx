import { ExerciseSpec } from "../../classes/Exercise";
import { ProblemSpec } from "../../classes/Problem";
import yaml from "js-yaml"
import saveAs from "file-saver";

export function ExportYAML( problemspecs:{ [key: string]: Partial<ProblemSpec> }, exercisespec:Partial<ExerciseSpec>) {
    const title = exercisespec.title ? exercisespec.title : "exercise";
    var regex=/[^a-zA-Z\-_.&\s]+/g;
    const filename = title.replace(regex, '');
    const structure = {
        problems: problemspecs,
        exercises: {[title]: exercisespec}
    };
    (async () => {
        const doc = await yaml.dump(structure);
        const blob = await new Blob([doc]);
        saveAs(blob, `${filename}.yaml`);
    })();
}