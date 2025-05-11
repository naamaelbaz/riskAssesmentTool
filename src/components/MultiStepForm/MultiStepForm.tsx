import React, { useState } from 'react';
import QuestionItem from '../QuetionItem/QuetionItem.tsx';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import "./MultiStepForm.css";
import { options, questionsStorage } from "../../Schemas/step1schema.tsx";
import Modal from '../Modal/Modal.tsx';


interface MultiStepFormProps {
  domain: string;
  selectedAnswers: { [key: number]: string[] };
  setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
  selectedAllDomainAns: { [domain: string]: { [key: number]: string[] } };
  setSelectedAllDomainAns: React.Dispatch<React.SetStateAction<{ [domain: string]: { [key: number]: string[] } }>>;
  allDomains: { id: number; value: string }[];
  currentDomain: string;
  onDomainChange: (domain: string) => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  domain,
  selectedAnswers,
  selectedAllDomainAns,
  setSelectedAnswers,
  setSelectedAllDomainAns,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
 
  console.log(selectedAllDomainAns)
  const fillteredDomain = questionsStorage.filter((item) => item.domain === domain);
  const questionsChunks = [];
  for (let i = 0; i < fillteredDomain.length; i += 1) {
    questionsChunks.push(fillteredDomain.slice(i, i + 1));
    
  }
  const handleOptionSelect = (questionId: string, value: string | string[]) => {
    const isMultiSelect = questionId === 'M1' || questionId === 'M2';
    const existing = selectedAnswers[questionId] || [];
  
    let updated: string[];
  
    if (isMultiSelect) {
      const valuesArray = Array.isArray(value) ? value : [value];
      const allSelected = valuesArray.every((val) => existing.includes(val));
  
      if (allSelected) {
        // Unselect all values
        updated = existing.filter((v) => !valuesArray.includes(v));
      } else {
        // Add new values to existing selection
        updated = Array.from(new Set([...existing, ...valuesArray]));
      }
    } else {
      const val = Array.isArray(value) ? value[0] : value;
      updated = [val];
    }
  
    const newAnswers = {
      ...selectedAnswers,
      [questionId]: updated,
    };
  
    setSelectedAnswers(newAnswers);
  
    // Only auto-move if a new value is selected and it's not the last step
    if (
      !existing.includes(Array.isArray(value) ? value[0] : value) &&
      updated.length === 1 &&
      currentStep < questionsChunks.length - 2
    ) {
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 300);
    }
  };
  
  const closeModal = () => {
    setIsSubmit(false);
  };

  const onSubmit = () => {
    setIsSubmit(true);
    setSelectedAllDomainAns((prev) => ({
      ...prev,
      [domain]: selectedAnswers,
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

  const totalQuestions = fillteredDomain.length;
  const answeredQuestions = fillteredDomain.filter(q => 
    Array.isArray(selectedAnswers[q.id]) && selectedAnswers[q.id].length > 0
  ).length;
  

  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  return (
    <div className="form-container">
    <div className="step-progress-container">
    
        {fillteredDomain.map((q, index) => {
          const isAnswered = Array.isArray(selectedAnswers[q.id]) && selectedAnswers[q.id].length > 0;
          return (
            <div key={q.id} className="step-item-q">
            <div
              className={`step-circle ${isAnswered ? 'completed' : ''} ${currentStep === index ? 'active' : ''}`}
              onClick={() => setCurrentStep(index)}
              style={{ cursor: "pointer" }}
              title={`Go to question ${index + 1}`}
            >
              {index + 1}
            </div>
              {index < fillteredDomain.length - 1 && (
                <div className={`step-line ${Array.isArray(selectedAnswers[fillteredDomain[index + 1].id]) && selectedAnswers[fillteredDomain[index + 1].id].length > 0 ? 'completed' : ''}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="question-card-wrapper">
        {questionsChunks[currentStep]?.map((question) => (
            <QuestionItem
            key={question.id}
            question={question}
            options={ options.find(opt => opt.id === question.optId)?.value || []}
            selectedValue={selectedAnswers[question.id] || ''}
            onSelect={handleOptionSelect}
          />
        ))}
      </div>

      <div className="nav-container">
        {currentStep > 0 && (
          <div className="nav-button" onClick={prevStep}>
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </div>
        )}

        {currentStep < questionsChunks.length - 1 ? (
          <div className="nav-button" onClick={nextStep}>
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </div>
        ) : (
          <button className="submit-button" onClick={onSubmit}>
            Save
          </button>
        )}
      </div>

      {isSubmit && <Modal onClose={closeModal} message={"Your answers have been saved successfully!"} />}
    </div>
  );
};

export default MultiStepForm;
