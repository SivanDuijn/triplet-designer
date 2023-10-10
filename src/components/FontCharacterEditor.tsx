import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import { MemoizedSVGPixelCell } from "./SVGPixelCell";

export type FontCharacterEditorProps = {
    gridSize: number;
    characterName: string;
    character: number[][];
    className?: string;
    gridLines?: boolean;
    onUpdate: () => void;
};

export const MemoizedFontCharacterEditor = memo(FontCharacterEditor);
export function FontCharacterEditor(props: FontCharacterEditorProps) {
    const cellSize = 100 / props.gridSize;

    const [character, setCharacter] = useState<number[][]>([]);
    useEffect(() => setCharacter(props.character), [props.characterName]);

    const mouseIsDownEditing = useRef<boolean>(false);

    return (
        <div className={props.className}>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                role="img"
                className={clsx("hover:cursor-pointer")}
                onMouseUp={() => props.onUpdate()}
                onMouseLeave={(e) => e.buttons == 1 && props.onUpdate()}
            >
                {character.map((rows, i) =>
                    rows.map((value, j) => (
                        <MemoizedSVGPixelCell
                            key={i * props.gridSize + j}
                            cellSize={cellSize}
                            i={i}
                            j={j}
                            value={value}
                            onChange={(v) => {
                                character[i][j] = v;
                                setCharacter([...character]);
                                props.onUpdate();
                            }}
                            onMouseDown={(enabling) => {
                                mouseIsDownEditing.current = enabling;
                            }}
                            onMouseEnter={(mouseIsDown) => {
                                if (mouseIsDown) {
                                    character[i][j] = mouseIsDownEditing.current ? 1 : 0;
                                    setCharacter([...character]);
                                }
                            }}
                        />
                    )),
                )}

                {props.gridLines &&
                    Array(props.gridSize - 1)
                        .fill(0)
                        .map((_, i) => {
                            const offset = (i + 1) * cellSize;
                            return (
                                <g key={i}>
                                    <line
                                        x1={offset}
                                        y1={0}
                                        x2={offset}
                                        y2={100}
                                        stroke="black"
                                        strokeWidth={0.5}
                                    />
                                    <line
                                        x1={0}
                                        y1={offset}
                                        x2={100}
                                        y2={offset}
                                        stroke="black"
                                        strokeWidth={0.5}
                                    />
                                </g>
                            );
                        })}
            </svg>
        </div>
    );
}
