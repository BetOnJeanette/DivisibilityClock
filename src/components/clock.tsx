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

        UpdateNumericInput(numericInput);
    }
    /**
     * Updates the divisor based on the numeric input
     * @param input The number to update with
     */
    function UpdateNumericInput(input: number){
        const roundedNumber = Math.round(input);
        setDivisor(Math.max(roundedNumber, 2));
    }

    return <div>
        <button class="divisorButtons" onClick={() => UpdateNumericInput(divisor() - 1)}>-</button>
        <input type="numeric" onChange={(e) => ValidateTextInput(e.target.value)} value={divisor()}/>
        <button class="divisorButtons" onClick={() => UpdateNumericInput(divisor() + 1)}>+</button>
    </div>
}

export default Clock;