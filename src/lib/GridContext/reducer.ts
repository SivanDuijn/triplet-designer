export interface GridState {
    gridSize: number;
    leftPlaneGrid: number[][];
    rightPlaneGrid: number[][];
    bottomPlaneGrid: number[][];
}

// Actions:
export enum GridActionKind {
    ChangePlaneGrid,
    ChangeGridSize,
}

export interface ChangePlaneGridAction {
    type: GridActionKind.ChangePlaneGrid;
    payload: { plane: "left" | "right" | "bottom"; i: number; j: number; value: number };
}
export interface ChangeGridSizeAction {
    type: GridActionKind.ChangeGridSize;
    payload: GridState["gridSize"];
}
//

export type GridActions = ChangePlaneGridAction | ChangeGridSizeAction;

export function gridReducer(state: GridState, action: GridActions) {
    const { type, payload } = action;
    switch (type) {
        case GridActionKind.ChangePlaneGrid:
            if (payload.plane === "left") state.leftPlaneGrid[payload.i][payload.j] = payload.value;
            else if (payload.plane === "right")
                state.rightPlaneGrid[payload.i][payload.j] = payload.value;
            else if (payload.plane === "bottom")
                state.bottomPlaneGrid[payload.i][payload.j] = payload.value;

            return { ...state, leftPlaneGrid: [...state.leftPlaneGrid] };
        case GridActionKind.ChangeGridSize:
            return {
                ...state,
                gridSize: payload,
            };
        default:
            return state;
    }
}
