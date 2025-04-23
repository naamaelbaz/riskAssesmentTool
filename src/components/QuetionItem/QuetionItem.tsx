import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import './QuetionItem.css';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import Tooltip from '@mui/material/Tooltip';
import {Option} from "../../Schemas/step1schema.tsx"
import {QuestionStorage} from "../../Schemas/step1schema.tsx"
import {options} from "../../Schemas/step1schema.tsx"
import {OptionQ} from "../../Schemas/step1schema.tsx"
import Button from '../Button/Button.tsx'




interface QuestionItemProps {
  question: QuestionStorage;
  options: OptionQ;
  selectedValue: string;
  onSelect: (questionId: number, value: string) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, options, selectedValue,onSelect }) => {

  console.log(question.optId)

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
                      bgColor={selectedValue === option.value ? "green" : "gray"}
                      color="white-color"
                      onClick={() => onSelect(question.id, option.value)}
                      />
                  ))}
                  </div>
            </div>
    </div>
  );
};

export default QuestionItem;
