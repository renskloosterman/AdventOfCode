// import * as fs from "fs";

// fs.readFile(
//   "C:/Users/rkloost3/OneDrive - Enexis productie/desktop/AOC 2024/Day-5/Input.txt",
//   "UTF8",
//   (err, data) => {
//     const dependencies = {};
//     const updates = [];
//     const validUpdates = [];
//     const invalidUpdates = [];

//     data.split("\n").forEach((line) => {
//       if (line.includes("|")) {
//         const [dependentOn, number] = line.split("|");
//         if (!dependencies[number]) {
//           dependencies[number] = [];
//         }
//         dependencies[number].push(dependentOn);
//       }

//       if (line.includes(",")) {
//         updates.push(line.split(",").map(Number));
//       }
//     });

//     updates.forEach((update) => {
//       let isValid = true;
//       const updatesDone = [];
//       for (let i = 0; i < update.length; i++) {
//         const updateNumber = update[i];
//         const dependencyNumbers = dependencies[updateNumber];
//         const includedDependencies = [];

//         if (dependencyNumbers) {
//           dependencyNumbers.forEach((dependency) => {
//             dependency = parseInt(dependency);
//             if (update.includes(dependency)) {
//               includedDependencies.push(dependency);
//             }
//           });
//         }

//         if (includedDependencies.length == 0) {
//           // if the dependency of the number does not exist in the update, continue;
//           updatesDone.push(updateNumber);
//           continue;
//         }

//         if (
//           includedDependencies.every((number) => updatesDone.includes(number))
//         ) {
//           updatesDone.push(updateNumber);
//         } else {
//           invalidUpdates.push(update);
//           isValid = false;
//           break;
//         }
//       }

//       if (isValid) {
//         validUpdates.push(update);
//       }
//     });

//     console.log(validUpdates);

//     let totalValue = 0;
//     validUpdates.forEach((validUpdate) => {
//       totalValue += validUpdate[Math.floor(validUpdate.length / 2)];
//     });

//     console.log(totalValue);
//   }
// );

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

    const totalValue = validUpdates.reduce(
      (acc, update) => acc + update[Math.floor(update.length / 2)],
      0
    );

    console.log(totalValue);
  }
);
