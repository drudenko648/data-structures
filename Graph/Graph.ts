export namespace Graph {
    export type AdjacencyMatrix = number[][];
    /**
     * Stores object with vertex as key and array of connected vertices as value
     */
    export type AdjacencyList = Record<number, number[]>;
}

export class Graph {
    private readonly adjacencyList: Graph.AdjacencyList = {};

    constructor ({ adjacencyList }: { adjacencyList?: Graph.AdjacencyList,  }) {
        if (adjacencyList) this.adjacencyList = adjacencyList;
    }

    /**
     * @param start - index of starter vertex
     * @returns - list of vertices in the order in which they were visited
     */
    public breadthFirstSearch (start: number) {
        const order: number[] = [];
        /**
         * queue for storing not visited nodes
         * uses shift to remove elem and push to add element
         */
        const queue: number[] = [];

        order.push(start);
        queue.push(...this.adjacencyList[start]);

        while (queue.length > 0) {
            const elem = queue.shift();

            if (!elem) throw new Error("Fucked up with queue or loop condition");
            order.push(elem);

            const elemNeighbors = this.adjacencyList[elem];

            elemNeighbors.forEach(neighbor => {
                return (
                    // means that this vertex were visited
                    // we not adding it to avoid cycle
                    !order.includes(neighbor) &&
                    // means that this vertex already in traversing stack and will be visited later
                    // we not adding it to avoid cycle
                    !queue.includes(neighbor) &&
                    queue.push(neighbor)
                );
            });
        }

        return order;
    }

    /**
     * @param start - index of starter vertex
     * @returns - list of vertices in the order in which they were visited
     */
    public depthFirstSearch (start: number) {
        const order: number[] = [];
        /**
         * stack for storing not visited vertices
         * uses pop to remove elem and push to add element
         */
        const stack: number[] = [];

        order.push(start);
        stack.push(...this.adjacencyList[start]);

        while (stack.length > 0) {
            const elem = stack.pop();
            if (!elem) throw new Error("Fucked up with stack or loop condition");
            order.push(elem);

            const elemNeighbors = this.adjacencyList[elem];

            elemNeighbors.forEach(neighbor => {
                return (
                    // means that this vertex were visited
                    // we not adding it to avoid cycle
                    !order.includes(neighbor) &&
                    // means that this vertex already in traversing stack and will be visited later
                    // we not adding it to avoid cycle
                    !stack.includes(neighbor) &&
                    stack.push(neighbor)
                );
            });
        }

        return order;
    }

    private createAdjacencyMatrix() {}

    private createAdjacencyList() {}
}
