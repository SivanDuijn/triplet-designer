import { createContext, ReactElement, useReducer, Dispatch } from "react";
import { GridActions, GridState, gridReducer } from "./reducer";

const initGridSize = 5;
const leftPlaneGrid = Array(initGridSize)
    .fill([])
    .map(() => Array(initGridSize).fill(false));
const rightPlaneGrid = Array(initGridSize)
    .fill([])
    .map(() => Array(initGridSize).fill(false));
const bottomPlaneGrid = Array(initGridSize)
    .fill([])
    .map(() => Array(initGridSize).fill(false));

const initialState: GridState = {
    gridSize: initGridSize,
    leftPlaneGrid: leftPlaneGrid,
    rightPlaneGrid: rightPlaneGrid,
    bottomPlaneGrid: bottomPlaneGrid,
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
