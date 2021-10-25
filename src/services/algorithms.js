export async function buildNetwork(network) {
  var data = await fetch("/subjects.csv")
    .then((res) => res.text())
    .then((text) => text);

  var file = data.split("\n");

  file.forEach((line) => {
    if (line === "") return;

    line = line.split(", ");

    if (network[line[0]] === undefined) {
      network[line[0]] = { name: line[1], from: [], to: [] };
    } else {
      network[line[0]].name = line[1];
    }

    for (var i = 2; i < line.length; i++) {
      network[line[0]].to.push(line[i]);

      if (network[line[i]] === undefined) {
        network[line[i]] = { name: "", from: [], to: [] };
      }

      network[line[i]].from.push(line[0]);
    }
  });

  return network;
}

export function initOptions(network) {
  var options = [];

  for (var subject in network) {
    if (!network[subject].from.length) {
      options.push(subject);
    }
  }

  return options;
}

function isUnlocked(subject, selected, network) {
  var valid = true;

  network[subject].from.forEach((item) => {
    if (!selected.includes(item)) valid = false;
  });

  return valid;
}

export function select(subject, options, selected, network) {
  options = options.filter((item) => item !== subject);
  selected.push(subject);

  network[subject].to.forEach((item) => {
    if (isUnlocked(item, selected, network)) {
      options.push(item);
    }
  });

  return {
    left: options,
    right: selected,
  };
}

function remove(arr, subject, selected, options, network) {
  for (var i = 0; i < selected.length; i++) {
    if (network[selected[i]].from.includes(subject)) {
      options = remove(arr, selected[i], selected, options, network);
    }

    if (subject === selected[i]) {
      arr.push(subject);
    }
  }

  options = options.filter((item) => {
    return !network[item].from.includes(subject);
  });

  options.push(subject);

  return options;
}

export function deselect(subject, selected, options, network) {
  var arr = [];
  options = remove(arr, subject, selected, options, network);

  selected = selected.filter((item) => !arr.includes(item));

  return {
    left: options,
    right: selected,
  };
}

// const shift = {
//     'M': 0,
//     'T': 2,
// }

// // seg. ter. qua. qui. sex.
// // 1111 1111 1111 1111 1111
// function timeToIndex(time) {
//     var index = [];
//     const pattern = /(?<day>[0-9]+)(?<shift>[MTN])(?<hour>[0-9]+)/;

//     time = time.split(" ");
//     for (var t in time) {
//         let match = time[t].match(pattern);

//         let day = match.groups.day;
//         for (var d in day) {

//             let hour = match.groups.hour;
//             for (var h = 0; h < hour.length; h+=2) {
//                 var i = (parseInt(day[d]) - 2) * 4 + shift[match.groups.shift];

//                 if (match.groups.shift == 'T')
//                     i += (parseInt(hour[h]) - 2) / 2;
//                 else
//                     i += (parseInt(hour[h]) - 1) / 2;

//                 index.push(i);
//             }
//         }
//     }

//     return index;
// }

// function initMatrix(rows, columns) {
//     var matrix = Array(rows);

//     for (var i = 0; i < matrix.length; i++) {
//         matrix[i] = Array(columns).fill(0);
//     }

//     return matrix;
// }

// // 1011 1111 1111 1111 1011
// // 1110 1111 1110 1111 1111
// function isCompatible(weight1, weight2) {
//     const mask = (1 << 20) - 1;
//     return !((weight1 | weight2) ^ mask);
// }

// function timeToInt(time) {
//     const mask = (1 << 20) - 1;
//     var bit = "0".padStart(20, '0');

//     bit = bit.split("");
//     timeToIndex(time).forEach(i => {bit[i] = '1'; });
//     bit = bit.join("");

//     bit = parseInt(bit, 2);

//     return ~bit & mask;
// }

// function knapsack() {
//     var matrix = initMatrix(items.length, 2**20);
//     var verified = [];

//     for (var index = 1; index < matrix.length; index++) {
//         var i = index;
//         if (verified.includes(items[index].subject)) {
//             while (items[i - 1].subject == items[index].subject)
//                 i -= 1;
//         }
//         else {
//             verified.push(items[index].subject);
//         }

//         for (var weight = 1; weight < matrix[0].length; weight++) {
//             if (!isCompatible(items[index].weight, weight)) {
//                 matrix[index][weight] = matrix[index - 1][weight];
//             }
//             else {
//                 matrix[index][weight] = Math.max(
//                     items[index].value + matrix[i - 1][weight & items[index].weight],
//                     matrix[index - 1][weight]
//                 );
//             }
//         }
//     }

//     return matrix;
// }

// function allCombinations(matrix, solution, index, weight) {
//     while (index >= 1) {
//         var i = index;
//         while (items[i - 1].subject == items[index].subject) {
//             i -= 1;
//         }

//         if (items[index].value + matrix[i - 1][weight & items[index].weight] === matrix[index - 1][weight]) {
//             if (isCompatible(items[index].weight, weight)) {
//                 allCombinations(matrix, solution.concat([index]), i - 1, weight & items[index].weight);
//             }
//         }

//         if (matrix[index][weight] != matrix[index - 1][weight]) {
//             solution.push(index);
//             weight = weight & items[index].weight;
//             index = i;
//         }
//         index -= 1;
//     }

//     var subjects = "";
//     var grid = "";

//     solution.forEach(subject => {
//         subjects = subjects.concat(items[subject].subject);
//         grid = grid.concat(items[subject].weight.toString(2).padStart(20, '0'));
//     });

//     if (combinations[subjects] === undefined) combinations[subjects] = {};
//     if (combinations[subjects][grid] === undefined) combinations[subjects][grid] = [];

//     if (!combinations[subjects][grid].includes(solution))
//         combinations[subjects][grid].push(solution);
// }

// function buildItems() {
//     const fs = require("fs");

//     var data = fs.readFileSync("../assets/classes.csv", "utf8");
//     var file = data.split("\n");

//     file.forEach(line => {
//         if (line == "") return;

//         line = line.split(", ");

//         if (options.includes(line[0])) {
//             items.push({
//                 subject: line[0],
//                 class: line[1],
//                 weight: timeToInt(line[2]),
//                 value: timeToIndex(line[2]).length * 2,
//                 time: line[2]
//             });
//         }
//     });

//     items = items.sort((a, b) => {
//         return a.value - b.value;
//     });
// }

// function getWeight(credits) {
//     var index = matrix.length - 1;

//     for (var weight = 2**20 - 1; matrix[index][weight] > credits; weight--);

//     return weight;
// }

// function initItems() {
//   return [{ subject: "", class: "", weight: 0, value: 0 }];
// }

// function getClosestWeight(credits) {
//     var index = matrix.length - 1;
//     var perfect = credits;
//     for (var weight = 2**20 - 1; weight > 0; weight--) {
//         if (credits - matrix[index][weight] < 0)
//             continue;

//         perfect = Math.min(perfect, credits - matrix[index][weight]);
//     }

//     return credits - perfect;
// }

// var network = {}
// var items = initItems();
// buildNetwork();
// var options = initOptions();
// var selected = []
// var combinations = []
// buildItems();
// var matrix = knapsack();
