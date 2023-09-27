import React from "react";
import { ShapeComponent } from "../../types";

type Props = {
  shape: "rect" | "circle" | "triangle";
  createComponent: (el: ShapeComponent) => void;
};

const SingleShape = ({ shape, createComponent }: Props) => {
  return (
    <>
      {shape === "rect" && (
        <div
          onClick={() =>
            createComponent({
              id: Date.now(),
              color: "black",
              height: 100,
              width: 100,
              left: 10,
              top: 10,
              type: "shape",
              name: "rect",
            })
          }
          className="flex-1 transition  cursor-pointer hover:bg-zinc-300 group  rounded-md bg-zinc-600 aspect-square flex items-center justify-center"
        >
          <div className="w-1/2 aspect-square bg-zinc-200 rounded-sm  group-hover:bg-zinc-800 transition"></div>
        </div>
      )}

      {shape === "circle" && (
        <div
          onClick={() =>
            createComponent({
              id: Date.now(),
              color: "black",
              height: 100,
              width: 100,
              left: 10,
              top: 10,
              type: "shape",
              name: "circle",
            })
          }
          className="flex-1 transition cursor-pointer hover:bg-zinc-300 group  rounded-md bg-zinc-600 aspect-square flex items-center justify-center"
        >
          <div className="w-1/2 aspect-square bg-zinc-200 rounded-full  group-hover:bg-zinc-800 transition"></div>
        </div>
      )}

      {shape === "triangle" && (
        <div
          onClick={() =>
            createComponent({
              id: Date.now(),
              color: "black",
              height: 100,
              width: 100,
              left: 10,
              top: 10,
              type: "shape",
              name: "triangle",
            })
          }
          className="flex-1 transition cursor-pointer hover:bg-zinc-300 group  rounded-md bg-zinc-600 aspect-square flex items-center justify-center"
        >
          <div
            className="bg-zinc-200 w-1/2 aspect-square group-hover:bg-zinc-800 transition"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          >
            {" "}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleShape;
