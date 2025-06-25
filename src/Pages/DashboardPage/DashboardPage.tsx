

import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import Header from "../../components/Header/Header.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import PieAnimation from "../../components/Heatmap/Heatmap.tsx"

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
  attack_name: string;
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
    case "Integrity": return "Integrity Distribution";
    case "Availability": return "Availability Distribution";
    case "Privacy": return "Privacy Distribution";
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
interface AIMitigationResponse {
  strategy: string;
}

const fetchMitigationsFromAI = async (riskName: string) => {
  try {
    const response = await fetch("http://localhost:5000/mitigation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ risk: riskName }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    if (data.mitigation) {
      return data.mitigation;
    } else {
      throw new Error(data.error || "Invalid response from server");
    }
  } catch (error) {
    console.error("Error fetching AI mitigation strategy:", error);
    throw error;
  }
};




// Define DashboardPage component
const DashboardPage: React.FC<DashboardPageProps> = ({ data }) => {

 
  // Enhanced attack data with unique IDs if they don't exist
  const attackTypes: AttackData[] = (data.attacks || []).map((attack, index) => ({
    ...attack,
    attackId: attack.attackId || `attack-${index + 1}`
  }));


// 1. Function to infer attack type from attack name
const inferAttackType = (attackName: string): string => {
  const name = attackName.toLowerCase();

  if (name.includes("poisoning")) return "Data Poisoning";
  if (name.includes("evasion") || name.includes("misclassification")) return "Evasion Attack";
  if (name.includes("reconstruction")) return "Data Reconstruction";
  if (name.includes("integrity")) return "Integrity Attack";
  if (name.includes("privacy")) return "Privacy Attack";
  if (name.includes("targeted")) return "Targeted Attack";
  if (name.includes("black box")) return "Black Box Attack";
  if (name.includes("white box")) return "White Box Attack";
  
  // Add more heuristics as needed
  
  return "Other";
};

// 2. Create array of inferred attack types
const inferredAttackTypes = attackTypes.map(attack => ({
  attackId: attack.attackId,
  attack_name: attack.attack_name,
  attackType: inferAttackType(attack.attack_name),
}));

// 3. Count occurrences of each attack type for heatmap data
const heatmapData = inferredAttackTypes.reduce<Record<string, number>>((acc, curr) => {
  acc[curr.attackType] = (acc[curr.attackType] || 0) + 1;
  return acc;
}, {});
  
console.log(attackTypes,"types")
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




 
 

  // Calculate percentage for objective charts
  const totalAttacks = Object.values(objectiveScores).reduce(
    (sum, list) => sum + list.length,
    0
  );
  
  const integrityPercentage = totalAttacks > 0
    ? Math.round((objectiveScores.Integrity.length / totalAttacks) * 100)
    : 0;
  
  const availabilityPercentage = totalAttacks > 0
    ? Math.round((objectiveScores.Availability.length / totalAttacks) * 100)
    : 0;
  
  const privacyPercentage = totalAttacks > 0
    ? Math.round((objectiveScores.Privacy.length / totalAttacks) * 100)
    : 0;

  // Calculate stroke-dashoffset for circular charts
  const calculateStrokeDashoffset = (percentage: number) => {
     const radius = 45;
     const circumference = 2 * Math.PI * radius;
    return circumference - (percentage / 100) * circumference;
};


const [loadingImplementation, setLoadingImplementation] = useState(false); 
const [loadingMit, setLoadingMit] = useState(false);

  // Handle attack selection for drill-down
const handleAttackSelect = async (attack: AttackData) => {
  setLoadingMit(true);
  setSelectedAttack(attack);
  setViewMode('mitigations');
 
  try {
    const res = await fetch('http://localhost:5000/defenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ risk: attack.attack_name }),
    });

    const data = await res.json();
    console.log(data)
    // Defensive check
    if (!data.mitigation || !Array.isArray(data.mitigation.mitigationList)) {
      console.error("Invalid mitigation response: ", data);
      setLoadingMit(false);
      return;
    }

    const mitigationList = data.mitigation.mitigationList;

    // Log or use each mitigation object as needed
    console.log("Received mitigations:", mitigationList);

    // Assuming you want to display all mitigations
    setMitigations(mitigationList);  // <-- show all as cards or in a list
    // setSelectedMitigation(mitigationList[0] || null);  // <-- show first as default
  } catch (err) {
    console.error("Error fetching mitigations:", err);
  } finally {
    setLoadingMit(false);
  }
};


  // Handle mitigation selection
  
const handleMitigationSelect = async (riskName: string) => {
  setLoadingImplementation(true);
  setSelectedMitigation(null);
  setImplementation([]);

  try {
    const response = await fetch("http://localhost:5000/mitigation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ risk: riskName })
    });

    const data = await response.json();

    if (data.mitigation && Array.isArray(data.mitigation.implementationSteps)) {
      const mitigation: Mitigation = {
        ...data.mitigation,
        applicableAttacks: [riskName]
      };

      setSelectedMitigation(mitigation);
      setImplementation([mitigation]);
      // ❌ DO NOT SET viewMode HERE!
    } else {
      console.error("Invalid mitigation response: ", data);
    }
  } catch (error) {
    console.error("Error fetching mitigation strategy:", error);
  } finally {
    // simulate delay if needed: await new Promise((res) => setTimeout(res, 200));
    setLoadingImplementation(false); // Trigger the transition
  }
};

