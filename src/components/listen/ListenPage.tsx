import type {TestInterface} from "./Listen.types.ts";

export function Test({name}: TestInterface) {
    return (
        <div>{name}</div>
    )
}