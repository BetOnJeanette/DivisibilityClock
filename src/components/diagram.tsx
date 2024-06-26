import { createEffect, type Accessor } from "solid-js";
import Sigma from "sigma";
import Graph from "graphology";
import { circular } from "graphology-layout";

interface IDiagramProps{
    divisor: Accessor<number>
}
/**
 * Creates the clock diagram
 * @param divisor The divisor we're creating the diagram for
 * @returns A clock diagram for the divisor
 */
function Diagram({divisor}: IDiagramProps){
    let diagramElement!: HTMLDivElement;
    let graphDisplay: Sigma | undefined;
    createEffect(() => {
        const graph = GetGraph(divisor)
        graphDisplay?.kill();
        graphDisplay = new Sigma(graph, diagramElement, {});
        graphDisplay.viewportToFramedGraph;
    })
    const diagramContainer = <div id="DiagramContainer" ref={diagramElement}></div>
    
    return diagramContainer;
}

/**
 * Creates the graph data structure
 * @param divisor The divisor we're creating the graph for
 * @returns A graph data structure to represent the clock
 */
function GetGraph(divisor: Accessor<number>): Graph{
    const graph = new Graph({allowSelfLoops: true});
    
    for (let index = 0; index < divisor(); index++){
        graph.addNode(index, {label: index.toString(), x: index, y: index, size: 20});
    }

    for (let index = 0; index < divisor(); index++){
        graph.addDirectedEdge(index, (index * 10) % divisor(), {color: "black", type: "arrow"})
    };
    circular.assign(graph, {scale: 100});

    return graph;
}
export default Diagram;