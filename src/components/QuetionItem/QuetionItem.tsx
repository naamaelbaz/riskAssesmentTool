import React from 'react';
import './QuetionItem.css';
import Tooltip from '@mui/material/Tooltip';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import DropDown from '../DropDown/DropDown.tsx';
import { OptionQ, QuestionStorage } from '../../Schemas/step1schema.tsx';

interface QuestionItemProps {
  question: QuestionStorage;
  options: OptionQ;
  selectedValue: string;
  onSelect: (questionId: string, value: string[]) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, options, selectedValue, onSelect }) => {

  const handleSelect = (value: string[]) => {
    onSelect(question.id, value);
  };
  const filteredQuestion = () => {
    const original = question.question;
    
    if (original.includes(":")) {
      // Split once at the first colon and return the part after it (trimmed)
      return original.split(":").slice(1).join(":").trim();
    }
  
    // Return original if there's no colon
    return original;
  };
  
  return (
    <div className="question-card">
      <div className="question-row">
        <div className="question-cell">
          <div className="question-icon-text">
            <Tooltip title={question.example}>
              <span className="icon"><PsychologyAltRoundedIcon /></span>
            </Tooltip>
            <span className="question-text">{filteredQuestion()}</span>
          </div>
        </div>
        <div className="dropdown-cell">
          <DropDown options={options} onSelect={handleSelect} title="Select option" selVal={selectedValue} multiSelect={question.multi} />
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
