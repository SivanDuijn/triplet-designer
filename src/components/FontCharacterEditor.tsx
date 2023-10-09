import clsx from "clsx";
import { useState } from "react";
import { SVGPixelCell } from "./PixelCell";

export type FontCharacterEditorProps = {
    className?: string;
};

export const FontCharacterEditor = (props: FontCharacterEditorProps) => {
    const gridSize = 14;
    const cellSize = 100 / gridSize;

    const [character, setCharacter] = useState<number[][]>(
        Array(gridSize)
            .fill([])
            .map(() => Array(gridSize).fill(0)),
    );

    return (
        <div className={props.className}>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                role="img"
                className={clsx("hover:cursor-pointer")}
            >
                {character.map((rows, i) =>
                    rows.map((value, j) => (
                        <SVGPixelCell
                            key={i * gridSize + j}
                            cellSize={cellSize}
                            i={i}
                            j={j}
                            value={value}
                            onChange={(value) => {
                                const newCharacter = [...character];
                                newCharacter[i][j] = value;
                                setCharacter([...newCharacter]);
                            }}
                        />
                    )),
                )}
            </svg>
        </div>
    );
};
