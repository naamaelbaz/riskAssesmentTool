// import React from "react";
// import Header from "../../components/Header/Header.tsx";
// import Button from "../../components/Button/Button.tsx";
// import SendRoundedIcon from '@mui/icons-material/SendRounded';
// import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
// import MultiStepForm from '../../components/MultiStepForm/MultiStepForm.tsx'
// import './FormPage.css'
// import { useState } from "react";
// import DropDowm from "../../components/DropDown/DropDown.tsx";
// import Loader from "../../components/Loader/Loader.tsx";
// import DashboardPage from "../DashboardPage/DashboardPage.tsx";
// export const FormPage = () =>{
//     const [selectedDomain, setSelectedDomain] = useState<string>("Impact");
//     const [selectedAllDomainAns, setSelectedAllDomainAns] = useState<{ [domain: string]: { [key: number]: string } }>({});
//     const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
//     const [isLoading,setIsLoading] = useState<boolean>(false);
//     const [resultsAvailable, setResultsAvailable] = useState<boolean>(false);
//     const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//
//     interface Option{
//         id: number;
//         value: string;
//     }
//
//     interface DashboardData{
//         score: number;
//         riskLevel:string;
//     }
//     const handleSubmit = async () => {
//         setIsLoading(true); //
//
//         // Simulate a backend request delay (e.g., 3 seconds)
//         setTimeout(() => {
//             const mockResults: DashboardData = {score: 8.95, riskLevel: "Meduim"}
//             setDashboardData(mockResults);
//             setIsLoading(false);
//             setResultsAvailable(true);
//             // console.log("Simulated response received:", selectedAllDomainAns);
//
//         }, 3000);
//     };
//
//     const handleClear = () => {
//         setSelectedAnswers({});
//         setSelectedAllDomainAns({});
//     };
//
//       const domain: Option[]=[
//         {id:1, value:"Impact"},
//         {id:2, value: "Capabilty"},
//         {id:3, value: "Model Type & Risk"}
//       ]
//
//       const handleDomainChange = (newDomain: string) => {
//         // Save current domain's answers
//         setSelectedAllDomainAns((prev) => ({
//             ...prev,
//             [selectedDomain]: selectedAnswers,
//         }));
//         // Load new domain's answers (or empty object if none)
//         setSelectedAnswers(selectedAllDomainAns[newDomain] || {});
//
//         setSelectedDomain(newDomain);
//     };
//         return (
//         <>
//             {isLoading ? (<Loader/> )
//             : resultsAvailable ?
//                 ( <DashboardPage data={dashboardData}/> ) :
//
//             (
//                 <div className="container">
//                 <Header/>
//                 <div className="title">
//                     AML model Form
//                     <div className="sub-title">Fill in the correct & accurate informtion of your model for best solution</div>
//                 </div>
//                 <div className="header">
//
//                 <div className="header-item">
//                      <DropDowm options={domain} onSelect={handleDomainChange} title={"Domain"}/>
//                  </div>
//                 </div>
//                  {selectedDomain && <MultiStepForm
//                     domain={selectedDomain}
//                     selectedAnswers={selectedAnswers}
//                     setSelectedAnswers={setSelectedAnswers}
//                     selectedAllDomainAns={selectedAllDomainAns}  // Pass the object
//                     setSelectedAllDomainAns={setSelectedAllDomainAns}
//                  /> }
//
//                 <div className="button-container">
//                     <div className="submit-clear-buttons">
//                         <Button text="Submit Form" bgColor="submit-color" color="black-color" onClick={handleSubmit} Icon={SendRoundedIcon} ></Button>
//                     </div>
//                      <div className="submit-clear-buttons">
//                         <Button text="Clear Form" bgColor="clear-color" color="black-color" onClick={handleClear} Icon={CancelScheduleSendRoundedIcon}></Button>
//                     </div>
//
//                 </div>
//             </div>
//             ) }
//
//         </>
//     )
// }
// export default FormPage;
//
//

