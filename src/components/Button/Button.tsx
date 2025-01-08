import React from "react";
import "./Button.css";
interface ButtonProps{
    text: string,
    bgColor:string,
    color:string,
    wBorder?:string,
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({text, bgColor, color, wBorder, onClick}) =>{

    return(
    
        <div className={`button ${bgColor} ${color} ${wBorder}`} onClick={onClick}>
            
        <span>{text}</span>
      </div>
    )

}
export default Button; 