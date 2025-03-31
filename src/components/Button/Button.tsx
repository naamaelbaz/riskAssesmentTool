import React, { ReactElement } from "react";
import "./Button.css";
interface ButtonProps{
    text: string,
    bgColor?:string,
    color:string,
    wBorder?:string,
    onClick?: () => void,
    Icon?: React.ElementType | undefined
    disabled?:boolean; 
}

const Button: React.FC<ButtonProps> = ({text, bgColor, color, wBorder, onClick, Icon, disabled}) =>{

    return(
    
         <div
      className={`button ${bgColor} ${color} ${wBorder} ${disabled ? "disabled" : ""}`}
      onClick={!disabled ? onClick : undefined} // Prevent clicks when disabled
    >
        <div className="text-icon">
        <span className="button-text">{text}</span>
        {Icon ? <Icon  className='button-icon'/> : null }
        </div>
      </div>
    )

}
export default Button; 