// ensure the questionnaire restarts from the beginning each time a domain is changed
// import React from "react";
// import Header from "../../components/Header/Header.tsx";
// import Button from "../../components/Button/Button.tsx";
// import SendRoundedIcon from '@mui/icons-material/SendRounded';
// import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
// import MultiStepForm from '../../components/MultiStepForm/MultiStepForm.tsx'
// import './FormPage.css'
// import { useState } from "react";
// import DropDowm from "../../components/DropDown/DropDown.tsx";
// import Loader from "../../components/Loader/Loader.tsx";
// import DashboardPage from "../DashboardPage/DashboardPage.tsx";
// export const FormPage = () =>{
//     const [selectedDomain, setSelectedDomain] = useState<string>("Impact");
//     const [selectedAllDomainAns, setSelectedAllDomainAns] = useState<{ [domain: string]: { [key: number]: string } }>({});
//     const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
//     const [isLoading,setIsLoading] = useState<boolean>(false);
//     const [resultsAvailable, setResultsAvailable] = useState<boolean>(false);
//     const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//     // Add this new state to track form resets
//     const [formKey, setFormKey] = useState<number>(0);
//
//     interface Option{
//         id: number;
//         value: string;
//     }
//
//     interface DashboardData{
//         score: number;
//         riskLevel:string;
//     }
//     const handleSubmit = async () => {
//         setIsLoading(true);
//
//         // Simulate a backend request delay (e.g., 3 seconds)
//         setTimeout(() => {
//             const mockResults: DashboardData = {score: 8.95, riskLevel: "Meduim"}
//             setDashboardData(mockResults);
//             setIsLoading(false);
//             setResultsAvailable(true);
//             // console.log("Simulated response received:", selectedAllDomainAns);
//
//         }, 3000);
//     };
//
//     const handleClear = () => {
//         setSelectedAnswers({});
//         setSelectedAllDomainAns({});
//         // Increment form key to force re-render of the form
//         setFormKey(prevKey => prevKey + 1);
//     };
//
//       const domain: Option[]=[
//         {id:1, value:"Impact"},
//         {id:2, value: "Capabilty"},
//         {id:3, value: "Model Type & Risk"}
//       ]
//
//       const handleDomainChange = (newDomain: string) => {
//         // Save current domain's answers
//         setSelectedAllDomainAns((prev) => ({
//             ...prev,
//             [selectedDomain]: selectedAnswers,
//         }));
//         // Load new domain's answers (or empty object if none)
//         setSelectedAnswers(selectedAllDomainAns[newDomain] || {});
//
//         setSelectedDomain(newDomain);
//         // Increment form key to force the MultiStepForm to re-render and reset to first step
//         setFormKey(prevKey => prevKey + 1);
//       };
//         return (
//         <>
//             {isLoading ? (<Loader/> )
//             : resultsAvailable ?
//                 ( <DashboardPage data={dashboardData}/> ) :
//
//             (
//                 <div className="container">
//                 <Header/>
//                 <div className="title">
//                     AML model Form
//                     <div className="sub-title">Fill in the correct & accurate informtion of your model for best solution</div>
//                 </div>
//                 <div className="header">
//
//                 <div className="header-item">
//                      <DropDowm options={domain} onSelect={handleDomainChange} title={"Domain"}/>
//                  </div>
//                 </div>
//                  {selectedDomain && <MultiStepForm
//                     key={formKey} // Add key prop to force re-render when domain changes
//                     domain={selectedDomain}
//                     selectedAnswers={selectedAnswers}
//                     setSelectedAnswers={setSelectedAnswers}
//                     selectedAllDomainAns={selectedAllDomainAns}
//                     setSelectedAllDomainAns={setSelectedAllDomainAns}
//                  /> }
//
//                 <div className="button-container">
//                     <div className="submit-clear-buttons">
//                         <Button text="Submit Form" bgColor="submit-color" color="black-color" onClick={handleSubmit} Icon={SendRoundedIcon} ></Button>
//                     </div>
//                      <div className="submit-clear-buttons">
//                         <Button text="Clear Form" bgColor="clear-color" color="black-color" onClick={handleClear} Icon={CancelScheduleSendRoundedIcon}></Button>
//                     </div>
//
//                 </div>
//             </div>
//             ) }
//
//         </>
//     )
// }
// export default FormPage;


