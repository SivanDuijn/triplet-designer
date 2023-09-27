import clsx from "clsx";
import Head from "next/head";
import { useEffect } from "react";
import { ShapePlaneEditor } from "src/components/ShapePlaneEditor";
import { MemoizedViewGLCanvas } from "src/components/ViewGLCanvas/MemoizedViewGLCanvas";
import { useMouseIsDown, useMouseIsEnablingCells } from "src/lib/MouseContext";

export default function HomePage() {
    const { changeMouseIsDown } = useMouseIsDown();
    const { changeMouseIsEnablingCells } = useMouseIsEnablingCells();
    useEffect(() => {
        window.addEventListener("mousedown", () => changeMouseIsDown(true));
        window.addEventListener("mouseup", () => {
            changeMouseIsDown(false);
            changeMouseIsEnablingCells(undefined);
        });
    }, []);

    return (
        <div className={clsx("flex", "flex-col", "h-full", "mx-2", "mt-2")}>
            <Head>
                <title>Trip-Let Designer</title>
            </Head>
            <div className={clsx("flex")}>
                <MemoizedViewGLCanvas
                    className={clsx("border-2", "border-slate-200", "mx-2", "mt-2", "inline-block")}
                />
                <div>
                    <div className={clsx("grid", "grid-cols-3", "mx-2", "mt-2")}>
                        <div className={clsx("flex", "flex-col", "items-center")}>
                            <p className={clsx("text-center", "font-bold")}>Left</p>
                            <ShapePlaneEditor
                                className={clsx("w-52")}
                                onChange={() => 0}
                                plane="left"
                            />
                        </div>
                        <div className={clsx("w-56")} />
                        <div className={clsx("flex", "flex-col", "items-center")}>
                            <p className={clsx("text-center", "font-bold")}>Right</p>
                            <ShapePlaneEditor
                                className={clsx("w-52")}
                                onChange={() => 0}
                                plane="right"
                            />
                        </div>
                        <div />
                        <div className={clsx("flex", "flex-col", "items-center")}>
                            <p className={clsx("text-center", "font-bold")}>Bottom</p>
                            <ShapePlaneEditor
                                className={clsx("w-52")}
                                onChange={() => 0}
                                plane="bottom"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
