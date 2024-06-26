import { createSignal, type Accessor, type Setter } from "solid-js";
import Diagram from "./diagram";

interface IControlsProps {
    divisor: Accessor<number>,
    setDivisor: Setter<number>
}

/**
 * The clock diagram
 * @returns The clock diagram
 */
function Clock() {
    const [divisor, setDivisor] = createSignal(2);
    
    return <div id="ClockDiagram">
        <Controls divisor={divisor} setDivisor={setDivisor}/>
        <Diagram divisor={divisor}/>
    </div>

}

/**
 * The controls for the diagram
 * @param param0 The parameters for the prop
 * @returns The controls for the graph
 */
function Controls({divisor, setDivisor}: IControlsProps){
    /**
     * Tries to validate and update the input
     * @param input The text to validate
     */
    function ValidateTextInput(input: string){
        const numericInput = Number(input);
        if (Number.isNaN(numericInput)) {
            setDivisor(divisor);
            return;
        }

        const roundedNumber = Math.round(numericInput);
        setDivisor(Math.max(roundedNumber, 2));
    }

    return <div id="controls">
        <label>divisor: </label>
        <input class="rightText" type="numeric" onChange={(e) => ValidateTextInput(e.target.value)} value={divisor()}/>
    </div>
}

export default Clock;