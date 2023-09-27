
export type ShapeComponent ={
    id:number,
    type:'shape' | 'image' | 'text',
    name?:'rect' | 'circle' | 'triangle',
    top:number,
    left:number,
    width:number,
    height:number,
    color:string
  
  }