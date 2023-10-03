import { createContext, ReactElement, useReducer, Dispatch } from "react";
import { GridActions, GridState, gridReducer } from "./reducer";

const initGridSize = 5;
export function getPlaneGrid(gridSize: number) {
    return {
        leftPlaneGrid: Array(gridSize)
            .fill([])
            .map(() => Array(gridSize).fill(false)),
        rightPlaneGrid: Array(gridSize)
            .fill([])
            .map(() => Array(gridSize).fill(false)),
        bottomPlaneGrid: Array(gridSize)
            .fill([])
            .map(() => Array(gridSize).fill(false)),
    };
}

const initialState: GridState = {
    gridSize: initGridSize,
    ...getPlaneGrid(initGridSize),
};

export const GridContext = createContext<{
    state: GridState;
    dispatch: Dispatch<GridActions>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const GridProvider = ({ children }: { children: ReactElement }) => {
    const [state, dispatch] = useReducer(gridReducer, initialState);

    return <GridContext.Provider value={{ state, dispatch }}>{children}</GridContext.Provider>;
};
