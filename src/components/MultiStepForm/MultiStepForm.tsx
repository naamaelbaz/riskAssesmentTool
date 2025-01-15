import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import QuestionItem from '../QuetionItem/QuetionItem.tsx';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import "./MultiStepForm.css"

const MultiStepForm = () => {
  const { control, handleSubmit } = useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const questionsStorage = [
    { id: 1, question: "Specific Input Manipulation: How severe would the impact be if an attacker caused the model to provide incorrect outputs for specific inputs they selected?",example:" A fraud detection model incorrectly approves transactions flagged by the attacker" },
    { id: 2, question: "Global Output Corruption: How severe would the impact be if an attacker caused the model to produce wrong outputs for every input?",example:" A recommendation system consistently suggests irrelevant or harmful content." },
    { id: 3, question: "How severe would the impact be if a pre-defined trigger in the inputs caused the model to produce incorrect outputs?",example:" A specific phrase in a document bypasses a text moderation model." },
    { id: 4, question: "Targeted Attack" },
    { id: 5, question: "How severe would the impact be if an attacker could identify whether specific data samples were used in training? (know which instances were included in the training set)",example:"Example: An attacker manipulates a financial model so that transactions from a specific region are consistently flagged as high-risk, regardless of their actual attributes, influencing decisions for this subset without relying on explicit triggers." },
    { id: 6, question: "Training Data Property Inference (T5): How severe would the impact be if an attacker inferred general properties of the training data (e.g., feature distributions, input types)?",example:"Example: A malicious actor determines a user’s medical record was part of a training dataset" },
    { id: 7, question: "Training Data Exposure (T6): How severe would the impact be if an attacker leaked some or all of the training data?",example:"Example: An attacker deduces the demographic makeup of a training dataset." },
    { id: 8, question: "Model Replication (T7): How severe would the impact be if an attacker extracted enough information to replicate your model?",example:"Example: Customer data used for training a recommendation system is exposed." },
    { id: 9, question: "Resource Exhaustion - Global (T8): How severe would the impact be if an attacker caused the ML model to use excessive resources (e.g., energy, time) for all inputs at inference time?",example:"Example: An attacker uses API queries to recreate a model for commercial gain" },
    { id: 10, question: "Resource Exhaustion - Specific Inputs (T9): How severe would the impact be if an attacker caused the ML model to use excessive resources for specific inputs at inference time?",example:"Example: When processing certain inputs, the system experiences disproportionate delays, with higher-than-usual energy or computational requirements, while other inputs are processed normally." },
    { id: 11, question: "Resource Exhaustion - Training Phase (T10): How severe would the impact be if an attacker caused the training process to use excessive resources (e.g., energy consumption, time, etc.)?",example:"Example: The training process becomes inefficient, taking longer and consuming more computational resources than expected." },
  ];

  // Group the questions into chunks of 3
  const questionsChunks = [];
  for (let i = 0; i < questionsStorage.length; i += 3) {
    questionsChunks.push(questionsStorage.slice(i, i + 2));
  }

  const onSubmit = (data) => {
    console.log(data);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {questionsChunks[currentStep].map((question) => (
        <div key={question.id}>
          <QuestionItem question={question} control={control} />
        </div>
      ))}
      <div className='nav-container'>
        {currentStep > 0 && (
          <ArrowBackIosNewRoundedIcon className='arrow' onClick={prevStep}/>
        )}
        {currentStep < questionsChunks.length - 1 ? (
          <ArrowForwardIosRoundedIcon className='arrow' onClick={nextStep}/>
        ) : (
          <button type="submit">Submit</button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
