

import React, { useState } from "react";
import "./DashboardPage.css";
import attacksData from '../../data/aml-attacks-data.json';
import mitigationsData from '../../data/mitigations-data.json';
import Header from "../../components/Header/Header.tsx";

// Enhanced type definitions
interface MitigationStep {
  step: string;
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
  effectivenessScore: number;
}

interface Mitigation {
  name: string;
  description: string;
  implementationSteps: MitigationStep[];
  effectivenessScore: number;
  resourceRequirement: 'Low' | 'Medium' | 'High';
  applicableAttacks: string[]; // Array of attack IDs this mitigation applies to
}

// Define Interfaces
interface AttackData {
  attack: string;
  objective: string;
  score: number;
  description?: string;
  attackId?: string;
}

interface DashboardPageProps {
  data?: any; // Optional since we're using imported data
}

// Utility function to determine score color
const getScoreColor = (score: number): string => {
  if (score >= 7) return "high";
  if (score >= 6) return "medium";
  return "low";
};

// Get icon class based on objective
const getIconClass = (objective: string): string => {
  switch(objective) {
    case "Integrity": return "icon-protection";
    case "Availability": return "icon-shield";
    case "Privacy": return "icon-tool";
    default: return "icon-protection";
  }
};

// Get artifact name based on objective
const getArtifactName = (objective: string): string => {
  switch(objective) {
    case "Integrity": return "Data Protection";
    case "Availability": return "Security Shield";
    case "Privacy": return "Data Privacy Tool";
    default: return "Protection Tool";
  }
};

// Risk level determination function
const getRiskLevel = (score: number): string => {
  if (score >= 7) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 5) return 'Medium';
  if (score < 5) return 'Low';
  return 'Unknown';
};

// Get effectiveness level
const getEffectivenessLevel = (score: number): string => {
  if (score >= 8) return 'Very High';
  if (score >= 6) return 'High';
  if (score >= 4) return 'Medium';
  if (score >= 2) return 'Low';
  return 'Very Low';
};

// Get effectiveness color
const getEffectivenessColor = (score: number): string => {
  if (score >= 8) return 'effectiveness-very-high';
  if (score >= 6) return 'effectiveness-high';
  if (score >= 4) return 'effectiveness-medium';
  if (score >= 2) return 'effectiveness-low';
  return 'effectiveness-very-low';
};

// Function to get mitigations for a specific attack
const getMitigationsForAttack = (attackId: string): Mitigation[] => {
  // Filter mitigations that apply to this attack by checking the applicableAttacks array
  return mitigationsData.filter(
    (mitigation: Mitigation) =>
      mitigation.applicableAttacks &&
      mitigation.applicableAttacks.includes(attackId)
  );
};

