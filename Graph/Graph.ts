export namespace Graph {
    export type AdjacencyMatrix = number[][];
    export type AdjacencyList = Record<number, number[]>;
}

export class Graph {
    private readonly adjacencyMatrix: Graph.AdjacencyMatrix = [];
    private readonly adjacencyList: Graph.AdjacencyList = {};

    constructor ({ adjacencyList, adjacencyMatrix }: { adjacencyMatrix?: Graph.AdjacencyMatrix, adjacencyList?: Graph.AdjacencyList,  }) {
        if (!adjacencyList && !adjacencyMatrix) throw new TypeError('No graph representation provided');
        if(adjacencyList) this.adjacencyList = adjacencyList;
        if (adjacencyMatrix) this.adjacencyMatrix = adjacencyMatrix;

        if(!this.adjacencyMatrix) this.createAdjacencyMatrix();
        if(!this.adjacencyList) this.createAdjacencyList();
    }

    public breadthFirstSearch (start: number) {
        const order: number[] = [];
        const queue: number[] = [];

        order.push(start);
        queue.push(...this.adjacencyList[start]);

        while (queue.length > 0) {
            const elem = queue.shift();

            if (!elem) throw new Error("Fucked up with queue or loop condition");
            if (order.includes(elem)) continue;
            else order.push(elem);

            const elemNeighbors = this.adjacencyList[elem];

            elemNeighbors.forEach(neighbor => !queue.includes(neighbor) && !order.includes(neighbor) && queue.push(neighbor));
        }

        return order;
    }

    public depthFirstSearch () {}

    private createAdjacencyMatrix() {}

    private createAdjacencyList() {}
}
