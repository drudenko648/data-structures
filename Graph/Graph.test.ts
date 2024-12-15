import {Graph} from "./Graph";
import assert from 'node:assert/strict';
import {AssertionError} from "node:assert";

type AssertFunction =
    | typeof assert.equal
    | typeof assert.notEqual
    | typeof assert.deepEqual
    | typeof assert.notDeepEqual;

const test = <T>(name: string, assertFunction: AssertFunction, actual: unknown, expected: T) => {
    try {
        assertFunction(actual, expected, name);
        console.log(`[PASSED]: ${name}`)
    } catch (e) {
        console.log(`[FAILED]: ${name}`)
        throw e;
    }
};

((testsSet) => {
    try {
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

        console.log(`[PASSED SET]: ${testsSet}`)
    } catch (e) {
        if (e instanceof AssertionError) {
            console.log(`[FAILED SET]: ${testsSet} ${e.message}`)
        }
    }
})("breadthFirstSearch");

((testsSet) => {
    try {
        ((testName) => {
            const adjacencyList = {
                0: [],
            }
            const graph = new Graph({ adjacencyList });

            const searchOrder = graph.depthFirstSearch(0);
            const expectedOrder = [0];

            assert.deepEqual(searchOrder, expectedOrder);
            test(testName, assert.deepEqual, searchOrder, expectedOrder)
        })("depthFirstSearch: handles graph with single node");

        ((testName) => {
            const adjacencyList = {
                0: [1,3],
                1: [0, 2,3],
                2: [1, 3, 4],
                3: [0, 1, 2, 4],
                4: [2, 3],
            }
            const graph = new Graph({ adjacencyList });

            const searchOrder = graph.depthFirstSearch(0);
            const expectedOrder = [0, 3, 4, 2, 1];

            assert.deepEqual(searchOrder, expectedOrder);
            test(testName, assert.deepEqual, searchOrder, expectedOrder)
        })("depthFirstSearch: traversing with correct order");
        console.log(`[PASSED SET]: ${testsSet}`)
    } catch (e) {
        if (e instanceof AssertionError) {
            console.log(`[FAILED SET]: ${testsSet} ${e.message}`)
        }
    }
})("depthFirstSearch")
