import React from "react";
import "./Button.css";
interface ButtonProps{
    text: string,
    bgColor:string,
    color:string,
    wBorder?:string,
}

const Button: React.FC<ButtonProps> = ({text, bgColor, color, wBorder}) =>{

    return(
    
        <div className={`button ${bgColor} ${color} ${wBorder}`}>
        <span>{text}</span>
      </div>
    )

}
export default Button; 