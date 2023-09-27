import { FaTrash } from "react-icons/fa";
import { ShapeComponent } from "../../types";

type Props = {
  shape:ShapeComponent
  id: number;
  type: "shape" | "image" | "text";
  src?:string,
  name?: "rect" | "circle" | "triangle";
  top: number;
  left: number;
  text?:string,
  width: number;
  height: number;
  color: string;
  deleteComponent: (id: number) => void;
  selectComponent:(id:number)=>void,
  selectedId?:number,
  handleShapeDrag:(e: React.MouseEvent<HTMLDivElement>, shape: ShapeComponent,image:boolean)=>void,
  changeText:(id:number,e:React.ChangeEvent<HTMLInputElement>)=>void

};

const TheComponent = ({
  shape,
  id,
  type,
  name,
  top,
  left,
  width,
  height,
  color,
  src,
  deleteComponent,
  selectComponent,
  selectedId,
  handleShapeDrag,
  text,
  changeText
  
}: Props) => {
  let theShape;

  if (type === "shape") {
    theShape = name;
  }
console.log(src)

const image= type==='image'? true : false
  return (
    <div
    onMouseDown={(e) => handleShapeDrag(e, shape,image)}
   data-com='com'
      className={` hover:border-blue-500  rounded-sm  border-2 group ${selectedId===id ? 'border-blue-500' : 'border-transparent'}  `}
      style={{ position: "absolute", top:`${top}px`, left:`${left}px`, width:`${width}px`, height:`${height}px` }}
      onClick={()=>selectComponent(id)}
    >
      {theShape && (
        <div
          style={{
            backgroundColor: color,
            clipPath:
              theShape === "triangle"
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : "",
          }}
          className={`w-full h-full ${theShape === "circle" && "rounded-full"}`}
        ></div>
      )}


      {
        
        type==='image' && <img src={src} alt="setImage" className="w-full h-full object-content"  />
      }

      {type==='text' && 
      <input
      type="text"
      style={{color}}
      className="w-full h-full outline-none resize-none text-7xl text-center border-dashed border-2 border-blue-400" value={text} onChange={(e)=>{changeText(id,e)}} />}

      <span
        onClick={() => deleteComponent(id)}
        className=" top-1 left-1 hidden group-hover:flex cursor-pointer w-5 h-5 absolute items-center justify-center text-rose-500"
      >
        <FaTrash />
      </span>
    </div>
  );
};

export default TheComponent;
