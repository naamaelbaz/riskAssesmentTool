import React from 'react';
import './SideBar.css';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import ConstructionIcon from '@mui/icons-material/Construction';
import MenuIcon from '@mui/icons-material/Menu';

interface Domain {
  id: number;
  value: string;
}

interface SidebarProgressProps {
  domainList: Domain[];
  currentDomain: string;
  onDomainChange: (domain: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const getIconByDomain = (domain: string, color: string) => {
  switch (domain) {
    case "Impact":
      return <CrisisAlertIcon data-testid="CrisisAlertIcon" style={{ color }} />;
    case "Capability":  // FIXED typo here
      return <ConstructionIcon data-testid="ConstructionIcon" style={{ color }} />;
    case "Model Type & Risk":
      return <ModelTrainingIcon data-testid="ModelTrainingIcon" style={{ color }} />;
    default:
      return null;
  }
};

const SidebarProgress: React.FC<SidebarProgressProps> = ({
  domainList,
  currentDomain,
  onDomainChange,
  isOpen,
  onToggle
}) => {
  return (
    <div className={`sidebar-container ${isOpen ? '' : 'closed'}`}>
      <div className="sidebar-header">
        <MenuIcon data-testid="MenuIcon" onClick={onToggle} className="menu-icon" />
      </div>
      <div className="sidebar-content">
        {domainList.map((domain) => {
          const isActive = currentDomain === domain.value;
          const iconColor = isActive ? '#fff' : '#e5e5e5';
          return (
            <div
              key={domain.id}
              className={`step ${isActive ? 'current' : ''}`}
              onClick={() => onDomainChange(domain.value)}
            >
              <div className="step-icon">{getIconByDomain(domain.value, iconColor)}</div>
              {isOpen && <div className="step-label">{domain.value}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarProgress;