// Define DashboardPage component
const DashboardPage: React.FC<DashboardPageProps> = ({ data }) => {
  const [refreshing, setRefreshing] = useState(false);

  // Enhanced attack data with unique IDs if they don't exist
  const attackTypes: AttackData[] = attacksData.map((attack: AttackData, index: number) => ({
    ...attack,
    attackId: attack.attackId || `attack-${index + 1}`
  }));

  // State for selected attack and mitigation for drill-down view
  const [selectedAttack, setSelectedAttack] = useState<AttackData | null>(null);
  const [selectedMitigation, setSelectedMitigation] = useState<Mitigation | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'mitigations' | 'implementation'>('overview');

  // Calculate overall risk score (average of all scores)
  const overallRiskScore = parseFloat(
    (attackTypes.reduce((sum, attack) => sum + attack.score, 0) / attackTypes.length).toFixed(3)
  );

  // Calculate objective-specific risk scores
  const objectiveScores = {
    Integrity: attackTypes.filter(a => a.objective === "Integrity"),
    Availability: attackTypes.filter(a => a.objective === "Availability"),
    Privacy: attackTypes.filter(a => a.objective === "Privacy")
  };

  // Calculate average scores for each objective
  const integrityScore = objectiveScores.Integrity.length > 0 ?
    parseFloat((objectiveScores.Integrity.reduce((sum, a) => sum + a.score, 0) / objectiveScores.Integrity.length).toFixed(3)) : 0;

  const availabilityScore = objectiveScores.Availability.length > 0 ?
    parseFloat((objectiveScores.Availability.reduce((sum, a) => sum + a.score, 0) / objectiveScores.Availability.length).toFixed(3)) : 0;

  const privacyScore = objectiveScores.Privacy.length > 0 ?
    parseFloat((objectiveScores.Privacy.reduce((sum, a) => sum + a.score, 0) / objectiveScores.Privacy.length).toFixed(3)) : 0;

  // Dynamic model risk items based on attack objectives
  const modelRiskItems = [
    { name: "Attack Resistance", value: Math.round(10 - overallRiskScore), critical: overallRiskScore > 7 },
    { name: "Integrity Defense", value: Math.round(10 - integrityScore), critical: integrityScore > 7 },
    { name: "Availability Defense", value: Math.round(10 - availabilityScore), critical: availabilityScore > 7 },
    { name: "Privacy Defense", value: Math.round(10 - privacyScore), critical: privacyScore > 7 },
    { name: "Model Robustness", value: Math.round((10 - overallRiskScore) * 0.8), critical: overallRiskScore > 7 }
  ];

  // Calculate defense probabilities based on risk scores
  const defenseProbabilities = [
    {
      name: "Attack Detection",
      probability: Math.round(100 - (overallRiskScore * 10))
    },
    {
      name: "Attack Mitigation",
      probability: Math.round(90 - (overallRiskScore * 9))
    }
  ];

  // Risk metrics derived from attack data
  const riskMetrics = [
    {
      title: "Overall Risk Score",
      value: overallRiskScore.toFixed(2),
      change: overallRiskScore > 6 ? "+0.3" : "-0.2",
      up: overallRiskScore > 6
    },
    {
      title: "Integrity Risk",
      value: integrityScore.toFixed(2),
      change: integrityScore > 6 ? "+0.4" : "-0.1",
      up: integrityScore > 6
    },
    {
      title: "Availability Risk",
      value: availabilityScore > 0 ? availabilityScore.toFixed(2) : "N/A",
      change: availabilityScore > 6 ? "+0.2" : "-0.3",
      up: availabilityScore > 6
    },
    {
      title: "Privacy Risk",
      value: privacyScore > 0 ? privacyScore.toFixed(2) : "N/A",
      change: privacyScore > 6 ? "+0.3" : "-0.2",
      up: privacyScore > 6
    }
  ];

  // Handle refreshing data (for demo purposes)
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);  // Simulate refreshing
  };

  // Calculate percentage for objective charts
  const getObjectivePercentage = (objective: string): number => {
    switch(objective) {
      case "Integrity":
        return integrityScore > 0 ? Math.round((integrityScore / 10) * 100) : 0;
      case "Availability":
        return availabilityScore > 0 ? Math.round((availabilityScore / 10) * 100) : 0;
      case "Privacy":
        return privacyScore > 0 ? Math.round((privacyScore / 10) * 100) : 0;
      default:
        return 0;
    }
  };

  // Calculate stroke-dashoffset for circular charts
  const calculateStrokeDashoffset = (percentage: number): string => {
    const circumference = 2 * Math.PI * 45; // 2πr where r=45
    return String((100 - percentage) / 100 * circumference);
  };

  // Handle attack selection for drill-down
  const handleAttackSelect = (attack: AttackData) => {
    setSelectedAttack(attack);
    setViewMode('mitigations');

    // Get mitigations for this attack using the attackId
    const mitigationsForAttack = getMitigationsForAttack(attack.attackId || '');

    // Set the first mitigation as selected if available
    if (mitigationsForAttack.length > 0) {
      setSelectedMitigation(mitigationsForAttack[0]);
    } else {
      setSelectedMitigation(null);
    }
  };

  // Handle mitigation selection
  const handleMitigationSelect = (mitigation: Mitigation) => {
    setSelectedMitigation(mitigation);
    setViewMode('implementation');
  };

  // Return to mitigations view
  const handleBackToMitigations = () => {
    setViewMode('mitigations');
  };

  // Return to overview
  const handleBackToOverview = () => {
    setViewMode('overview');
    setSelectedAttack(null);
    setSelectedMitigation(null);
  };

  // Render mitigation drilldown view
  const renderMitigationView = () => {
    if (!selectedAttack) return null;

    const mitigations = getMitigationsForAttack(selectedAttack.attackId || '');

    return (
      <div className="mitigation-drilldown">
        <div className="drilldown-header">
          <button className="back-button" onClick={handleBackToOverview}>
            ← Back to Dashboard
          </button>
          <h2>Defense Strategies for: {selectedAttack.attack}</h2>
        </div>

        <div className="attack-details">
          <div className="attack-info">
            <div className="attack-info-item">
              <span className="label">Risk Score:</span>
              <span className={`value ${getScoreColor(selectedAttack.score)}`}>{selectedAttack.score.toFixed(1)}</span>
            </div>
            <div className="attack-info-item">
              <span className="label">Risk Level:</span>
              <span className={`value ${getScoreColor(selectedAttack.score)}`}>{getRiskLevel(selectedAttack.score)}</span>
            </div>
            <div className="attack-info-item">
              <span className="label">Objective:</span>
              <span className="value">{selectedAttack.objective}</span>
            </div>
          </div>

          {selectedAttack.description && (
            <div className="attack-description">{selectedAttack.description}</div>
          )}
        </div>

        <div className="mitigations-container">
          <h3>Available Mitigations ({mitigations.length})</h3>
          <div className="mitigations-grid">
            {mitigations.map((mitigation, index) => (
              <div
                key={index}
                className={`mitigation-card ${selectedMitigation === mitigation ? 'active' : ''}`}
                onClick={() => handleMitigationSelect(mitigation)}
              >
                <div className="mitigation-header">
                  <h4>{mitigation.name}</h4>
                  <div className={`effectiveness-badge ${getEffectivenessColor(mitigation.effectivenessScore)}`}>
                    Effectiveness: {mitigation.effectivenessScore.toFixed(1)}
                  </div>
                </div>
                <p className="mitigation-description">{mitigation.description}</p>
                <div className="mitigation-footer">
                  <div className={`resource-badge resource-${mitigation.resourceRequirement.toLowerCase()}`}>
                    Resource: {mitigation.resourceRequirement}
                  </div>
                  <button className="view-steps-btn">View Implementation Steps</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render implementation steps view
  const renderImplementationView = () => {
    if (!selectedAttack || !selectedMitigation) return null;

    return (
      <div className="implementation-drilldown">
        <div className="drilldown-header">
          <button className="back-button" onClick={handleBackToMitigations}>
            ← Back to Mitigations
          </button>
          <h2>Implementation Steps: {selectedMitigation.name}</h2>
        </div>

        <div className="implementation-summary">
          <div className="summary-header">
            <h3>Mitigation Summary</h3>
            <div className={`effectiveness-badge ${getEffectivenessColor(selectedMitigation.effectivenessScore)}`}>
              Overall Effectiveness: {selectedMitigation.effectivenessScore.toFixed(1)}
            </div>
          </div>
          <p className="summary-description">{selectedMitigation.description}</p>
          <div className="summary-metrics">
            <div className="metric">
              <span className="label">Resource Requirement:</span>
              <span className={`value resource-${selectedMitigation.resourceRequirement.toLowerCase()}`}>
                {selectedMitigation.resourceRequirement}
              </span>
            </div>
            <div className="metric">
              <span className="label">Steps Count:</span>
              <span className="value">{selectedMitigation.implementationSteps.length}</span>
            </div>
            <div className="metric">
              <span className="label">For Attack:</span>
              <span className="value">{selectedAttack.attack}</span>
            </div>
            <div className="metric">
              <span className="label">Applied To:</span>
              <span className="value">
                {selectedMitigation.applicableAttacks && selectedMitigation.applicableAttacks.length > 1
                  ? `${selectedMitigation.applicableAttacks.length} attack types`
                  : '1 attack type'}
              </span>
            </div>
          </div>
        </div>

        <div className="implementation-steps">
          <h3>Implementation Steps</h3>
          <div className="steps-list">
            {selectedMitigation.implementationSteps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h4 className="step-title">{step.step}</h4>
                  <p className="step-description">{step.description}</p>
                  <div className="step-metrics">
                    <div className={`complexity-badge complexity-${step.complexity.toLowerCase()}`}>
                      Complexity: {step.complexity}
                    </div>
                    <div className={`effectiveness-badge ${getEffectivenessColor(step.effectivenessScore)}`}>
                      Effectiveness: {step.effectivenessScore.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render based on current view mode
  if (viewMode === 'mitigations') {
    return renderMitigationView();
  } else if (viewMode === 'implementation') {
    return renderImplementationView();
  }

  // Default overview rendering
  return (
    <div>
        <Header></Header>
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>ML Security Risk Dashboard</h1>
        <button className={`refresh-button ${refreshing ? 'refreshing' : ''}`} onClick={handleRefresh}>
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="dashboard-summary">
        <div className="summary-panel">
          <h2>Risk Summary</h2>
          <div className="risk-overview">
            <div className="risk-score">
              <div className={`score-value ${getScoreColor(overallRiskScore)}`}>
                {overallRiskScore.toFixed(1)}
              </div>
              <div className="score-label">Overall Risk</div>
            </div>
            <div className="risk-level">
              <div className={`level-value ${getScoreColor(overallRiskScore)}`}>
                {getRiskLevel(overallRiskScore)}
              </div>
              <div className="level-label">Risk Level</div>
            </div>
          </div>
          <div className="risk-metrics">
            {riskMetrics.map((metric, index) => (
              <div className="metric-item" key={index}>
                <div className="metric-title">{metric.title}</div>
                <div className="metric-value">{metric.value}</div>
                <div className={`metric-change ${metric.up ? 'up' : 'down'}`}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="objective-panels">
          {Object.keys(objectiveScores).map((objective) => (
            <div className="objective-panel" key={objective}>
              <div className="objective-header">
                <div className={`objective-icon ${getIconClass(objective)}`}></div>
                <h3>{objective} Risk</h3>
              </div>
              <div className="objective-chart">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={getScoreColor(
                      objective === "Integrity"
                        ? integrityScore
                        : objective === "Availability"
                        ? availabilityScore
                        : privacyScore
                    )}
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={calculateStrokeDashoffset(
                      getObjectivePercentage(objective)
                    )}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="20"
                    fontWeight="bold"
                  >
                    {getObjectivePercentage(objective)}%
                  </text>
                </svg>
              </div>
              <div className="objective-info">
                <div className="objective-artifact">
                  {getArtifactName(objective)}
                </div>
                <div className="objective-actions">
                  <button className="action-button">Details</button>
                  <button className="action-button">Protect</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-main">
        <div className="main-panel">
          <h2>Detected Attack Vectors</h2>
          <div className="attack-list">
            {attackTypes.map((attack, index) => (
              <div
                className="attack-item"
                key={index}
                onClick={() => handleAttackSelect(attack)}
              >
                <div className="attack-name">{attack.attack}</div>
                <div className="attack-objective">{attack.objective}</div>
                <div className={`attack-score ${getScoreColor(attack.score)}`}>
                  {attack.score.toFixed(1)}
                </div>
                <div className={`attack-level ${getScoreColor(attack.score)}`}>
                  {getRiskLevel(attack.score)}
                </div>
                <button className="attack-action">Mitigate</button>
              </div>
            ))}
          </div>
        </div>

        <div className="side-panels">
          <div className="side-panel">
            <h3>Model Risk Analysis</h3>
            <div className="model-risk-list">
              {modelRiskItems.map((item, index) => (
                <div className="model-risk-item" key={index}>
                  <div className="risk-name">{item.name}</div>
                  <div className="risk-bar-container">
                    <div
                      className={`risk-bar ${item.critical ? 'critical' : ''}`}
                      style={{ width: `${item.value * 10}%` }}
                    ></div>
                  </div>
                  <div className="risk-value">{item.value}/10</div>
                </div>
              ))}
            </div>
          </div>

          <div className="side-panel">
            <h3>Defense Probabilities</h3>
            <div className="defense-list">
              {defenseProbabilities.map((defense, index) => (
                <div className="defense-item" key={index}>
                  <div className="defense-name">{defense.name}</div>
                  <div className="defense-probability">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle
                        cx="30"
                        cy="30"
                        r="25"
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth="5"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="25"
                        fill="none"
                        stroke={
                          defense.probability > 70
                            ? "#4caf50"
                            : defense.probability > 40
                            ? "#ff9800"
                            : "#f44336"
                        }
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 25}
                        strokeDashoffset={
                          ((100 - defense.probability) / 100) * (2 * Math.PI * 25)
                        }
                        transform="rotate(-90 30 30)"
                      />
                      <text
                        x="30"
                        y="30"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {defense.probability}%
                      </text>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardPage;
