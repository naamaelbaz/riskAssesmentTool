import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import QuestionItem from '../QuetionItem/QuetionItem.tsx';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import "./MultiStepForm.css"
import {QuestionOptions,QuestionStorage, questionsStorage, options} from "../../Schemas/step1schema.tsx"

const MultiStepForm: React.FC<{ domain: string }>= ({domain='Impact'}) => {
  const { control, handleSubmit } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  console.log(domain)
   
  const fillteredDomain = questionsStorage.filter((item) => item.domain === domain);


  // Group the questions into chunks of 3
  const questionsChunks = [];
  for (let i = 0; i < fillteredDomain.length; i += 3) {
    questionsChunks.push(fillteredDomain.slice(i, i + 2));
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
      {questionsChunks[currentStep]?.map((question) => (
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
