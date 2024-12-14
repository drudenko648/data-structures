import {Graph} from "./Graph";
import assert from 'node:assert/strict';

type AssertFunction =
    | typeof assert.equal
    | typeof assert.notEqual
    | typeof assert.deepEqual
    | typeof assert.notDeepEqual;

const test = <T>(name: string, assertFunction: AssertFunction, actual: unknown, expected: T) => {
    try {
        assertFunction(actual, expected);
        console.log(`[PASSED]: ${name}`)
    } catch (e) {
        console.log(`[FAILED]: ${name}`)
    }
};

((testName) => {
    const adjacencyList = {
        0: [],
    }
    const graph = new Graph({ adjacencyList });

    const searchOrder = graph.breadthFirstSearch(0);
    const expectedOrder = [0];

    assert.deepEqual(searchOrder, expectedOrder);
    test(testName, assert.deepEqual, searchOrder, expectedOrder)
})("breadthFirstSearch: handles graph with single node");

((testName) => {
    const adjacencyList = {
        0: [1,3],
        1: [0, 2,3],
        2: [1, 3, 4],
        3: [0, 1, 2, 4],
        4: [2, 3],
    }
    const graph = new Graph({ adjacencyList });

    const searchOrder = graph.breadthFirstSearch(0);
    const expectedOrder = [0, 1, 3, 2, 4];

    assert.deepEqual(searchOrder, expectedOrder);
    test(testName, assert.deepEqual, searchOrder, expectedOrder)
})("breadthFirstSearch: traversing with correct order");
