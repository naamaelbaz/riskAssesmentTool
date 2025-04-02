import React from "react";
import Header from "../../components/Header/Header.tsx";
import Button from "../../components/Button/Button.tsx";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
import MultiStepForm from '../../components/MultiStepForm/MultiStepForm.tsx'
import './FormPage.css'
import { useState } from "react";
import DropDowm from "../../components/DropDown/DropDown.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import DashboardPage from "../DashboardPage/DashboardPage.tsx";
export const FormPage = () =>{
    const [selectedDomain, setSelectedDomain] = useState<string>("Impact");
    const [selectedAllDomainAns, setSelectedAllDomainAns] = useState<{ [domain: string]: { [key: number]: string } }>({});
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [isLoading,setIsLoading] = useState<boolean>(false); 
    const [resultsAvailable, setResultsAvailable] = useState<boolean>(false); 
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null); 

    interface Option{
        id: number; 
        value: string; 
    }

    interface DashboardData{
        score: number;
        riskLevel:string; 
    }
    const handleSubmit = async () => {
        setIsLoading(true); // 
    
        // Simulate a backend request delay (e.g., 3 seconds)
        setTimeout(() => {
            const mockResults: DashboardData = {score: 8.95, riskLevel: "Meduim"}
            setDashboardData(mockResults);
            setIsLoading(false);
            setResultsAvailable(true);
            // console.log("Simulated response received:", selectedAllDomainAns);
           
        }, 3000); 
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
            {isLoading ? (<Loader/> ) 
            : resultsAvailable ? 
                ( <DashboardPage data={dashboardData}/> ) : 
            
            (
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
                   
                </div>
            </div>
            ) }
            
        </>
    )
}
export default FormPage; 