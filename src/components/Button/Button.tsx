import React, { ReactElement } from "react";
import "./Button.css";
interface ButtonProps{
    text: string,
    bgColor?:string,
    color:string,
    wBorder?:string,
    onClick?: () => void,
    Icon?: React.ElementType | undefined
}

const Button: React.FC<ButtonProps> = ({text, bgColor, color, wBorder, onClick, Icon}) =>{

    return(
    
        <div className={`button ${bgColor} ${color} ${wBorder}`} onClick={onClick}>
        <div className="text-icon">
        <span className="button-text">{text}</span>
        {Icon ? <Icon  className='button-icon'/> : null }
        </div>
      </div>
    )

}
export default Button; 