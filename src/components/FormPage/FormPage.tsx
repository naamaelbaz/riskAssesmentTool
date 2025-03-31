import React from "react";
import Header from "../Header/Header.tsx";
import Button from "../Button/Button.tsx";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
import MultiStepForm from '../MultiStepForm/MultiStepForm.tsx'
import './FormPage.css'
import { useState } from "react";
import DropDowm from "../DropDown/DropDown.tsx";
import Loader from "../Loader/Loader.tsx";
export const FormPage = () =>{
    const [selectedDomain, setSelectedDomain] = useState<string>("Impact");
    const [selectedAllDomainAns, setSelectedAllDomainAns] = useState<{ [domain: string]: { [key: number]: string } }>({});
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [isLoading,setIsLoading] = useState<boolean>(false); 

    interface Option{
        id: number; 
        value: string; 
    }
    const handleSubmit = async () => {
        setIsLoading(true); // ✅ Start loading
    
        // Simulate a backend request delay (e.g., 3 seconds)
        setTimeout(() => {
            console.log("Simulated response received:", selectedAllDomainAns);
            setIsLoading(false); // ✅ Stop loading
        }, 3000); // Change 3000 to adjust loading time (in milliseconds)
    };
    
    const handleClear = () => {
        setSelectedAnswers({});
        setSelectedAllDomainAns({});
    };
    
      const domain: Option[]=[
        {id:1, value:"Impact"},
        {id:2, value: "Capabilty"},
        {id:3, value: "Model Type & Risk"}
      ]
    
      const handleDomainChange = (newDomain: string) => {
        // Save current domain's answers
        setSelectedAllDomainAns((prev) => ({
            ...prev,
            [selectedDomain]: selectedAnswers, 
        }));
        // Load new domain's answers (or empty object if none)
        setSelectedAnswers(selectedAllDomainAns[newDomain] || {});
        
        setSelectedDomain(newDomain);
    };
    return (
        <>
            <div className="container">
                <Header/>
                <div className="title">
                    AML model Form
                    <div className="sub-title">Fill in the correct & accurate informtion of your model for best solution</div>
                </div>
                <div className="header">
                
                <div className="header-item">
                     <DropDowm options={domain} onSelect={handleDomainChange} title={"Domain"}/>
                 </div>
                </div>
                 {selectedDomain && <MultiStepForm 
                    domain={selectedDomain}
                    selectedAnswers={selectedAnswers}
                    setSelectedAnswers={setSelectedAnswers}
                    selectedAllDomainAns={selectedAllDomainAns}  // Pass the object
                    setSelectedAllDomainAns={setSelectedAllDomainAns}
                 /> }
            
                <div className="button-container">
                    <div className="submit-clear-buttons">
                        <Button text="Submit Form" bgColor="submit-color" color="black-color" onClick={handleSubmit} Icon={SendRoundedIcon} ></Button>
                    </div>
                     <div className="submit-clear-buttons">
                        <Button text="Clear Form" bgColor="clear-color" color="black-color" onClick={handleClear} Icon={CancelScheduleSendRoundedIcon}></Button>
                    </div>
                    {isLoading && <Loader />}
                </div>
            </div>
        </>
    )
}
export default FormPage; 