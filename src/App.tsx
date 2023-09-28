import { useState, ChangeEvent, useEffect } from "react";
import { FaShapes } from "react-icons/fa";
import { PiTextT } from "react-icons/pi";
import { BsFillEraserFill } from "react-icons/bs";
import { IoLayersSharp } from "react-icons/io5";
import { BsImages } from "react-icons/bs";
import Button from "./components/Button";
import OptionSide from "./components/OptionSide";
import { ShapeComponent } from "../types";
import TheComponent from "./components/TheComponent";
import ComponentOptions from "./components/ComponentOptions";


function App() {
  type stateType = "shape" | "image" | "text" | "components";

  const [type, setType] = useState<stateType>("shape");
  const [images, setImages] = useState<string[] | []>([]);
  const [components, setComponents] = useState<ShapeComponent[] | []>([]);
  const [selectedComponent, setSelectedComponent] =
    useState<ShapeComponent | null>(null);

  const [resizing, setResizing] = useState(false);
  const [prevMouseX, setPrevMouseX] = useState(0);
  const [prevMouseY, setPrevMouseY] = useState(0);
  const [copy, setCopy] = useState<ShapeComponent | null>(null)

  const clearImages = ()=>{
    setImages([])
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setResizing(true);
    setPrevMouseX(e.clientX);
    setPrevMouseY(e.clientY);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    shape: ShapeComponent,
    width: number,
    height: number
  ) => {
    if (!resizing) return;

    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;

    const updatedWidth = width + dx;
    const updatedHeight = height + dy;

    if (updatedWidth > 0 && updatedHeight > 0) {
      shape.width = updatedWidth;
      shape.height = updatedHeight;
      // Update the component's shape state or perform any necessary actions
      const index = components.findIndex((el) => el.id === shape.id);
      const newComponents = [...components];
      newComponents[index] = shape;
      setComponents(newComponents);
    }

    setPrevMouseX(e.clientX);
    setPrevMouseY(e.clientY);
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  const copyComponent = (el:ShapeComponent)=>{
    setCopy(el)
  }

  const changeText = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const index = components.findIndex((el) => el.id === id);
    const newComponents = [...components];

    newComponents[index] = { ...newComponents[index], text: e.target.value };

    setComponents(newComponents);
  };

  const handleShapeDrag = (
    e: React.MouseEvent<HTMLDivElement>,
    shape: ShapeComponent,
    image: boolean
  ) => {
    if (image === true) {
      e.preventDefault();
    }

    const initialX = e.clientX;
    const initialY = e.clientY;
    const shapeIndex = components.findIndex((s) => s.id === shape.id);

    const handleMouseMove = (event: MouseEvent) => {
      const dx = event.clientX - initialX;
      const dy = event.clientY - initialY;
   

      setComponents((prevShapes) => {
        const updatedShapes = [...prevShapes];
        updatedShapes[shapeIndex] = {
          ...updatedShapes[shapeIndex],
          left: shape.left + dx,
          top: shape.top + dy,
        };

        return updatedShapes;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const changeColor = (id: number, color: string) => {
    const index = components.findIndex((el) => el.id === id);
    const newComponents = [...components];
    newComponents[index] = { ...newComponents[index], color: color };
    setComponents(newComponents);
    setSelectedComponent({ ...newComponents[index], color: color });
  };

  const changeWidth = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const index = components.findIndex((el) => el.id === id);
    const newComponents = [...components];
    if (+e.target.value <= 0) return;
    newComponents[index] = { ...newComponents[index], width: +e.target.value };

    setComponents(newComponents);
    setSelectedComponent({ ...newComponents[index], width: +e.target.value });
  };
  const changeHeight = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const index = components.findIndex((el) => el.id === id);
    const newComponents = [...components];
    if (+e.target.value <= 0) return;
    newComponents[index] = { ...newComponents[index], height: +e.target.value };

    setComponents(newComponents);
    setSelectedComponent({ ...newComponents[index], height: +e.target.value });
  };

  const deleteComponent = (id: number) => {
    const newComponents = components.filter((el) => el.id !== id);

    setComponents(newComponents);
  };

  const selectComponent = (id: number) => {
    const selected = components.find((el) => el.id === id);
    if (selected) setSelectedComponent(selected);

  };

  const createComponent = (el: ShapeComponent) => {
    setComponents((prev) => [...prev, el]);
setSelectedComponent(el)
  };

  const addImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imagesArray: string[] = [];
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          const image = e.target?.result as string;
          imagesArray.push(image);

          if (imagesArray.length === files.length) {
            setImages((prev) => [...prev, ...imagesArray]);
           
          }
        };

        reader.readAsDataURL(files[i]);
      }
    }
  };

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
    {
      name: "components",
      Icon: IoLayersSharp,
      onClick: () => setType("components"),
    },
  ];

  useEffect(() => {
    if (selectedComponent) {
      const check = components.find((el) => el.id === selectedComponent.id);
      if (!check) {
        setSelectedComponent(null);
      }
    }
  }, [components, selectedComponent]);


 useEffect(()=>{

  const handleClick = (e:MouseEvent)=>{
    e.stopPropagation()
    const target = e.target as HTMLElement
  
      if(target && target.hasAttribute('data-com')){
setSelectedComponent(null)
      }
    
  }

  document.addEventListener('click',handleClick)

  return ()=>document.removeEventListener('click',handleClick)
 },[])


 useEffect(() => {
  const handleKeyDown = (e:KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'c') {
      
      e.preventDefault()
      if(selectedComponent===null){
        console.log('no')
        setCopy(null)
      }
      else{
        setCopy(selectedComponent)
      }
    
    
    }

    if (e.ctrlKey && e.key === 'v') {
      e.preventDefault()
    
      if(!copy) return null
     
     setComponents(prev=>[...prev,{...copy,id:Date.now(),top:10,left:10}])
    }

    if(e.key==='Delete'){

      if(!selectedComponent) return null
      setComponents(prev=>prev.filter(el=>el.id !== selectedComponent.id))
      setSelectedComponent(null)
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [copy,selectedComponent]);

  return (
    <div className="h-screen w-full bg-zinc-900 flex items-center justify-center">
      <div className="w-[80%] h-[80%] flex gap-x-4  ">
        <div className="bg-zinc-700 w-[300px]  rounded-md flex overflow-hidden">
          <div className="w-1/3 bg-zinc-800 flex flex-col items-center p-1 gap-y-4 justify-evenly">
            {sideBar.map(({ name, Icon, onClick }) => (
              <Button
                key={name}
                name={name}
                Icon={Icon}
                onClick={onClick}
                type={type}
              />
            ))}

            <button
              title="clear canvas"
              disabled={!components.length}
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full disabled:bg-zinc-200 disabled:text-zinc-800 text-lg bg-rose-500 text-white hover:bg-rose-600 transition "
              onClick={() => setComponents([])}
            >
              <BsFillEraserFill />
            </button>
          </div>

          <OptionSide
            createComponent={createComponent}
            type={type}
            addImages={addImages}
            images={images}
            clearImages={clearImages}
            components={components}
            selectComponent={selectComponent}
            selectedId={selectedComponent?.id}
            deleteComponent={deleteComponent}
            copyComponent={copyComponent}
            
          />
        </div>

        <div
        data-com='com'
        className="bg-white flex-1 rounded-md border-2 border-transparent relative hover:border-blue-500 overflow-hidden">
          {components.map((el) => (
            <TheComponent
              shape={el}
              id={el.id}
              key={el.id}
              name={el.name}
              type={el.type}
              src={el.src}
              color={el.color}
              height={el.height}
              width={el.width}
              left={el.left}
              top={el.top}
              deleteComponent={deleteComponent}
              selectComponent={selectComponent}
              selectedId={selectedComponent?.id}
              changeText={changeText}
              handleShapeDrag={handleShapeDrag}
              text={el.text}
              handleMouseDown={handleMouseDown}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              
            />
          ))}
        </div>
      </div>
      {selectedComponent !== null && (
        <ComponentOptions
          changeColor={changeColor}
          changeHeight={changeHeight}
          changeWidth={changeWidth}
          selected={selectedComponent}
        />
      )}
      {
        copy && <div className="flex items-center flex-col gap-1 justify-center fixed right-0 top-[350px] w-[150px]  bg-zinc-600 py-2 px-1 rounded-l-lg">
          <p className="text-white ">Copied</p>
<div className="flex items-center justify-center w-full bg-white p-5 rounded-lg">
            {copy.type === "shape" && (
<div
                  style={{
                    width: `100px`,
                    height: `100px`,
                    backgroundColor: copy.color,
                    clipPath:
                      copy.name === "triangle"
                        ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                        : "",
                  }}
                  className={`${copy.name === "circle" && "rounded-full"}`}
                ></div>
              )}
              {copy.type === "image" && (
                <img
                  src={copy.src}
                  className="w-[100px] h-[100px] object-contain "
                  alt="component"
                />
              )}
              {copy.type === "text" && (
                <p style={{ color: copy.color }}>{copy.text}</p>
              )}
            </div>
            <button onClick={()=>{setComponents(prev=>[...prev,{...copy,id:Date.now(),top:10,left:10}])}} className="bg-blue-500 p-1 rounded-md text-white hover:bg-blue-600 transition">
              Paste to canvas
            </button>
        </div>
      }
    </div>
  );
}

export default App;
