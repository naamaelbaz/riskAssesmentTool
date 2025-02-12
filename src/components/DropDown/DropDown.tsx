import React from "react";
import './DropDown.css';
import { useState } from "react";
interface Option{
    id:number;
    value:string; 
    
}
interface DropDownProps{
    options: Option[];
    onSelect: (value: string) => void;
    title:string 
  }
const DropDowm: React.FC<DropDownProps> = ({ options,onSelect, title }) =>{

 
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
    }

    const handleOptionClick=(option: Option)=>{
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option.value)
    }
    return (
        <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
             {selectedOption ? selectedOption.value : `${title}`}
            <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>▼</span>
            </div>
            <div>
            {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.id}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option.value} 
            </div>
          ))}
        </div>
      )}

            </div>     
      </div>
      
    
    )
}

export default DropDowm; 