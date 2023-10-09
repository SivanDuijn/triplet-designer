import clsx from "clsx";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useMouseIsDown, useMouseIsEnablingCells } from "src/lib/MouseContext";

export type SVGPixelCellProps = {
    i: number;
    j: number;
    cellSize: number;
    value: number;
    onChange: (value: number) => void;
    allowHalfCells?: boolean;
    padding?: boolean;
};
export function SVGPixelCell(props: SVGPixelCellProps) {
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

    const padding = props.padding ? 1 : 0;

    const getClassName = useCallback(
        (areaIndex: number, hovering: boolean) =>
            clsx(
                value === areaIndex
                    ? "fill-slate-300"
                    : hovering
                    ? "fill-slate-300"
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
                width={cellSize - padding}
                height={cellSize - padding}
            />
            <rect
                className={getClassName(1, hoveringMiddle)}
                x={x}
                y={y}
                width={cellSize - padding}
                height={cellSize - padding}
            />

            {props.allowHalfCells && (
                <>
                    <path
                        d={`M ${x} ${y} 
                    V ${y + cellSize - padding} 
                    L ${x + cellSize - padding} ${y}
                    H ${x}`}
                        className={getClassName(2, hoveringTopLeft)}
                    />
                    <path
                        d={`M ${x + cellSize - padding} ${y} 
                    V ${y + cellSize - padding} 
                    L ${x} ${y}
                    H ${x + cellSize - padding}`}
                        className={getClassName(3, hoveringTopRight)}
                    />
                    <path
                        d={`M ${x + cellSize - padding} ${y + cellSize - padding} 
                    V ${y} 
                    L ${x} ${y + cellSize - padding}
                    H ${x + cellSize - padding}`}
                        className={getClassName(4, hoveringBottomRight)}
                    />
                    <path
                        d={`M ${x} ${y + cellSize - padding} 
                    V ${y} 
                    L ${x + cellSize - padding} ${y + cellSize - padding}
                    H ${x}`}
                        className={getClassName(5, hoveringBottomLeft)}
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
                        d={`M ${x + cellSize - padding} ${y} 
                    V ${y + cellSize * 0.33} 
                    L ${x + cellSize * 0.66 - padding} ${y}
                    H ${x + cellSize - padding}`}
                        className={clsx("fill-transparent")}
                        {...getMouseEvents(3, setHoveringTopRight)}
                    />
                    <path
                        d={`M ${x + cellSize - padding} ${y + cellSize - padding} 
                    V ${y + cellSize * 0.66 - padding} 
                    L ${x + cellSize * 0.66 - padding} ${y + cellSize - padding}
                    H ${x + cellSize - padding}`}
                        className={clsx("fill-transparent")}
                        {...getMouseEvents(4, setHoveringBottomRight)}
                    />
                    <path
                        d={`M ${x} ${y + cellSize - padding} 
                    V ${y + cellSize * 0.66 - padding} 
                    L ${x + cellSize * 0.33} ${y + cellSize - padding} 
                    H ${x}`}
                        className={clsx("fill-transparent")}
                        {...getMouseEvents(5, setHoveringBottomLeft)}
                    />
                </>
            )}

            {props.allowHalfCells ? (
                <path
                    d={`M ${x + cellSize * 0.33} ${y} 
                    H ${x + cellSize * 0.66 - padding}
                    L ${x + cellSize - padding} ${y + cellSize * 0.33}
                    V ${y + cellSize * 0.66 - padding}
                    L ${x + cellSize * 0.66 - padding} ${y + cellSize - padding}
                    H ${x + cellSize * 0.33}
                    L ${x} ${y + cellSize * 0.66 - padding}
                    V ${y + cellSize * 0.33}
                    L ${x + cellSize * 0.33} ${y} `}
                    className={clsx("fill-transparent")}
                    {...getMouseEvents(1, setHoveringMiddle)}
                />
            ) : (
                <rect
                    className={clsx("fill-transparent")}
                    x={x}
                    y={y}
                    width={cellSize - padding}
                    height={cellSize - padding}
                    {...getMouseEvents(1, setHoveringMiddle)}
                />
            )}
        </g>
    );
}