useEffect(() => {
  if (!loadingImplementation && selectedMitigation) {
    setViewMode('implementation');
  }
}, [loadingImplementation, selectedMitigation]);

  // Return to mitigations view
  const handleBackToMitigations = () => {
    setViewMode('mitigations');
    setSelectedMitigation(null);
  };

  // Return to overview
  const handleBackToOverview = () => {
    setViewMode('overview');
    setSelectedAttack(null);
    setSelectedMitigation(null);
  };
const [mitigations, setMitigations] = useState<Mitigation[]>([]);
const [implementation, setImplementation] = useState<Mitigation[]>([]);

// Inside your component:
const [animatedPercentage, setAnimatedPercentage] = useState<{ [key: string]: number }>({
  Integrity: 0,
  Availability: 0,
  Privacy: 0
});

useEffect(() => {
  const timeout = setTimeout(() => {
    setAnimatedPercentage({
      Integrity: integrityPercentage,
      Availability: availabilityPercentage,
      Privacy: privacyPercentage
    });
  }, 300); // slight delay triggers animation

  return () => clearTimeout(timeout);
}, [integrityPercentage, availabilityPercentage, privacyPercentage]);


const renderMitigationView = () => {
  if (!selectedAttack) return null;

  if (loadingMit) {
    return (
      <div className="mitigation-drilldown">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mitigation-drilldown">
      <div className="drilldown-header">
        <button className="back-button" onClick={handleBackToOverview}>
          ← Back to Dashboard
        </button>
        <h2>Defense Strategies for: {selectedAttack.attack_name}</h2>
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
              // onClick={() => handleMitigationSelect(mitigation.name)}
            >
              <div className="mitigation-header">
                <h4>{mitigation.name}</h4>
                <div className={`effectiveness-badge ${getEffectivenessColor(mitigation.effectivenessScore)}`}>
                  Effectiveness: {Number(mitigation.effectivenessScore).toFixed(1)}
                </div>
              </div>
              <p className="mitigation-description">{mitigation.description}</p>
              <div className="mitigation-footer">
                <div className={`resource-badge resource-${mitigation.resourceRequirement.toLowerCase()}`}>
                  Resource: {mitigation.resourceRequirement}
                </div>
                <button onClick={() => handleMitigationSelect(mitigation.name)} className="view-steps-btn">
                  View Implementation Steps
                </button>
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
  
    console.log(loadingImplementation, "lm")
  if (loadingImplementation) {
    return (
      <div className="implementation-drilldown">
        <Loader />
      </div>
    );
  }

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
          <h3 data-testid="Mitigation">Mitigation Summary</h3>
          <div className={`effectiveness-badge ${getEffectivenessColor(selectedMitigation.effectivenessScore)}`}>
            Overall Effectiveness: {Number(selectedMitigation.effectivenessScore.toFixed(1))}
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
            <span className="value">{selectedAttack.attack_name}</span>
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
      <div data-testid="dashboard" className="dashboard-header">
        <h1>ML Security Risk Dashboard</h1>
    
      </div>

      <div className="dashboard-summary">
        <div className="summary-panel">
          <h2>Risk Summary</h2>
          <div className="risk-overview">
            <div className="risk-score">
                <PieAnimation attackTypes={attackTypes}/>  
            </div>
            
          </div>
        </div>

        <div className="objective-panels">
          {Object.keys(objectiveScores).map((objective) => {
             const percentage = animatedPercentage[objective];
            // const percentage =
            // objective === "Integrity"
            //   ? integrityPercentage
            //   : objective === "Availability"
            //   ? availabilityPercentage
            //   : privacyPercentage;

          return (
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
                    stroke={
                          objective === "Integrity" 
                            ? "#a5cbf9"
                            : objective === "Privacy"
                            ? "#0d9488"
                            : "#fef3c7"
                      }
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={calculateStrokeDashoffset(percentage)}
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />

                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="20"
                    fontWeight="bold"
                  >
                    {percentage}%
                  </text>
                </svg>
              </div>
              <div className="objective-info">
                <div className="objective-artifact">
                  {getArtifactName(objective)}
                </div>
            
              </div>
            </div>
          );
        })}
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
          
          >
            <div className="attack-name">{attack.attack_name}</div>
            <div className="attack-objective">{attack.objective}</div>

            {/* Risk bar here */}
            <div className="risk-bar-container">
              <div
                className={`risk-bar ${attack.score >= 8 ? 'critical' :  attack.score>=5 ? 'med' : ''}`}
                style={{ width: `${attack.score * 10}%` }} // because score is 0-10
              ></div>
            </div>
            <div className="risk-value">{attack.score.toFixed(1)}/10</div>

            <button onClick={() => handleAttackSelect(attack)} className="attack-action">Mitigate</button>
          </div>
             ))}

          </div>
        </div>

        {/* <div className="side-panels">
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
          </div> */}

          {/* <div className="side-panel">
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
          </div> */}
        {/* </div> */}
      </div>
    </div>
    </div>
  );
};

export default DashboardPage;


