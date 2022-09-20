import yaml
import json
import os
import traceback


class Repository:
    def __init__(self):
        self.repository = {}

    def addfile(self, file):
        try:
            with open(file, 'r') as vf:
                print("Processing file {}".format(file))
                rawyaml = vf.read()
                spec = yaml.safe_load(rawyaml)
                for rt in ["courses", "exercises", "problems", "topics"]:
                    if rt not in self.repository:
                        self.repository[rt] = {}
                    if rt in spec:
                        for rti in spec[rt]:
                            self.repository[rt][rti] = spec[rt][rti]
        except Exception as e:
            print(e.args)
            traceback.print_exc()

    def output(self, file):
        # Sort out topics
        if "other" not in self.repository["topics"]:
            self.repository["topics"]["other"] = {
                "title": "Other exercises",
                "description": "These exercises do not have a topic set yet",
                "level": 100,
                "exerciseids": []
            }
        for exerciseid in self.repository["exercises"]:
            if "topic" in self.repository["exercises"][exerciseid]:
                topic = self.repository["exercises"][exerciseid]["topic"]
            else:
                topic = "other"

            if topic not in self.repository["topics"]:
                self.repository["topics"][topic] = {
                    "title": topic,
                    "level": 99,
                    "exerciseids": []
                }

            if "exerciseids" not in self.repository["topics"][topic]:
                self.repository["topics"][topic]["exerciseids"] = []
            print("Appending {} to topic {}".format(exerciseid, topic))
            self.repository["topics"][topic]["exerciseids"].append(exerciseid)

        with open(file, 'w') as vf:
            vf.write(
                "import { RepositorySpec } from \"../classes/Repository\"\n\n")
            vf.write("const repository : RepositorySpec = " + json.dumps(
                self.repository, indent=4))
            vf.write("\n\nexport default repository")


specdir = "../src/specs/"

repo = Repository()
for (root, dirs, files) in os.walk(specdir, topdown=True):
    for file in files:
        filename, file_extension = os.path.splitext(file)
        if file_extension == ".yaml":
            repo.addfile(os.path.join(root, file))

repo.output(os.path.join(specdir, "repository.tsx"))
