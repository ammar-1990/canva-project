import { RxText } from "react-icons/rx";
import SingleShape from "./SingleShape";
import { ChangeEvent } from "react";
import { ShapeComponent } from "../../types";

type Props = {
  type: string;
  addImages: (e: ChangeEvent<HTMLInputElement>) => void;
  images: string[];
  createComponent: (el: ShapeComponent) => void;
  clearImages:()=>void
};

const OptionSide = ({ type, addImages, images, createComponent,clearImages }: Props) => {
  return (
    <div className="w-2/3 flex flex-col items-center">
      {type === "shape" && (
        <div className=" w-full grid grid-cols-2 p-1  gap-1">
          <SingleShape createComponent={createComponent} shape="rect" />
          <SingleShape createComponent={createComponent} shape="circle" />
          <SingleShape createComponent={createComponent} shape="triangle" />
        </div>
      )}

      {type === "text" && (
        <div onClick={()=>createComponent({type:'text',color:'black',height:200,width:600,id:Date.now(),left:200,top:200,text:''})} className="cursor-pointer rounded-md  flex flex-col items-center mt-5 p-5  transition text-zinc-200 w-[80%] hover:bg-zinc-300 bg-zinc-600 hover:text-zinc-800">
          <RxText size={50} />
          <p>Add Text</p>
        </div>
      )}

      {type === "image" && (
        <div className="bg-zinc-300 flex flex-col w-full h-full items-center">
          <div className=" grid grid-cols-2 p-1 gap-1 mb-5 scroll overflow-y-auto ">
            {images.map((el, i) => (
              <img
                onClick={() =>
                  createComponent({
                    type: "image",
                    color: "black",
                    height: 200,
                    width: 200,
                    id: Date.now(),
                    left: 10,
                    top: 10,
                    src: el,
                  })
                }
                className="aspect-square object-contain rounded-sm cursor-pointer hover:border-blue-500 border border-transparent"
                src={el}
                key={i}
                alt="uploaded"
              />
            ))}
          </div>
          <div className="mt-auto w-full flex items-center ">
          <label
            htmlFor="image"
            className="w-full mt-auto m-4 px-4 py-1 bg-blue-500 text-white rounded-sm flex items-center justify-center cursor-pointer hover:bg-blue-600 transition"
          >
            Upload Image
          </label>
        
          <input type="file" multiple id="image" hidden onChange={addImages} />
          </div>
       
          <button disabled={!images.length} onClick={clearImages} className="w-[85%] mb-4 px-4 py-1 disabled:bg-zinc-200 disabled:text-zinc-800 bg-rose-500 text-white rounded-sm flex items-center justify-center  hover:bg-rose-600 transition">Clear Images</button>
        </div>
      )}
    </div>
  );
};

export default OptionSide;
