import {Graph} from "./Graph";

const adjacencyList = {
    0: [1,3],
    1: [0, 2,3],
    2: [1, 3, 4],
    3: [0, 1, 2, 4],
    4: [2, 3],
}

const graph = new Graph({ adjacencyList });
console.log(graph.breadthFirstSearch(0));