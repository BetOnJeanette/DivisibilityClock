import { createSignal, type Accessor, type Setter } from "solid-js";
import Diagram from "./diagram";

interface IControlsProps {
    divisor: Accessor<number>,
    setDivisor: Setter<number>
}

function Clock() {
    const [divisor, setDivisor] = createSignal(2);
    
    return <>
        <Controls divisor={divisor} setDivisor={setDivisor}/>
        <Diagram divisor={divisor}/>
    </>

}

function Controls({divisor, setDivisor}: IControlsProps){
    return <span>
        <button onClick={() => setDivisor(Math.max(divisor() - 1, 2))}>-</button>
        <p>{divisor()}</p>
        <button onClick={() => setDivisor(divisor() + 1)}>+</button>
    </span>
}

export default Clock;