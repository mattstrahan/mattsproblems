import yaml
import json
import os
import traceback

# This script builds the repository from supplied YAML files. It is intended to make it easier to manage
# the repository while making sure it's all extremely speedy and packaged with the app.


class Repository:
    def __init__(self):
        self.repository = {}

    def addfile(self, file):
        # Combine all the courses, exercises, problems, and topics into one big repository
        # Called for each YAML file found in the application store
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
        # Output the final repository to a TSX file to be read by MMP typescript
        
        # Remove exercise creator variables if found
        for problemid in self.repository["problems"]:
            if "showRepeats" in self.repository["problems"][problemid]:
                del self.repository["problems"][problemid]["showRepeats"]
            if "showParts" in self.repository["problems"][problemid]:
                del self.repository["problems"][problemid]["showParts"]
            if "showParameters" in self.repository["problems"][problemid]:
                del self.repository["problems"][problemid]["showParameters"]

        # Sort out topics
        for exerciseid in self.repository["exercises"]:
            if "topic" in self.repository["exercises"][exerciseid]:
                topic = self.repository["exercises"][exerciseid]["topic"]
            else:
                continue

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

        # Sort all the topics based on level
        self.repository["topics"] = {k: v for k, v in sorted(
            self.repository["topics"].items(), key=lambda x: x[1]["level"])}

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