// ensure the questionnaire restarts from the beginning each time a domain is changed
// implement the validation requirement for all questionnaires
import React from "react";
import Header from "../../components/Header/Header.tsx";
import Button from "../../components/Button/Button.tsx";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
import MultiStepForm from '../../components/MultiStepForm/MultiStepForm.tsx'
import './FormPage.css'
import { useState, useEffect } from "react";
import DropDowm from "../../components/DropDown/DropDown.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import DashboardPage from "../DashboardPage/DashboardPage.tsx";
export const FormPage = () => {
    const [selectedDomain, setSelectedDomain] = useState<string>("Impact");
    const [selectedAllDomainAns, setSelectedAllDomainAns] = useState<{ [domain: string]: { [key: number]: string } }>({});
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resultsAvailable, setResultsAvailable] = useState<boolean>(false);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [formKey, setFormKey] = useState<number>(0);
    // Add new states for validation popup
    const [showValidationPopup, setShowValidationPopup] = useState<boolean>(false);
    const [incompleteFields, setIncompleteFields] = useState<string[]>([]);

    interface Option {
        id: number;
        value: string;
    }

    interface DashboardData {
        score: number;
        riskLevel: string;
    }

    const domain: Option[] = [
        { id: 1, value: "Impact" },
        { id: 2, value: "Capabilty" },
        { id: 3, value: "Model Type & Risk" }
    ];

    // Helper function to check if a domain is complete
    const isDomainComplete = (domainAnswers: { [key: number]: string } | undefined) => {
        // This is a placeholder check - you'll need to adapt based on your actual form requirements
        // For example, if each domain has a fixed number of questions, check if all have answers
        return domainAnswers && Object.keys(domainAnswers).length >= 3; // Assuming each domain has at least 3 questions
    };

    // Check if all domains are complete
    const validateAllDomainsComplete = () => {
        const incomplete: string[] = [];

        // Check all domains
        for (const domainOption of domain) {
            const domainName = domainOption.value;
            const domainAnswers = selectedAllDomainAns[domainName];

            if (!isDomainComplete(domainAnswers)) {
                incomplete.push(domainName);
            }
        }

        // Also check current domain that might not be saved yet
        if (!isDomainComplete(selectedAnswers) && !incomplete.includes(selectedDomain)) {
            incomplete.push(selectedDomain);
        }

        return incomplete;
    };

    const handleSubmit = async () => {
        // Save current domain's answers before validation
        const updatedAllDomainAns = {
            ...selectedAllDomainAns,
            [selectedDomain]: selectedAnswers,
        };

        // Check if all domains are complete
        const incomplete = validateAllDomainsComplete();

        if (incomplete.length > 0) {
            setIncompleteFields(incomplete);
            setShowValidationPopup(true);
            return;
        }

        setIsLoading(true);

        // Simulate a backend request delay (e.g., 3 seconds)
        setTimeout(() => {
            const mockResults: DashboardData = { score: 8.95, riskLevel: "Medium" };
            setDashboardData(mockResults);
            setIsLoading(false);
            setResultsAvailable(true);
        }, 3000);
    };

    const handleClear = () => {
        setSelectedAnswers({});
        setSelectedAllDomainAns({});
        setFormKey(prevKey => prevKey + 1);
    };

    const handleDomainChange = (newDomain: string) => {
        // Save current domain's answers
        setSelectedAllDomainAns((prev) => ({
            ...prev,
            [selectedDomain]: selectedAnswers,
        }));

        // Load new domain's answers (or empty object if none)
        setSelectedAnswers(selectedAllDomainAns[newDomain] || {});

        setSelectedDomain(newDomain);
        // Increment form key to force the MultiStepForm to re-render and reset to first step
        setFormKey(prevKey => prevKey + 1);
    };

    // ValidationPopup component
    const ValidationPopup = () => {
        if (!showValidationPopup) return null;

        return (
            <div className="validation-popup-overlay">
                <div className="validation-popup">
                    <h3>Incomplete Questionnaire</h3>
                    <p>Please complete all domains before submitting:</p>
                    <ul>
                        {incompleteFields.map((field, index) => (
                            <li key={index}>{field}</li>
                        ))}
                    </ul>
                    <button
                        className="close-popup-btn"
                        onClick={() => setShowValidationPopup(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            {isLoading ? (<Loader />)
            : resultsAvailable ?
                (<DashboardPage data={dashboardData} />) :
            (
                <div className="container">
                    <Header />
                    <div className="title">
                        AML model Form
                        <div className="sub-title">Fill in the correct & accurate information of your model for best solution</div>
                    </div>
                    <div className="header">
                        <div className="header-item">
                            <DropDowm options={domain} onSelect={handleDomainChange} title={"Domain"} />
                        </div>
                    </div>
                    {selectedDomain && <MultiStepForm
                        key={formKey}
                        domain={selectedDomain}
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                        selectedAllDomainAns={selectedAllDomainAns}
                        setSelectedAllDomainAns={setSelectedAllDomainAns}
                    />}

                    <div className="button-container">
                        <div className="submit-clear-buttons">
                            <Button text="Submit Form" bgColor="submit-color" color="black-color" onClick={handleSubmit} Icon={SendRoundedIcon}></Button>
                        </div>
                        <div className="submit-clear-buttons">
                            <Button text="Clear Form" bgColor="clear-color" color="black-color" onClick={handleClear} Icon={CancelScheduleSendRoundedIcon}></Button>
                        </div>
                    </div>

                    {/* Render the validation popup */}
                    <ValidationPopup />
                </div>
            )}
        </>
    );
};

export default FormPage;
