
export type ShapeComponent ={
    id:number,
    type:'shape' | 'image' | 'text',
    name?:'rect' | 'circle' | 'triangle',
    top:number,
    left:number,
    text?:string
    width:number,
    height:number,
    color:string,
    src?:string,
  
  
  }