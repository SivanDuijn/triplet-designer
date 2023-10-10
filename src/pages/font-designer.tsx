import clsx from "clsx";
import Head from "next/head";
import { useCallback, useState } from "react";
import { MemoizedFontCharacterEditor } from "src/components/FontCharacterEditor";
import { MemoizedFontCharacterViewer } from "src/components/FontCharacterViewer";

const gridSize = 14;

export default function FontDesigner() {
    const [showGridLines, setShowGridLines] = useState(true);

    const [characters, setCharacters] = useState(createEmptyFont());
    const [selectedCharacter, setSelectedCharacter] = useState<PossibleCharacters>("A");

    const onCharacterUpdate = useCallback(() => {
        setCharacters({
            ...characters,
            [selectedCharacter]: [...characters[selectedCharacter]],
        });
    }, [selectedCharacter, characters]);

    return (
        <div className={clsx("flex", "h-full", "px-2", "pt-2", "justify-center")}>
            <Head>
                <title>Font Designer</title>
            </Head>
            <div className={clsx("flex", "flex-col", "items-center", "max-w-[70rem]")}>
                <p className={clsx("text-xl")}>{selectedCharacter}</p>
                <div className={clsx("grid", "grid-cols-3")}>
                    <div />
                    <MemoizedFontCharacterEditor
                        className={clsx("w-60", "border", "border-gray-600")}
                        gridLines={showGridLines}
                        gridSize={gridSize}
                        characterName={selectedCharacter}
                        character={characters[selectedCharacter]}
                        onUpdate={onCharacterUpdate}
                    />
                    <div className={clsx("ml-4")}>
                        <input
                            type="checkbox"
                            id="gridLines"
                            onChange={(e) => setShowGridLines(e.currentTarget.checked)}
                            checked={showGridLines}
                        />
                        <label htmlFor="gridLines" className={clsx("ml-2", "font-bold")}>
                            Grid lines
                        </label>
                    </div>
                </div>
                <div className={clsx("flex", "flex-wrap", "mt-4")}>
                    {Object.entries(characters).map(([cn, c]) => (
                        <div
                            key={cn}
                            onClick={() => setSelectedCharacter(cn as PossibleCharacters)}
                        >
                            <MemoizedFontCharacterViewer
                                placeholder={cn}
                                className={clsx("w-24", "m-1", "cursor-pointer")}
                                character={c}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const emptyCharacter = (): number[][] =>
    Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => 0));

const allCharacters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
] as const;

type PossibleCharacters = typeof allCharacters[number];

const createEmptyFont = () => ({
    A: emptyCharacter(),
    B: emptyCharacter(),
    C: emptyCharacter(),
    D: emptyCharacter(),
    E: emptyCharacter(),
    F: emptyCharacter(),
    G: emptyCharacter(),
    H: emptyCharacter(),
    I: emptyCharacter(),
    J: emptyCharacter(),
    K: emptyCharacter(),
    L: emptyCharacter(),
    M: emptyCharacter(),
    N: emptyCharacter(),
    O: emptyCharacter(),
    P: emptyCharacter(),
    Q: emptyCharacter(),
    R: emptyCharacter(),
    S: emptyCharacter(),
    T: emptyCharacter(),
    U: emptyCharacter(),
    V: emptyCharacter(),
    W: emptyCharacter(),
    X: emptyCharacter(),
    Y: emptyCharacter(),
    Z: emptyCharacter(),
});
