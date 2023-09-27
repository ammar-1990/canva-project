import { useState, ChangeEvent, useRef, useEffect } from "react";
import { FaShapes } from "react-icons/fa";
import { PiTextT } from "react-icons/pi";
import { BsImages } from "react-icons/bs";
import Button from "./components/Button";
import OptionSide from "./components/OptionSide";
import { ShapeComponent } from "../types";
import TheComponent from "./components/TheComponent";
import ComponentOptions from "./components/ComponentOptions";

function App() {
  type stateType = "shape" | "image" | "text";

  const canvasDivRef = useRef<HTMLDivElement | null>(null);

  const [type, setType] = useState<stateType>("shape");
  const [images, setImages] = useState<string[] | []>([]);
  const [components, setComponents] = useState<ShapeComponent[] | []>([]);
  const [selectedComponent, setSelectedComponent] = useState<ShapeComponent | null  >(null)


  const handleShapeDrag = (e: React.MouseEvent<HTMLDivElement>, shape: ShapeComponent) => {
    e.preventDefault();
    console.log('work')
    
    const initialX = e.clientX;
    const initialY = e.clientY;
    const shapeIndex = components.findIndex((s) => s.id === shape.id);

    const handleMouseMove = (event: MouseEvent) => {
      const dx = event.clientX - initialX;
      const dy = event.clientY - initialY;
      console.log('move')

      setComponents((prevShapes) => {
        const updatedShapes = [...prevShapes];
        updatedShapes[shapeIndex] = {
          ...updatedShapes[shapeIndex],
          left: shape.left + dx,
          top: shape.top + dy,
        };

        console.log(updatedShapes[shapeIndex])
        return updatedShapes;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  

  const changeColor = (id:number,color:string)=>{
    const index = components.findIndex(el => el.id === id);
    const newComponents = [...components];
    newComponents[index] = { ...newComponents[index], color: color };
    setComponents(newComponents);
    setSelectedComponent({...newComponents[index],color:color})
  }


  const changeWidth = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const index = components.findIndex(el => el.id === id);
    const newComponents = [...components];
    if(+e.target.value <=0) return
    newComponents[index] = { ...newComponents[index], width: +e.target.value };
  
    setComponents(newComponents);
    setSelectedComponent({...newComponents[index],width:+e.target.value})


  };
  const changeHeight = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const index = components.findIndex(el => el.id === id);
    const newComponents = [...components];
    if(+e.target.value <=0) return
    newComponents[index] = { ...newComponents[index], height: +e.target.value };
    
    setComponents(newComponents);
    setSelectedComponent({...newComponents[index],height:+e.target.value})


  };

  const deleteComponent = (id:number)=>{
    const newComponents = components.filter(el=>el.id !==id)
  
   
   
    setComponents(newComponents)
  }

  const selectComponent = (id:number)=>{
const selected = components.find(el=>el.id===id)
if(selected)
setSelectedComponent(selected)
console.log(selectedComponent)
  }

  const createComponent = (el: ShapeComponent) => {
    setComponents((prev) => [...prev, el]);
    console.log(components);
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
            console.log(images);
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
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
   
    };

   

    canvasDivRef.current?.addEventListener("mousemove", handler);

   

    return () =>{
     
      canvasDivRef.current?.removeEventListener("mousemove", handler);
    }
  
     
  }, []);


  useEffect(()=>{
if(selectedComponent){
  const check = components.find((el)=>el.id===selectedComponent.id)
  if(!check){
    setSelectedComponent(null)
  }
}
 
  },[components,selectedComponent])

console.log(selectedComponent?.id)

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
          </div>

          <OptionSide
            createComponent={createComponent}
            type={type}
            addImages={addImages}
            images={images}
          />
        </div>

        <div
          ref={canvasDivRef}
          className="bg-white flex-1 rounded-md border-2 border-transparent relative hover:border-blue-500"
        >
          {components.map((el) => (
            <TheComponent
            shape={el }
            id={el.id}
              key={el.id}
              name={el.name}
              type={el.type}
              color={el.color}
              height={el.height}
              width={el.width}
              left={el.left}
              top={el.top}
              deleteComponent={deleteComponent}
              selectComponent={selectComponent}
              selectedId={selectedComponent?.id}
              handleShapeDrag={handleShapeDrag}
          

              
            />
          ))}
        </div>
      </div>
      {selectedComponent !==null   && <ComponentOptions changeColor={changeColor} changeHeight={changeHeight} changeWidth={changeWidth} selected={selectedComponent} />}
    </div>
  );
}

export default App;
