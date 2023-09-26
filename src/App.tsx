import { useState } from "react";
import { FaShapes } from "react-icons/fa";
import { PiTextT } from "react-icons/pi";
import { BsImages } from "react-icons/bs";
import { RxText } from "react-icons/rx";

function App() {
  type stateType = "shape" | "image" | "text";

  const [type, setType] = useState<stateType>("shape");

  const sideBar = [
    {
      name: "shape",
      Icon: FaShapes,
      onClick: () => setType("shape"),
    },
    {
      name: "text",
      Icon: PiTextT,
      onClick: () => setType("text"),
    },
    {
      name: "image",
      Icon: BsImages,
      onClick: () => setType("image"),
    },
  ];

  return (
    <div className="h-screen w-full bg-zinc-900 flex items-center justify-center">
      <div className="w-[80%] h-[80%] flex gap-x-4  ">
        <div className="bg-zinc-700 w-[300px]  rounded-md flex overflow-hidden">
          <div className="w-1/3 bg-zinc-800 flex flex-col items-center p-1 gap-y-4 justify-evenly">
            {sideBar.map(({ name, Icon, onClick }) => (
              <button
                onClick={onClick}
                type="button"
                className={`p-2 flex flex-col items-center w-full rounded-md  text-zinc-400 cursor-pointer ${
                  type !== name &&
                  "hover:bg-zinc-300 hover:text-zinc-700 transition"
                }  ${type === name && "bg-zinc-700"} `}
              >
                <Icon />
                <p className="cursor-pointer capitalize">{name}</p>
              </button>
            ))}
          </div>

          <div className="w-2/3 flex flex-col items-center">
            {type === "shape" && (
              <div className=" w-full grid grid-cols-2 p-1  gap-1">
                <div className="flex-1 transition  cursor-pointer hover:bg-zinc-300 group  rounded-md bg-zinc-600 aspect-square flex items-center justify-center">
                  <div className="w-1/2 aspect-square bg-zinc-200 rounded-sm  group-hover:bg-zinc-800 transition"></div>
                </div>

                <div className="flex-1 transition cursor-pointer hover:bg-zinc-300 group  rounded-md bg-zinc-600 aspect-square flex items-center justify-center">
                  <div className="w-1/2 aspect-square bg-zinc-200 rounded-full  group-hover:bg-zinc-800 transition"></div>
                </div>

                <div className="flex-1 transition cursor-pointer hover:bg-zinc-300 group  rounded-md bg-zinc-600 aspect-square flex items-center justify-center">
                  <div
                    className="bg-zinc-200 w-1/2 aspect-square group-hover:bg-zinc-800 transition"
                    style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                  >
                    {" "}
                  </div>
                </div>
              </div>
            )}

            {type === "text" && (
              <div className="cursor-pointer rounded-md  flex flex-col items-center mt-5 p-5  transition text-zinc-200 w-[80%] hover:bg-zinc-300 bg-zinc-600 hover:text-zinc-800">
                <RxText size={50} />
                <p>Add Text</p>
              </div>
            )}

            {type === "image" && <div className="bg-white flex flex-col w-full h-full items-center">
              <div className="flex-1 "></div>
              <label htmlFor="image" 
              className="w-[80%] m-4 px-4 py-1 bg-blue-500 text-white rounded-sm flex items-center justify-center cursor-pointer hover:bg-blue-600 transition">Upload Image</label>
              <input type="file" multiple id="image" hidden />
              </div>}
          </div>
        </div>

        <div className="bg-white flex-1 rounded-md border-2 border-transparent hover:border-blue-500"></div>
      </div>
    </div>
  );
}

export default App;
