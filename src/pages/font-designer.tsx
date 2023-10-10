import clsx from "clsx";
import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import { MemoizedFontCharacterEditor } from "src/components/FontCharacterEditor";
import { MemoizedFontCharacterViewer } from "src/components/FontCharacterViewer";

const gridSize = 14;

export default function FontDesigner() {
    const [characters, setCharacters] = useState(createEmptyFont());
    const [selectedCharacter, setSelectedCharacter] = useState<PossibleCharacters>("A");

    const onCharacterUpdate = useCallback(() => {
        setCharacters({
            ...characters,
            [selectedCharacter]: [...characters[selectedCharacter]],
        });
    }, [selectedCharacter, characters]);

    const exportCharacters = useCallback(() => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(characters),
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "characters.json";

        link.click();
    }, [characters]);

    const importButtonClicked = useCallback(() => {
        importInputRef.current?.click();
    }, []);

    const importInputRef = useRef<HTMLInputElement>(null);
    const importCharacters = useCallback(() => {
        if (!importInputRef.current?.files) return;
        const file = importInputRef.current.files[0];
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const json = e.target?.result;
            if (typeof json != "string") return;
            const chars = JSON.parse(json);
            if (chars) setCharacters(chars);
        };
        fileReader.readAsText(file, "UTF-8");
    }, []);

    return (
        <div className={clsx("flex", "h-full", "px-2", "pt-2", "justify-center")}>
            <Head>
                <title>Font Designer</title>
            </Head>
            <div className={clsx("flex", "flex-col", "items-center", "max-w-[70rem]")}>
                <MemoizedFontCharacterEditor
                    gridSize={gridSize}
                    characterName={selectedCharacter}
                    character={characters[selectedCharacter]}
                    onUpdate={onCharacterUpdate}
                />
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
                <button
                    className={clsx(
                        "mt-6",
                        "px-2",
                        "py-1",
                        "rounded",
                        "bg-[#002000]",
                        "hover:bg-[#003000]",
                        "active:bg-[#004000]",
                        "border",
                        "border-gray-500",
                    )}
                    onClick={exportCharacters}
                >
                    Export
                </button>
                <input
                    type="file"
                    id="file"
                    ref={importInputRef}
                    style={{ display: "none" }}
                    accept="application/JSON"
                    onChange={importCharacters}
                />
                <button
                    className={clsx(
                        "mt-6",
                        "px-2",
                        "py-1",
                        "rounded",
                        "bg-[#002000]",
                        "hover:bg-[#003000]",
                        "active:bg-[#004000]",
                        "border",
                        "border-gray-500",
                    )}
                    onClick={importButtonClicked}
                >
                    Import
                </button>
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
