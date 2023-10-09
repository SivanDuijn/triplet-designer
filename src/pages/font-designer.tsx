import clsx from "clsx";
import Head from "next/head";
import { useEffect } from "react";
import { FontCharacterEditor } from "src/components/FontCharacterEditor";
import { useMouseIsDown } from "src/lib/MouseContext";

export default function FontDesigner() {
    const { changeMouseIsDown } = useMouseIsDown();
    useEffect(() => {
        window.addEventListener("mousedown", () => changeMouseIsDown(true));
        window.addEventListener("mouseup", () => changeMouseIsDown(false));
    }, []);

    return (
        <div className={clsx("flex", "justify-center", "h-full", "px-2", "pt-2")}>
            <Head>
                <title>Font Designer</title>
            </Head>
            <div className={clsx("flex", "flex-col", "items-center")}>
                <div className={clsx("flex")}>
                    <FontCharacterEditor className={clsx("w-60")} />
                </div>
                <div className={clsx("border-2", "border-slate-200", "mt-4", "p-4")}>
                    <div className={clsx("max-w-[6rem]")}>
                        <label
                            htmlFor="first_name"
                            className="block text-md text-gray-900 dark:text-white font-bold"
                        >
                            Grid size
                        </label>
                        <input
                            type="number"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={5}
                            // onChange={}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
