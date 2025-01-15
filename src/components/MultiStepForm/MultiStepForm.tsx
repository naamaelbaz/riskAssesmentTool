import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import QuestionItem from '../QuetionItem/QuetionItem.tsx';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import "./MultiStepForm.css"

const MultiStepForm: React.FC<{ domain: string }>= ({domain='Impact'}) => {
  const { control, handleSubmit } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  console.log(domain)
  const questionsStorage = [
    { id: 1,domain:'Impact', question: "Specific Input Manipulation: How severe would the impact be if an attacker caused the model to provide incorrect outputs for specific inputs they selected?",example:" A fraud detection model incorrectly approves transactions flagged by the attacker" },
    { id: 2,domain:'Impact', question: "Global Output Corruption: How severe would the impact be if an attacker caused the model to produce wrong outputs for every input?",example:" A recommendation system consistently suggests irrelevant or harmful content." },
    { id: 3,domain:'Impact', question: "How severe would the impact be if a pre-defined trigger in the inputs caused the model to produce incorrect outputs?",example:" A specific phrase in a document bypasses a text moderation model." },
    { id: 4,domain:'Impact', question: "Targeted Attack" },
    { id: 5,domain:'Impact', question: "How severe would the impact be if an attacker could identify whether specific data samples were used in training? (know which instances were included in the training set)",example:"Example: An attacker manipulates a financial model so that transactions from a specific region are consistently flagged as high-risk, regardless of their actual attributes, influencing decisions for this subset without relying on explicit triggers." },
    { id: 6,domain:'Impact', question: "Training Data Property Inference (T5): How severe would the impact be if an attacker inferred general properties of the training data (e.g., feature distributions, input types)?",example:"Example: A malicious actor determines a user’s medical record was part of a training dataset" },
    { id: 7,domain:'Impact', question: "Training Data Exposure (T6): How severe would the impact be if an attacker leaked some or all of the training data?",example:"Example: An attacker deduces the demographic makeup of a training dataset." },
    { id: 8,domain:'Impact', question: "Model Replication (T7): How severe would the impact be if an attacker extracted enough information to replicate your model?",example:"Example: Customer data used for training a recommendation system is exposed." },
    { id: 9,domain:'Impact', question: "Resource Exhaustion - Global (T8): How severe would the impact be if an attacker caused the ML model to use excessive resources (e.g., energy, time) for all inputs at inference time?",example:"Example: An attacker uses API queries to recreate a model for commercial gain" },
    { id: 10,domain:'Impact', question: "Resource Exhaustion - Specific Inputs (T9): How severe would the impact be if an attacker caused the ML model to use excessive resources for specific inputs at inference time?",example:"Example: When processing certain inputs, the system experiences disproportionate delays, with higher-than-usual energy or computational requirements, while other inputs are processed normally." },
    { id: 11,domain:'Impact', question: "Resource Exhaustion - Training Phase (T10): How severe would the impact be if an attacker caused the training process to use excessive resources (e.g., energy consumption, time, etc.)?",example:"Example: The training process becomes inefficient, taking longer and consuming more computational resources than expected." },


    { id: 12,domain:'Capabilty', question: " How easy is it for the threat actor to compromise the data used for training or re-training the model?",example:" A fraud detection model incorrectly approves transactions flagged by the attacker" },
    { id: 13,domain:'Capabilty', question: "DELETED QUESTION",example:" A recommendation system consistently suggests irrelevant or harmful content." },
    { id: 14,domain:'Capabilty', question: "DELETED QUESTION",example:" A specific phrase in a document bypasses a text moderation model." },
    { id: 15,domain:'Capabilty', question: " Do you perform any type of manual feature engineering?", example:"None" },
    { id: 16,domain:'Capabilty', question: "What level of Training data validation (e.g., cleaning, filtering, OOD/anomaly detection) is performed?",example:"Example: An attacker manipulates a financial model so that transactions from a specific region are consistently flagged as high-risk, regardless of their actual attributes, influencing decisions for this subset without relying on explicit triggers." },
    { id: 17,domain:'Capabilty', question: "What level of data validation (e.g., cleaning, filtering, OOD/anomaly detection) is performed? (At inferance - when the system is already deployed)",example:"Example: A malicious actor determines a user’s medical record was part of a training dataset" },
    { id: 18,domain:'Capabilty', question: "How secure are your model’s parameters against unauthorized changes? (e.g., sending malicious updates)",example:"Example: An attacker deduces the demographic makeup of a training dataset." },
    { id: 19,domain:'Capabilty', question: "How often do you retrain the model?",example:"Example: Customer data used for training a recommendation system is exposed." },
    { id: 20,domain:'Capabilty', question: "What feedback is accessible to the threat actor during the model's training process? (Feedback refers to any information the threat actor could potentially access about the model's behavior or decisions during training.)",example:"Example: An attacker uses API queries to recreate a model for commercial gain" },
    { id: 21,domain:'Capabilty', question: "When retraining the model, do you retrain it from scratch or do you perform fine-tuning or transfer learning?",example:"Example: When processing certain inputs, the system experiences disproportionate delays, with higher-than-usual energy or computational requirements, while other inputs are processed normally." },
    { id: 22,domain:'Capabilty', question: "Do you conduct online evaluation of your models? Does this include A/B testing?",example:"Example: The training process becomes inefficient, taking longer and consuming more computational resources than expected." },
    { id: 23,domain:'Capabilty', question: "How easy is it for the threat actor to manipulate the model’s inputs digitally at serving time? (e.g., via an accessible API)",example:" A recommendation system consistently suggests irrelevant or harmful content." },
    { id: 24,domain:'Capabilty', question: "How easy is it for the threat actor to manipulate the model’s inputs physically at serving time? (e.g., placing an adversarial object in front of a sensor)",example:" A specific phrase in a document bypasses a text moderation model." },
    { id: 25,domain:'Capabilty', question: " What is the feedback provided to model's users during serving time?",example:" A recommendation system consistently suggests irrelevant or harmful content." },
    { id: 26,domain:'Capabilty', question: "What can the threat actor know about the data collected, processed, and used for training?",example:" A specific phrase in a document bypasses a text moderation model." },
    { id: 27,domain:'Capabilty', question: "How easy is it for the threat actor to obtain training data samples used for training the model, or reference data which is similar to the data used for training the model?",example:" A recommendation system consistently suggests irrelevant or harmful content." },
    { id: 28,domain:'Capabilty', question: "How much information does the threat actor have about the model’s design, training process, or deployment setup?",example:" A specific phrase in a document bypasses a text moderation model." },
    { id: 29,domain:'Capabilty', question: "How easy is it for the threat actor to access system metrics?\n(e.g., time, energy consumption, CPU)",example:" A recommendation system consistently suggests irrelevant or harmful content." },
   



    { id: 30,domain:'Model Type & Risk', question: "What type of model do you use in the selected use case?\n(Choose the option that best describes your model’s architecture or technique.)",example:" A fraud detection model incorrectly approves transactions flagged by the attacker" },
    { id: 31,domain:'Model Type & Risk', question: "What type of task is your model solving?\n(Indicates the primary task the model is designed for.)",example:" A recommendation system consistently suggests irrelevant or harmful content." },
    { id: 32,domain:'Model Type & Risk', question: "What type of data is your model using? (Select the type of data processed by the model.)",example:" A specific phrase in a document bypasses a text moderation model." },
    { id: 33,domain:'Model Type & Risk', question: "What is the domain of your use case?\n(Identify the application area your model is serving.)", example:"none" },
    { id: 34,domain:'Model Type & Risk', question: "What is the maximal acceptable impact on model accuracy (compared to the best achievable performance)?",example:"Example: An attacker manipulates a financial model so that transactions from a specific region are consistently flagged as high-risk, regardless of their actual attributes, influencing decisions for this subset without relying on explicit triggers." },
    { id: 35,domain:'Model Type & Risk', question: "What is the required level of protection against evasion attacks?",example:"Example: A malicious actor determines a user’s medical record was part of a training dataset" },
    { id: 36,domain:'Model Type & Risk', question: "What is the required level of protection against model corruption attacks (i.e., making the model's prediction useless)?",example:"Example: An attacker deduces the demographic makeup of a training dataset." },
    { id: 37,domain:'Model Type & Risk', question: "What is the required level of protection against data privacy attacks (i.e., membership inference, data reconstruction, property inference)?",example:"Example: Customer data used for training a recommendation system is exposed." },
    { id: 38,domain:'Model Type & Risk', question: "What is the required level of protection against model privacy attacks (i.e., model stealing, model extraction)?",example:"Example: An attacker uses API queries to recreate a model for commercial gain" },
    { id: 39,domain:'Model Type & Risk', question: "What is the required level of protection against resource exhaustion attacks (e.g., extending prediction runtime)?",example:"Example: When processing certain inputs, the system experiences disproportionate delays, with higher-than-usual energy or computational requirements, while other inputs are processed normally." },
    { id: 40,domain:'Model Type & Risk', question: "How relevant is model bias in your use case?",example:"Example: The training process becomes inefficient, taking longer and consuming more computational resources than expected." },
    {id:41, domain:'Model Type & Risk', question:" Do you use known datasets to train your model? (Select all that apply.) for your convinience - the options are categorized by domains",example:''},
    {id: 42, domain: 'Do you use known model architectures in your system? (Select all that apply.)', example:''}
  ];

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
