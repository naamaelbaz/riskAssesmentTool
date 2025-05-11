import React, { useEffect } from "react";
import './DropDown.css';
import { useState } from "react";
interface Option{
    id:number;
    value:string; 
    
}
interface DropDownProps{
    options: Option[];
    onSelect: (value: string[]) => void;
    title:string;
    selVal: string | string[];
    multiSelect?: boolean;
  }
const DropDowm: React.FC<DropDownProps> = ({ options,onSelect, title,selVal,multiSelect=false }) =>{

 
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [searchTerm,setSearchTerm] = useState<string>('');
    const [filteredOptions, setFilteredOp] = useState<Option[]>(options);
    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
        setSearchTerm('');
    }

    useEffect(()=>{
      const filtered = options.filter(option=>
        option.value.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
      setFilteredOp(filtered); 
    },[searchTerm,options]);

    const handleOptionClick=(option: Option)=>{
      console.log(multiSelect, "nulti")
      if(multiSelect){
        const isSelected = selectedOptions.some((o)=>o.id === option.id);
        let updatedOptions; 
        if (isSelected){
          updatedOptions = selectedOptions.filter((o)=>o.id!==option.id); 
        } else{
          updatedOptions = [...selectedOptions,option]
        }
        // setIsOpen(false)
        setSelectedOptions(updatedOptions);
        console.log(selectedOptions,"UQ>>>>>>")
        console.log("selVal", selVal);
        onSelect(updatedOptions.map((o)=>o.value));

      }else
        setSelectedOptions([option]);
        onSelect([option.value])
        setIsOpen(true);
    }
    console.log("selected", selectedOptions)
    return (
        <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
             <div className={selVal ? "selected-font": ''}>{ selVal ? selVal : `${title}`}</div>
            <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>▼</span>
            </div>
            <div>
            {isOpen && (
        <div className="dropdown-menu">
        <input
            type="text"
            className="dropdown-search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="dropdown-item"
                onClick={() => handleOptionClick(option)}
              >
                 {multiSelect && (
                <input
                  type="checkbox"
                  checked={selectedOptions.some((o) => o.id === option.id)}
                  readOnly
                />
                 )
                 }
              {option.value} 
            </div>
          ))
          ): ( <div>No options found</div>)
        }
        </div>
      )}

            </div>     
      </div>
      
    
    )
}

export default DropDowm; 