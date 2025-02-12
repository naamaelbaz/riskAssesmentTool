import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import './QuetionItem.css';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import Tooltip from '@mui/material/Tooltip';
import {Option} from "../../Schemas/step1schema.tsx"
import Button from '../Button/Button.tsx'


interface Question {
  id: number;
  question: string;
  example: string;
}

interface QuestionItemProps {
  question: Question;
  options: Option[]; // Assuming options is an array of strings
  control: any; // Replace 'any' with the appropriate type from react-hook-form
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, options, control }) => {

  const [selectedVal, setSelectedVal] = useState<string>("");
  const[clicked,setClicked] = useState<boolean>(false); 
  const handleValChange = (value: string) => {
    console.log("Selected Domain:", value); // You can use this value for further logic
    setSelectedVal(value);
  };

  return (
    <div className="card">
      <div className="card-header">

        <div className='innerQ'>
        <Tooltip title={question.example}>
          <div className="icon"><PsychologyAltRoundedIcon /></div>
        </Tooltip>
        <div className="question-title">{question.question}  </div>

        </div>
   
        </div>
 
        <div className='answer-container'>
                  <div className='answer-item'>
                   {options.map((option) => (
                    <Button
                      key={option.id} 
                      text={option.value}
                      bgColor={selectedVal === option.value ? "green" : "gray"}
                      color="white-color"
                      onClick={() => handleValChange(option.value)}
                    />
                  ))}
                  </div>
            </div>
    </div>
  );
};

export default QuestionItem;
