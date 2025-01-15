import React from "react";
import Header from "../Header/Header.tsx";
import Button from "../Button/Button.tsx";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
import MultiStepForm from '../MultiStepForm/MultiStepForm.tsx'
import './FormPage.css'
import { useState } from "react";
import DropDowm from "../DropDown/DropDown.tsx";
import FormHeader from '../FormHeader/FormHeader.tsx'
export const FormPage = () =>{
    const [selectedDomain, setSelectedDomain] = useState<string>("Impact");
     interface Option{
        id: number; 
        value: string; 
    }
    const handleSubmit = () => {
        console.log("Submit fetch");
    }; 

    const handleClear = () => {
        console.log("Clear form");
    }; 

    const impactOpt: Option[] = [
        { id:1, value: "Very High"},
        { id:2, value: "High" },
        { id:3, value: "Meduim Impact" },
        { id:4, value: "Low" },
        { id:4, value: "Very Low" }
      ];

      const domain: Option[]=[
        {id:1, value:"Impact"},
        {id:2, value: "Capabilty"},
        {id:3, value: "Model Type & Risk"}
      ]
    
      const handleDomainChange = (value: string) => {
        console.log("Selected Domain:", value); // You can use this value for further logic
        setSelectedDomain(value);
      };

    return (
        <>
            <div className="container">
                <Header/>
                <div className="title">
                    AML modle From
                    <div className="sub-title">Fill in the correct & accurate informtion of your model for best solution</div>
                </div>

                <div className="header">
                
                <div className="header-item">
                     <DropDowm options={domain} onSelect={handleDomainChange} title={"Domain"}/>
                 </div>

                </div>

                 {selectedDomain && <MultiStepForm domain={selectedDomain}/> }

            
                <div className="button-container">
                    <div className="submit-clear-buttons">
                        <Button text="Submit Form" bgColor="submit-color" color="black-color" onClick={handleSubmit} Icon={SendRoundedIcon} ></Button>
                    </div>
                     <div className="submit-clear-buttons">
                        <Button text="Clear Form" bgColor="clear-color" color="black-color" onClick={handleClear} Icon={CancelScheduleSendRoundedIcon}></Button>
                    </div>
                </div>

            </div>
        </>
    )

}

export default FormPage; 