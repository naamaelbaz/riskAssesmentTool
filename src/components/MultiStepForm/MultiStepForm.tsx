import React, { useState } from 'react';
import QuestionItem from '../QuetionItem/QuetionItem.tsx';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import "./MultiStepForm.css"
import {options,questionsStorage} from "../../Schemas/step1schema.tsx"
import Button from '../Button/Button.tsx'
import Modal from '../Modal/Modal.tsx';

interface MultiStepFormProps {
  domain: string;
  selectedAnswers: { [key: number]: string };
  setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  selectedAllDomainAns: { [key: string]: { [key: number]: string } }; 
  setSelectedAllDomainAns: React.Dispatch<React.SetStateAction<{ [key: string]: { [key: number]: string } }>>; 
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  domain,
  selectedAnswers,
  setSelectedAnswers,
  selectedAllDomainAns,
  setSelectedAllDomainAns,
}) => {  
  const [currentStep, setCurrentStep] = useState<number>(0);
  // console.log(domain)
  const [isSubmit,setIsSubmit] = useState<boolean>(false); 
  const fillteredDomain = questionsStorage.filter((item) => item.domain === domain);
  // Group the questions into chunks of 3
  const questionsChunks = [];
  for (let i = 0; i < fillteredDomain.length; i += 3) {
    questionsChunks.push(fillteredDomain.slice(i, i + 2));
  }

  const handleOptionSelect = (questionId: number, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const closeModal = () => {
    setIsSubmit(false);
  };

  const onSubmit = () => {
    setIsSubmit(true); 
    setSelectedAllDomainAns((prev) => ({
      ...prev,
      [domain]: selectedAnswers, // Save answers for the current domain
    }));

  };

  const nextStep = () => {
    if (currentStep < questionsChunks.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const allQuestionsAnswered = fillteredDomain.every(
    (question) => selectedAnswers[question.id] !== undefined && selectedAnswers[question.id] !== ""
  );

  
  
  return (
    <div className="form-container">
      {questionsChunks[currentStep]?.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          options={options[question.optId]?.value || []}
          selectedValue={selectedAnswers[question.id] || ''}
          onSelect={handleOptionSelect}
        />
      ))}

      <div className="nav-container">
        {currentStep > 0 && <ArrowBackIosNewRoundedIcon className="arrow" onClick={prevStep} />}
        {currentStep < questionsChunks.length - 1 ? (
          <ArrowForwardIosRoundedIcon className="arrow" onClick={nextStep} />
        ) : (
          <Button text="Save" wBorder="submit-border-color" color="black-color" onClick={onSubmit} />
        )}
      </div>
      ({isSubmit && <Modal onClose={closeModal} message={"Your answers have been saved successfully!"}/>})
    </div>
  );
};


export default MultiStepForm;
