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
        if (graphDisplay == undefined) {
            graphDisplay = new Sigma(graph, diagramElement);
        } else {
            graphDisplay.setGraph(graph)
        }
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
    const nodes = Array.from(Array(divisor()).keys())
    
    const edges = nodes.map(val => (val * 10) % divisor())
    nodes.forEach(node => {
        graph.addNode(node, {label: node.toString(), x:node, y: node, size: 10 })
    });

    for (let index = 0; index < divisor(); index++){
        graph.addDirectedEdge(index, (index * 10) % divisor(), {type: "arrow", size: 3})
    };
    circular.assign(graph, {scale: 100});

    return graph;
}
export default Diagram;