import * as fs from "fs";

fs.readFile(
  "C:/Users/rkloost3/OneDrive - Enexis productie/desktop/AOC 2024/Day-5/Input.txt",
  "UTF8",
  (err, data) => {
    if (err) throw err;

    const dependencies = {};
    const updates = [];
    const validUpdates = [];
    const invalidUpdates = [];
    const fixedUpdates = [];

    data.split("\n").forEach((line) => {
      if (line.includes("|")) {
        const [dependentOn, number] = line.split("|");
        if (!dependencies[number]) {
          dependencies[number] = [];
        }
        dependencies[number].push(dependentOn);
      } else if (line.includes(",")) {
        updates.push(line.split(",").map(Number));
      }
    });

    updates.forEach((update) => {
      const updatesDone = [];
      let isValid = update.every((updateNumber) => {
        const dependencyNumbers = dependencies[updateNumber]?.map(Number) || [];
        const includedDependencies = dependencyNumbers.filter((dependency) =>
          update.includes(dependency)
        );

        if (
          !includedDependencies.length ||
          includedDependencies.every((num) => updatesDone.includes(num))
        ) {
          updatesDone.push(updateNumber);
          return true;
        }
        invalidUpdates.push(update);
        return false;
      });

      if (isValid) validUpdates.push(update);
    });

    // FIX INVALID UPDATES
    invalidUpdates.forEach((invalidUpdate) => {
      let listLength = invalidUpdate.length;
      let fixedUpdate = [];

      while (fixedUpdate.length != listLength) {
        // Check for a number that only has update dependencies that are not in the updateList
        const validNumber = invalidUpdate.find((updateNumber) => {
          const dependencyNumbers =
            dependencies[updateNumber]?.map(Number) || [];
          const includedDependencies = dependencyNumbers.filter((dependency) =>
            invalidUpdate.includes(dependency)
          );
          return (
            includedDependencies.length === 0 ||
            includedDependencies.every((dependency) =>
              fixedUpdate.includes(dependency)
            )
          );
        });
        // console.log(validNumber);
        fixedUpdate.push(validNumber);
        let index = invalidUpdate.indexOf(validNumber);
        if (index !== -1) {
          invalidUpdate.splice(index, 1);
        }
      }
      fixedUpdates.push(fixedUpdate);
    });

    const totalValue = fixedUpdates.reduce(
      (acc, update) => acc + update[Math.floor(update.length / 2)],
      0
    );
    console.log(totalValue);
  }
);
