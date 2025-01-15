import React, { ReactElement } from "react";
import "./Button.css";
interface ButtonProps{
    text: string,
    bgColor:string,
    color:string,
    wBorder?:string,
    onClick?: () => void,
    Icon?: React.ElementType
}

const Button: React.FC<ButtonProps> = ({text, bgColor, color, wBorder, onClick, Icon}) =>{

    return(
    
        <div className={`button ${bgColor} ${color} ${wBorder}`} onClick={onClick}>
        {Icon}
        <span>{text}</span>
      </div>
    )

}
export default Button; 