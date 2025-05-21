
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
import SidebarProgress from "../../components/SideBar/SideBar.tsx";

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    
    interface Option {
        id: number;
        value: string;
    }

    // interface DashboardData {
    //     score: number;
    //     riskLevel: string;
    // }
    interface Attack {
        attack_name: string;
        objective: string;
        score: number;
    }
    
    interface DashboardData {
        attacks: Attack[];
        explanations: Record<string, string>;
        usecaseName: string;
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
      
      const flattenData = (allDomainAnswers: Record<string, Record<string, string | string[]>>) => {
        const flattened: Record<string, string | string[]> = {};
    
        for (const domain in allDomainAnswers) {
            for (const questionId in allDomainAnswers[domain]) {
                const cleanId = questionId.split('_')[1] || questionId;
                flattened[cleanId] = allDomainAnswers[domain][questionId];
            }
        }
    
        return flattened;
    };
    
    
    
      
      
     
      
      // Flatten the data
      const flattenedData = flattenData(selectedAllDomainAns);
      
      
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
    
        // Flatten data for backend
        const flattenedData = flattenData(updatedAllDomainAns);
    
        // Convert to FormData for Flask to read like request.form
        const formData = new FormData();
        for (const key in flattenedData) {
            const value = flattenedData[key];
            if (Array.isArray(value)) {
                value.forEach((v) => formData.append(key, v));
            } else {
                formData.append(key, value);
            }
        }
    
        try {
            setIsLoading(true);
    
            const response = await fetch("http://localhost:5000/submit", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch results from backend.");
            }
    
            const result = await response.json();
            console.log("Received result from backend:", result);
    
            const { attacks, explanations, usecase_name } = result;
    
            setDashboardData({
                attacks: attacks,
                explanations: explanations,
                usecaseName: usecase_name,
            });
         
            setResultsAvailable(true);
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    
    const updateAttacksData = async (data) => {
        try {
            console.log("Sending data to backend:", data); // Log data before sending
            const response = await fetch("http://localhost:5000/update-attacks-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                throw new Error("Failed to update attacks data");
            }
            const result = await response.json();
            console.log("Backend response:", result); // Log the response
        } catch (error) {
            console.error("Error updating attacks data:", error);
            throw error;
        }
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
          {!resultsAvailable && (
           <div className={`container ${isLoading ? 'dimmed' : ''}`}>
              <Header />
      
              <div className="title">
                AML model Form
                <div className="sub-title">
                  Fill in the correct & accurate information of your model for best solution
                </div>
              </div>
      
              {selectedDomain && (
                <MultiStepForm
                  key={formKey}
                  domain={selectedDomain}
                  selectedAnswers={selectedAnswers}
                  setSelectedAnswers={setSelectedAnswers}
                  selectedAllDomainAns={selectedAllDomainAns}
                  setSelectedAllDomainAns={setSelectedAllDomainAns}
                />
              )}
      
              <SidebarProgress
                domainList={domain}
                currentDomain={selectedDomain}
                onDomainChange={handleDomainChange}
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
              />
      
              <div className="button-container">
                <div className="submit-clear-buttons">
                  <Button
                    text="Submit Form"
                    bgColor="submit-border-color"
                    color="submit-color"
                    onClick={handleSubmit}
                    Icon={SendRoundedIcon}
                  />
                </div>
                <div className="submit-clear-buttons">
                  <Button
                    text="Clear Form"
                    color="red"
                    onClick={handleClear}
                    Icon={CancelScheduleSendRoundedIcon}
                    wBorder="clear-border-color"
                  />
                </div>
              </div>
      
              <ValidationPopup />
            </div>
          )}
      
            {isLoading && (
            <div className="loader-wrapper">
            <div className="dim-overlay" />
            <Loader />
            </div>
            )}

      
          {resultsAvailable && <DashboardPage data={dashboardData} />}
        </>
      );
      
};

export default FormPage;
