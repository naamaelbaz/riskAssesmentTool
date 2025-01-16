import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import './QuetionItem.css';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import Tooltip from '@mui/material/Tooltip';
import DropDown from '../DropDown/DropDown.tsx';

interface Question {
  id: number;
  question: string;
  example: string;
}

interface QuestionItemProps {
  question: Question;
  options: string[]; // Assuming options is an array of strings
  control: any; // Replace 'any' with the appropriate type from react-hook-form
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, control }) => {
  const [selectedVal, setSelectedVal] = useState<string>("");

  const handleValChange = (value: string) => {
    console.log("Selected Domain:", value); // You can use this value for further logic
    setSelectedVal(value);
  };

  return (
    <div className="card">
      <div className="card-header">
        <Tooltip title={question.example}>
          <div className="icon"><PsychologyAltRoundedIcon /></div>
        </Tooltip>
        <div className="question-title">{question.question}</div>
    
      </div>
      <Controller
        name={`question${question.id}`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            className="answer-input"
            placeholder={`Answer to question ${question.id}`}
          />
          
        )}
      />
    
    </div>
  );
};

export default QuestionItem;
