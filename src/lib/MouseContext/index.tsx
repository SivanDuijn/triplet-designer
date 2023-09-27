import { Dispatch, ReactElement, createContext, useContext, useReducer } from "react";

export interface MouseState {
    down: boolean;
    enablingCells: boolean | undefined;
}

export enum MouseActionKind {
    ChangeDown,
    ChangeEnablingCells,
}

interface ChangeDownAction {
    type: MouseActionKind.ChangeDown;
    payload: MouseState["down"];
}
interface ChangeEnablingCellsAction {
    type: MouseActionKind.ChangeEnablingCells;
    payload: MouseState["enablingCells"];
}

export type MouseActions = ChangeDownAction | ChangeEnablingCellsAction;

export function mouseReducer(state: MouseState, action: MouseActions) {
    const { type, payload } = action;
    switch (type) {
        case MouseActionKind.ChangeDown:
            return { ...state, down: payload };
        case MouseActionKind.ChangeEnablingCells:
            return { ...state, enablingCells: payload };
        default:
            return state;
    }
}

const initialState: MouseState = {
    down: false,
    enablingCells: undefined,
};

export const MouseContext = createContext<{
    state: MouseState;
    dispatch: Dispatch<MouseActions>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const MouseProvider = ({ children }: { children: ReactElement }) => {
    const [state, dispatch] = useReducer(mouseReducer, initialState);

    return <MouseContext.Provider value={{ state, dispatch }}>{children}</MouseContext.Provider>;
};

export function useMouseIsDown() {
    const { state, dispatch } = useContext(MouseContext);
    const changeMouseIsDown = (value: ChangeDownAction["payload"]) =>
        dispatch({ type: MouseActionKind.ChangeDown, payload: value });
    return { mouseIsDown: state.down, changeMouseIsDown };
}

export function useMouseIsEnablingCells() {
    const { state, dispatch } = useContext(MouseContext);
    const changeMouseIsEnablingCells = (value: ChangeEnablingCellsAction["payload"]) =>
        dispatch({ type: MouseActionKind.ChangeEnablingCells, payload: value });
    return { mouseIsEnablingCells: state.enablingCells, changeMouseIsEnablingCells };
}
