import React from 'react';
import { Controller } from 'react-hook-form';
import './QuetionItem.css';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import Tooltip from '@mui/material/Tooltip';
interface Question {
  id: number;
  question: string;
  example: string;
}

interface QuestionItemProps {
  question: Question;
  control: any; // Replace 'any' with the appropriate type from react-hook-form
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, control }) => (
  <div className="card">
    <div className="card-header">
      <Tooltip title={question.example}>
      <div className="icon"><PsychologyAltRoundedIcon/></div>
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

export default QuestionItem;
