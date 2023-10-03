import { TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useGridSize, usePlaneGrid } from "src/lib/GridContext/hooks";
import { useMouseIsDown, useMouseIsEnablingCells } from "src/lib/MouseContext";

export type ShapePlaneEditorProps = {
    className?: string;
    plane: "left" | "right" | "bottom";
    onChange: (grid: boolean[][]) => void;
};

export const ShapePlaneEditor = (props: ShapePlaneEditorProps) => {
    const { gridSize } = useGridSize();
    const cellSize = 100 / gridSize;
    const { planeGrid, changePlaneGrid } = usePlaneGrid(props.plane);

    return (
        <div className={props.className}>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                role="img"
                className={clsx("hover:cursor-pointer")}
            >
                {planeGrid.map((rows, i) =>
                    rows.map((value, j) => (
                        <Cell
                            key={i * gridSize + j}
                            cellSize={cellSize}
                            i={i}
                            j={j}
                            value={value}
                            onChange={(value) => changePlaneGrid({ i, j, value })}
                        />
                    )),
                )}
            </svg>
            {/* <TrashIcon className={clsx("w-6")} /> */}
        </div>
    );
};

type CellProps = {
    i: number;
    j: number;
    cellSize: number;
    value: number;
    onChange: (value: number) => void;
};
function Cell(props: CellProps) {
    const { i, j, cellSize, value, onChange } = props;
    const { mouseIsDown } = useMouseIsDown();
    const { mouseIsEnablingCells, changeMouseIsEnablingCells } = useMouseIsEnablingCells();
    const [hoveringMiddle, setHoveringMiddle] = useState(false);
    const [hoveringTopRight, setHoveringTopRight] = useState(false);
    const [hoveringTopLeft, setHoveringTopLeft] = useState(false);
    const [hoveringBottomRight, setHoveringBottomRight] = useState(false);
    const [hoveringBottomLeft, setHoveringBottomLeft] = useState(false);

    const x = cellSize * i;
    const y = cellSize * j;

    const getClassName = useCallback(
        (areaIndex: number, hovering: boolean) =>
            clsx(
                value === areaIndex
                    ? "fill-slate-400"
                    : hovering
                    ? "fill-slate-400"
                    : "fill-slate-700",
                hovering ? "opacity-100" : value === areaIndex ? "opacity-60" : "opacity-0",
            ),
        [value],
    );

    const getMouseEvents = useCallback(
        (areaIndex: number, setHovering: Dispatch<SetStateAction<boolean>>) => ({
            onMouseDown: () => {
                changeMouseIsEnablingCells(value === areaIndex ? false : true);
                onChange(value === areaIndex ? 0 : areaIndex);
            },
            onMouseEnter: () => {
                setHovering(true);
                if (mouseIsDown)
                    if (mouseIsEnablingCells) onChange(1);
                    else onChange(0);
            },
            onMouseLeave: () => setHovering(false),
        }),
        [mouseIsDown, mouseIsEnablingCells],
    );

    return (
        <g>
            <rect
                className={clsx("fill-slate-700", "opacity-60")}
                x={x}
                y={y}
                width={cellSize - 1}
                height={cellSize - 1}
            />
            <rect
                className={getClassName(1, hoveringMiddle)}
                x={x}
                y={y}
                width={cellSize - 1}
                height={cellSize - 1}
            />
            <path
                d={`M ${x} ${y} 
                    V ${y + cellSize - 1} 
                    L ${x + cellSize - 1} ${y}
                    H ${x}`}
                className={getClassName(2, hoveringTopLeft)}
            />
            <path
                d={`M ${x + cellSize - 1} ${y} 
                    V ${y + cellSize - 1} 
                    L ${x} ${y}
                    H ${x + cellSize - 1}`}
                className={getClassName(3, hoveringTopRight)}
            />
            <path
                d={`M ${x + cellSize - 1} ${y + cellSize - 1} 
                    V ${y} 
                    L ${x} ${y + cellSize - 1}
                    H ${x + cellSize - 1}`}
                className={getClassName(4, hoveringBottomRight)}
            />
            <path
                d={`M ${x} ${y + cellSize - 1} 
                    V ${y} 
                    L ${x + cellSize - 1} ${y + cellSize - 1}
                    H ${x}`}
                className={getClassName(5, hoveringBottomLeft)}
            />

            <path
                d={`M ${x + cellSize * 0.33} ${y} 
                    H ${x + cellSize * 0.66 - 1}
                    L ${x + cellSize - 1} ${y + cellSize * 0.33}
                    V ${y + cellSize * 0.66 - 1}
                    L ${x + cellSize * 0.66 - 1} ${y + cellSize - 1}
                    H ${x + cellSize * 0.33}
                    L ${x} ${y + cellSize * 0.66 - 1}
                    V ${y + cellSize * 0.33}

                    L ${x + cellSize * 0.33} ${y} `}
                className={clsx("fill-transparent")}
                {...getMouseEvents(1, setHoveringMiddle)}
            />
            <path
                d={`M ${x} ${y} 
                    V ${y + cellSize * 0.33} 
                    L ${x + cellSize * 0.33} ${y}
                    H ${x}`}
                className={clsx("fill-transparent")}
                {...getMouseEvents(2, setHoveringTopLeft)}
            />
            <path
                d={`M ${x + cellSize - 1} ${y} 
                    V ${y + cellSize * 0.33} 
                    L ${x + cellSize * 0.66 - 1} ${y}
                    H ${x + cellSize - 1}`}
                className={clsx("fill-transparent")}
                {...getMouseEvents(3, setHoveringTopRight)}
            />
            <path
                d={`M ${x + cellSize - 1} ${y + cellSize - 1} 
                    V ${y + cellSize * 0.66 - 1} 
                    L ${x + cellSize * 0.66 - 1} ${y + cellSize - 1}
                    H ${x + cellSize - 1}`}
                className={clsx("fill-transparent")}
                {...getMouseEvents(4, setHoveringBottomRight)}
            />
            <path
                d={`M ${x} ${y + cellSize - 1} 
                    V ${y + cellSize * 0.66 - 1} 
                    L ${x + cellSize * 0.33} ${y + cellSize - 1} 
                    H ${x}`}
                className={clsx("fill-transparent")}
                {...getMouseEvents(5, setHoveringBottomLeft)}
            />
        </g>
    );
}
