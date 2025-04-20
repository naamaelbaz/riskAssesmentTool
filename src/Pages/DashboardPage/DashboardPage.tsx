// import React, { useState, useEffect } from "react";
// import "./DashboardPage.css";
// import attacksData from '/Users/barel/Downloads/riskAssesmentToolUpdate/src/data/aml-attacks-data.json'; // Import your data
//
//
// // Define Interfaces
// interface AttackData {
//   attack: string;
//   objective: string;
//   score: number;
// }
//
// interface DashboardPageProps {
//   data?: any; // Optional since we're using imported data
// }
//
// // Utility function to determine score color
// const getScoreColor = (score: number): string => {
//   if (score >= 7) return "high";
//   if (score >= 6) return "medium";
//   return "low";
// };
//
// // Get icon class based on objective
// const getIconClass = (objective: string): string => {
//   switch(objective) {
//     case "Integrity": return "icon-protection";
//     case "Availability": return "icon-shield";
//     case "Privacy": return "icon-tool";
//     default: return "icon-protection";
//   }
// };
//
// // Get artifact name based on objective
// const getArtifactName = (objective: string): string => {
//   switch(objective) {
//     case "Integrity": return "Data Protection";
//     case "Availability": return "Security Shield";
//     case "Privacy": return "Data Privacy Tool";
//     default: return "Protection Tool";
//   }
// };
//
// // Define DashboardPage component
// const DashboardPage: React.FC<DashboardPageProps> = ({ data }) => {
//   const [refreshing, setRefreshing] = useState(false);
//
//   // Use the imported data from JSON file
//   const attackTypes: AttackData[] = attacksData;
//
//   // Calculate overall risk score (average of all scores)
//   const overallRiskScore = parseFloat(
//     (attackTypes.reduce((sum, attack) => sum + attack.score, 0) / attackTypes.length).toFixed(3)
//   );
//
//   // Calculate objective-specific risk scores
//   const objectiveScores = {
//     Integrity: attackTypes.filter(a => a.objective === "Integrity"),
//     Availability: attackTypes.filter(a => a.objective === "Availability"),
//     Privacy: attackTypes.filter(a => a.objective === "Privacy")
//   };
//
//   // Calculate average scores for each objective
//   const integrityScore = objectiveScores.Integrity.length > 0 ?
//     parseFloat((objectiveScores.Integrity.reduce((sum, a) => sum + a.score, 0) / objectiveScores.Integrity.length).toFixed(3)) : 0;
//
//   const availabilityScore = objectiveScores.Availability.length > 0 ?
//     parseFloat((objectiveScores.Availability.reduce((sum, a) => sum + a.score, 0) / objectiveScores.Availability.length).toFixed(3)) : 0;
//
//   const privacyScore = objectiveScores.Privacy.length > 0 ?
//     parseFloat((objectiveScores.Privacy.reduce((sum, a) => sum + a.score, 0) / objectiveScores.Privacy.length).toFixed(3)) : 0;
//
//   // Dynamic model risk items based on attack objectives
//   const modelRiskItems = [
//     { name: "Attack Resistance", value: Math.round(10 - overallRiskScore), critical: overallRiskScore > 7 },
//     { name: "Integrity Defense", value: Math.round(10 - integrityScore), critical: integrityScore > 7 },
//     { name: "Availability Defense", value: Math.round(10 - availabilityScore), critical: availabilityScore > 7 },
//     { name: "Privacy Defense", value: Math.round(10 - privacyScore), critical: privacyScore > 7 },
//     { name: "Model Robustness", value: Math.round((10 - overallRiskScore) * 0.8), critical: overallRiskScore > 7 }
//   ];
//
//   // Calculate defense probabilities based on risk scores
//   const defenseProbabilities = [
//     {
//       name: "Attack Detection",
//       probability: Math.round(100 - (overallRiskScore * 10))
//     },
//     {
//       name: "Attack Mitigation",
//       probability: Math.round(90 - (overallRiskScore * 9))
//     }
//   ];
//
//   // Risk metrics derived from attack data
//   const riskMetrics = [
//     {
//       title: "Overall Risk Score",
//       value: overallRiskScore.toFixed(2),
//       change: overallRiskScore > 6 ? "+0.3" : "-0.2",
//       up: overallRiskScore > 6
//     },
//     {
//       title: "Integrity Risk",
//       value: integrityScore.toFixed(2),
//       change: integrityScore > 6 ? "+0.4" : "-0.1",
//       up: integrityScore > 6
//     },
//     {
//       title: "Availability Risk",
//       value: availabilityScore > 0 ? availabilityScore.toFixed(2) : "N/A",
//       change: availabilityScore > 6 ? "+0.2" : "-0.3",
//       up: availabilityScore > 6
//     },
//     {
//       title: "Privacy Risk",
//       value: privacyScore > 0 ? privacyScore.toFixed(2) : "N/A",
//       change: privacyScore > 6 ? "+0.3" : "-0.2",
//       up: privacyScore > 6
//     }
//   ];
//
//   // Handle refreshing data (for demo purposes)
//   const handleRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => setRefreshing(false), 2000);  // Simulate refreshing
//   };
//
//   // Calculate percentage for objective charts
//   const getObjectivePercentage = (objective: string): number => {
//     switch(objective) {
//       case "Integrity":
//         return integrityScore > 0 ? Math.round((integrityScore / 10) * 100) : 0;
//       case "Availability":
//         return availabilityScore > 0 ? Math.round((availabilityScore / 10) * 100) : 0;
//       case "Privacy":
//         return privacyScore > 0 ? Math.round((privacyScore / 10) * 100) : 0;
//       default:
//         return 0;
//     }
//   };
//
//   // Calculate stroke-dashoffset for circular charts
//   const calculateStrokeDashoffset = (percentage: number): string => {
//     const circumference = 2 * Math.PI * 45; // 2πr where r=45
//     return String((100 - percentage) / 100 * circumference);
//   };
//
//   // JSX Rendering
//   return (
//     <div className="dash-container">
//       <div className="dashboard-header">
//         <div className="dashboard-title">ML Risk Assessment - AML Defense</div>
//         <div className="dashboard-actions">
//           <button className="action-button" onClick={() => console.log("Exporting Report")}>
//             <span>Export Report</span>
//           </button>
//           <button className="action-button refresh-button" onClick={handleRefresh}>
//             <span>{refreshing ? "Refreshing..." : "Refresh Analysis"}</span>
//           </button>
//         </div>
//       </div>
//
//       {/* Risk Metrics Section */}
//       <div className="metrics-container">
//         {riskMetrics.map((metric, index) => (
//           <div key={index} className="metric-card">
//             <div className="metric-title">{metric.title}</div>
//             <div className="metric-value">{metric.value}</div>
//             <div className={`metric-change ${metric.up ? 'change-up' : 'change-down'}`}>
//               {metric.change}
//             </div>
//           </div>
//         ))}
//       </div>
//
//       {/* Attack Vulnerabilities */}
//       <div className="attack-container">
//         <div style={{ flex: 1 }}>
//           <div className="attack-scores">
//             <div className="score-card">
//               <div className="score-label">Overall Risk</div>
//               <div className={`score ${getScoreColor(overallRiskScore)}`}>
//                 <div className="score-title">Risk Score</div>
//                 <div className="score-value">{overallRiskScore}</div>
//               </div>
//             </div>
//             <div className="score-card">
//               <div className="score-label">Integrity Risk</div>
//               <div className={`score ${getScoreColor(integrityScore)}`}>
//                 <div className="score-title">Risk Score</div>
//                 <div className="score-value">{integrityScore}</div>
//               </div>
//             </div>
//             {availabilityScore > 0 && (
//               <div className="score-card">
//                 <div className="score-label">Availability Risk</div>
//                 <div className={`score ${getScoreColor(availabilityScore)}`}>
//                   <div className="score-title">Risk Score</div>
//                   <div className="score-value">{availabilityScore}</div>
//                 </div>
//               </div>
//             )}
//             {privacyScore > 0 && (
//               <div className="score-card">
//                 <div className="score-label">Privacy Risk</div>
//                 <div className={`score ${getScoreColor(privacyScore)}`}>
//                   <div className="score-title">Risk Score</div>
//                   <div className="score-value">{privacyScore}</div>
//                 </div>
//               </div>
//             )}
//           </div>
//
//           <div className="attack-res">
//             <div className="attack-header">
//               <div className="attack-title">AML ATTACK VULNERABILITY SCORES</div>
//               <div className="attack-legend">
//                 <div className="legend-item">
//                   <div className="legend-color" style={{ backgroundColor: "#e53935" }}></div>
//                   <div>Critical</div>
//                 </div>
//                 <div className="legend-item">
//                   <div className="legend-color" style={{ backgroundColor: "#fb8c00" }}></div>
//                   <div>High</div>
//                 </div>
//                 <div className="legend-item">
//                   <div className="legend-color" style={{ backgroundColor: "#ffb74d" }}></div>
//                   <div>Medium</div>
//                 </div>
//               </div>
//             </div>
//
//             <div className="attack-score-graph">
//               {attackTypes.map((attack, index) => (
//                 <div key={index} className="attack-bar">
//                   <div className="attack-name">{attack.attack.length > 30 ? `${attack.attack.substring(0, 30)}...` : attack.attack}</div>
//                   <div className="progress-bar-container">
//                     <div
//                       className={`progress-bar ${attack.score >= 7 ? 'attack5' : attack.score >= 6 ? 'attack4' : 'attack3'}`}
//                       style={{ width: `${(attack.score / 10) * 100}%` }}
//                     ></div>
//                     <div className="progress-bar-value">{attack.score}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//
//             <div className="x-axis-labels">
//               {[0, 2, 4, 6, 8, 10].map((num, index) => (
//                 <div key={index} className="x-axis-tick">{num}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//
//         {/* Model Risk Section */}
//         <div className="model-risk">
//           <div>
//             <div className="risk-title">MODEL RISK BY OBJECTIVES</div>
//             <div className="risk-description">Critical vulnerability areas for ML model in AML system</div>
//           </div>
//           <div className="model-risk-categories">
//             <div className="category-item integrity">Integrity</div>
//             {availabilityScore > 0 && (
//               <div className="category-item availability">Availability</div>
//             )}
//             {privacyScore > 0 && (
//               <div className="category-item privacy">Privacy</div>
//             )}
//           </div>
//
//           {/* Impact Charts */}
//           <div className="impact-charts">
//             <div className="impact-chart">
//               <div className="chart-title">INTEGRITY</div>
//               <svg className="chart-svg" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#bbdefb" strokeWidth="10"
//                   strokeDasharray="282.7" strokeDashoffset={calculateStrokeDashoffset(getObjectivePercentage("Integrity"))} />
//                 <text x="50" y="50" fontSize="24" textAnchor="middle" dy="8" fill="#333" fontWeight="bold">
//                   {getObjectivePercentage("Integrity")}%
//                 </text>
//               </svg>
//             </div>
//
//             {availabilityScore > 0 && (
//               <div className="impact-chart">
//                 <div className="chart-title">AVAILABILITY</div>
//                 <svg className="chart-svg" viewBox="0 0 100 100">
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#c8e6c9" strokeWidth="10"
//                     strokeDasharray="282.7" strokeDashoffset={calculateStrokeDashoffset(getObjectivePercentage("Availability"))} />
//                   <text x="50" y="50" fontSize="24" textAnchor="middle" dy="8" fill="#333" fontWeight="bold">
//                     {getObjectivePercentage("Availability")}%
//                   </text>
//                 </svg>
//               </div>
//             )}
//
//             {privacyScore > 0 && (
//               <div className="impact-chart">
//                 <div className="chart-title">PRIVACY</div>
//                 <svg className="chart-svg" viewBox="0 0 100 100">
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#f8bbd0" strokeWidth="10"
//                     strokeDasharray="282.7" strokeDashoffset={calculateStrokeDashoffset(getObjectivePercentage("Privacy"))} />
//                   <text x="50" y="50" fontSize="24" textAnchor="middle" dy="8" fill="#333" fontWeight="bold">
//                     {getObjectivePercentage("Privacy")}%
//                   </text>
//                 </svg>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//
//       {/* Defense Strategies */}
//       <div className="defense-strategies-container">
//         <div className="defense-header">
//           <div className="defense-title">Defense Strategies for AML Model</div>
//           <div className="defense-actions">
//             <button className="defense-action">Apply Mitigations</button>
//             <button className="defense-action">Export</button>
//           </div>
//         </div>
//
//         <div className="defense-content">
//           <div className="defense-model-risk">
//             <div className="defense-section-title">MODEL RISK BY DEFENSE</div>
//             {modelRiskItems.map((item, index) => (
//               <div key={index} className="model-risk-item">
//                 <div className="risk-name">{item.name}</div>
//                 <div className="risk-bar-container">
//                   <div className="risk-bar" style={{
//                     width: `${(item.value / 10) * 100}%`,
//                     backgroundColor: item.critical ? '#f44336' : '#fb8c00'
//                   }}></div>
//                 </div>
//                 <div className="risk-value">{item.value}</div>
//               </div>
//             ))}
//           </div>
//
//           <div className="defense-details">
//             {/* Defense Probability */}
//             <div className="defense-probability">
//               <div className="defense-section-title">DEFENSE PROBABILITY</div>
//               {defenseProbabilities.map((defense, index) => (
//                 <div key={index} className="defense-item">
//                   <div className="defense-name">{defense.name}</div>
//                   <div className="defense-bar-container">
//                     <div
//                       className={`defense-bar ${defense.probability > 60 ? 'defense-bar-high' : 'defense-bar-med'}`}
//                       style={{ width: `${defense.probability}%` }}
//                     ></div>
//                     <div className="defense-value">{defense.probability}%</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//
//             {/* Attack Mitigations */}
//             <div className="defense-attacks">
//               <div className="defense-section-title">ATTACK MITIGATIONS</div>
//               {attackTypes.map((attack, index) => (
//                 <div key={index} className="attack-row">
//                   <div className="attack-name-defense">
//                     {attack.attack.length > 20 ? `${attack.attack.substring(0, 20)}...` : attack.attack}
//                   </div>
//                   <div className="artifact-item">
//                     <div className={`artifact-icon ${getIconClass(attack.objective)}`}>
//                       {getIconClass(attack.objective) === "icon-protection" ? "P" :
//                        getIconClass(attack.objective) === "icon-tool" ? "T" : "S"}
//                     </div>
//                     <div className="artifact-name">{getArtifactName(attack.objective)}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default DashboardPage;
//
//
//
//
//
//



//
// import React, { useState, useEffect } from 'react';
// //import attacksData from './attacks-data.json';
// import "./DashboardPage.css";
// import attacksData from '/Users/barel/Downloads/riskAssesmentToolUpdate/src/data/aml-attacks-data.json'; // Import your data
//
// interface Attack {
//   attack: string;
//   objective: string;
//   score: number;
// }
//
// interface ScoreResult {
//   overallRiskScore: number;
//   integrityScore: number;
//   availabilityScore: number;
//   privacyScore: number;
//   objectiveGroups: {
//     Integrity: Attack[];
//     Availability: Attack[];
//     Privacy: Attack[];
//   };
// }
//
// interface RiskMetric {
//   title: string;
//   value: string;
//   change: string;
//   up: boolean;
// }
//
// interface ModelRiskItem {
//   name: string;
//   value: number;
//   critical: boolean;
// }
//
// interface DefenseProbability {
//   name: string;
//   probability: number;
// }
//
// const Dashboard = () => {
//   const [refreshing, setRefreshing] = useState(false);
//   const [scores, setScores] = useState<ScoreResult>({
//     overallRiskScore: 0,
//     integrityScore: 0,
//     availabilityScore: 0,
//     privacyScore: 0,
//     objectiveGroups: {
//       Integrity: [],
//       Availability: [],
//       Privacy: []
//     }
//   });
//   const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([]);
//   const [modelRiskItems, setModelRiskItems] = useState<ModelRiskItem[]>([]);
//   const [defenseProbabilities, setDefenseProbabilities] = useState<DefenseProbability[]>([]);
//
//   useEffect(() => {
//     calculateScores();
//   }, []);
//
//   // Calculate scores
//   const calculateScores = () => {
//     // Group attacks by objective
//     const objectiveGroups = {
//       Integrity: attacksData.filter(a => a.objective === "Integrity"),
//       Availability: attacksData.filter(a => a.objective === "Availability"),
//       Privacy: attacksData.filter(a => a.objective === "Privacy")
//     };
//
//     // Calculate average scores
//     const integrityScore = objectiveGroups.Integrity.length > 0 ?
//       parseFloat((objectiveGroups.Integrity.reduce((sum, a) => sum + a.score, 0) / objectiveGroups.Integrity.length).toFixed(3)) : 0;
//
//     const availabilityScore = objectiveGroups.Availability.length > 0 ?
//       parseFloat((objectiveGroups.Availability.reduce((sum, a) => sum + a.score, 0) / objectiveGroups.Availability.length).toFixed(3)) : 0;
//
//     const privacyScore = objectiveGroups.Privacy.length > 0 ?
//       parseFloat((objectiveGroups.Privacy.reduce((sum, a) => sum + a.score, 0) / objectiveGroups.Privacy.length).toFixed(3)) : 0;
//
//     // Calculate overall risk score (average of all scores)
//     const overallRiskScore = parseFloat(
//       (attacksData.reduce((sum, attack) => sum + attack.score, 0) / attacksData.length).toFixed(3)
//     );
//
//     const calculatedScores = {
//       overallRiskScore,
//       integrityScore,
//       availabilityScore,
//       privacyScore,
//       objectiveGroups
//     };
//
//     setScores(calculatedScores);
//
//     // Risk metrics derived from attack data
//     setRiskMetrics([
//       {
//         title: "Overall Risk Score",
//         value: calculatedScores.overallRiskScore.toFixed(2),
//         change: calculatedScores.overallRiskScore > 6 ? "+0.3" : "-0.2",
//         up: calculatedScores.overallRiskScore > 6
//       },
//       {
//         title: "Integrity Risk",
//         value: calculatedScores.integrityScore.toFixed(2),
//         change: calculatedScores.integrityScore > 6 ? "+0.4" : "-0.1",
//         up: calculatedScores.integrityScore > 6
//       },
//       {
//         title: "Availability Risk",
//         value: calculatedScores.availabilityScore > 0 ? calculatedScores.availabilityScore.toFixed(2) : "N/A",
//         change: calculatedScores.availabilityScore > 6 ? "+0.2" : "-0.3",
//         up: calculatedScores.availabilityScore > 6
//       },
//       {
//         title: "Privacy Risk",
//         value: calculatedScores.privacyScore > 0 ? calculatedScores.privacyScore.toFixed(2) : "N/A",
//         change: calculatedScores.privacyScore > 6 ? "+0.3" : "-0.2",
//         up: calculatedScores.privacyScore > 6
//       }
//     ]);
//
//     // Calculate model risk items based on attack objectives
//     setModelRiskItems([
//       { name: "Attack Resistance", value: Math.round(10 - calculatedScores.overallRiskScore), critical: calculatedScores.overallRiskScore > 7 },
//       { name: "Integrity Defense", value: Math.round(10 - calculatedScores.integrityScore), critical: calculatedScores.integrityScore > 7 },
//       { name: "Availability Defense", value: Math.round(10 - calculatedScores.availabilityScore), critical: calculatedScores.availabilityScore > 7 },
//       { name: "Privacy Defense", value: Math.round(10 - calculatedScores.privacyScore), critical: calculatedScores.privacyScore > 7 },
//       { name: "Model Robustness", value: Math.round((10 - calculatedScores.overallRiskScore) * 0.8), critical: calculatedScores.overallRiskScore > 7 }
//     ]);
//
//     // Calculate defense probabilities based on risk scores
//     setDefenseProbabilities([
//       {
//         name: "Attack Detection",
//         probability: Math.round(100 - (calculatedScores.overallRiskScore * 10))
//       },
//       {
//         name: "Attack Mitigation",
//         probability: Math.round(90 - (calculatedScores.overallRiskScore * 9))
//       }
//     ]);
//   };
//
//   // Get color based on score
//   const getScoreColor = (score: number): string => {
//     if (score >= 7) return "high";
//     if (score >= 6) return "medium";
//     return "low";
//   };
//
//   // Get icon class based on objective
//   const getIconClass = (objective: string): string => {
//     switch(objective) {
//       case "Integrity": return "icon-protection";
//       case "Availability": return "icon-shield";
//       case "Privacy": return "icon-tool";
//       default: return "icon-protection";
//     }
//   };
//
//   // Get artifact name based on objective
//   const getArtifactName = (objective: string): string => {
//     switch(objective) {
//       case "Integrity": return "Data Protection";
//       case "Availability": return "Security Shield";
//       case "Privacy": return "Data Privacy Tool";
//       default: return "Protection Tool";
//     }
//   };
//
//   // Calculate percentage for objective charts
//   const getObjectivePercentage = (objective: string): number => {
//     switch(objective) {
//       case "Integrity":
//         return scores.integrityScore > 0 ? Math.round((scores.integrityScore / 10) * 100) : 0;
//       case "Availability":
//         return scores.availabilityScore > 0 ? Math.round((scores.availabilityScore / 10) * 100) : 0;
//       case "Privacy":
//         return scores.privacyScore > 0 ? Math.round((scores.privacyScore / 10) * 100) : 0;
//       default:
//         return 0;
//     }
//   };
//
//   // Calculate stroke-dashoffset for circular charts
//   const calculateStrokeDashoffset = (percentage: number): string => {
//     const circumference = 2 * Math.PI * 45; // 2πr where r=45
//     return String((100 - percentage) / 100 * circumference);
//   };
//
//   // Handle refreshing data
//   const handleRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => {
//       calculateScores();
//       setRefreshing(false);
//     }, 2000);
//   };
//
//   return (
//     <div className="dash-container">
//       {/* Header */}
//       <div className="dashboard-header">
//         <div className="dashboard-title">ML Risk Assessment - AML Defense</div>
//         <div className="dashboard-actions">
//           <button className="action-button">
//             <span>Export Report</span>
//           </button>
//           <button className="action-button refresh-button" onClick={handleRefresh}>
//             <span>{refreshing ? "Refreshing..." : "Refresh Analysis"}</span>
//           </button>
//         </div>
//       </div>
//
//       {/* Risk Metrics Section */}
//       <div className="metrics-container">
//         {riskMetrics.map((metric, index) => (
//           <div key={index} className="metric-card">
//             <div className="metric-title">{metric.title}</div>
//             <div className="metric-value">{metric.value}</div>
//             <div className={`metric-change ${metric.up ? 'change-up' : 'change-down'}`}>
//               {metric.change}
//             </div>
//           </div>
//         ))}
//       </div>
//
//       {/* Attack Vulnerabilities */}
//       <div className="attack-container">
//         <div style={{ flex: 1 }}>
//           {/* Score Cards */}
//           <div className="attack-scores">
//             <div className="score-card">
//               <div className="score-label">Overall Risk</div>
//               <div className={`score ${getScoreColor(scores.overallRiskScore)}`}>
//                 <div className="score-title">Risk Score</div>
//                 <div className="score-value">{scores.overallRiskScore.toFixed(2)}</div>
//               </div>
//             </div>
//
//             <div className="score-card">
//               <div className="score-label">Integrity Risk</div>
//               <div className={`score ${getScoreColor(scores.integrityScore)}`}>
//                 <div className="score-title">Risk Score</div>
//                 <div className="score-value">{scores.integrityScore.toFixed(2)}</div>
//               </div>
//             </div>
//
//             {scores.availabilityScore > 0 && (
//               <div className="score-card">
//                 <div className="score-label">Availability Risk</div>
//                 <div className={`score ${getScoreColor(scores.availabilityScore)}`}>
//                   <div className="score-title">Risk Score</div>
//                   <div className="score-value">{scores.availabilityScore.toFixed(2)}</div>
//                 </div>
//               </div>
//             )}
//
//             {scores.privacyScore > 0 && (
//               <div className="score-card">
//                 <div className="score-label">Privacy Risk</div>
//                 <div className={`score ${getScoreColor(scores.privacyScore)}`}>
//                   <div className="score-title">Risk Score</div>
//                   <div className="score-value">{scores.privacyScore.toFixed(2)}</div>
//                 </div>
//               </div>
//             )}
//           </div>
//
//           {/* Attack Results */}
//           <div className="attack-res">
//             <div className="attack-header">
//               <div className="attack-title">AML ATTACK VULNERABILITY SCORES</div>
//               <div className="attack-legend">
//                 <div className="legend-item">
//                   <div className="legend-color" style={{ backgroundColor: "#e53935" }}></div>
//                   <div>Critical</div>
//                 </div>
//                 <div className="legend-item">
//                   <div className="legend-color" style={{ backgroundColor: "#fb8c00" }}></div>
//                   <div>High</div>
//                 </div>
//                 <div className="legend-item">
//                   <div className="legend-color" style={{ backgroundColor: "#ffb74d" }}></div>
//                   <div>Medium</div>
//                 </div>
//               </div>
//             </div>
//
//             <div className="attack-score-graph">
//               {attacksData.map((attack, index) => (
//                 <div key={index} className="attack-bar">
//                   <div className="attack-name" title={attack.attack}>
//                     {attack.attack.length > 30 ? `${attack.attack.substring(0, 30)}...` : attack.attack}
//                   </div>
//                   <div className="progress-bar-container">
//                     <div
//                       className={`progress-bar ${attack.score >= 7 ? 'attack5' : attack.score >= 6 ? 'attack4' : 'attack3'}`}
//                       style={{ width: `${(attack.score / 10) * 100}%` }}
//                     ></div>
//                     <div className="progress-bar-value">{attack.score.toFixed(2)}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//
//             <div className="x-axis-labels">
//               {[0, 2, 4, 6, 8, 10].map((num, index) => (
//                 <div key={index} className="x-axis-tick">{num}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//
//         {/* Model Risk Section */}
//         <div className="model-risk">
//           <div>
//             <div className="risk-title">MODEL RISK BY OBJECTIVES</div>
//             <div className="risk-description">Critical vulnerability areas for ML model in AML system</div>
//           </div>
//
//           <div className="model-risk-categories">
//             <div className="category-item integrity">Integrity</div>
//             {scores.availabilityScore > 0 && (
//               <div className="category-item availability">Availability</div>
//             )}
//             {scores.privacyScore > 0 && (
//               <div className="category-item privacy">Privacy</div>
//             )}
//           </div>
//
//           {/* Impact Charts */}
//           <div className="impact-charts">
//             <div className="impact-chart">
//               <div className="chart-title">INTEGRITY</div>
//               <svg className="chart-svg" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#bbdefb" strokeWidth="10"
//                   strokeDasharray="282.7" strokeDashoffset={calculateStrokeDashoffset(getObjectivePercentage("Integrity"))} />
//                 <text x="50" y="50" fontSize="24" textAnchor="middle" dy="8" fill="#333" fontWeight="bold">
//                   {getObjectivePercentage("Integrity")}%
//                 </text>
//               </svg>
//             </div>
//
//             {scores.availabilityScore > 0 && (
//               <div className="impact-chart">
//                 <div className="chart-title">AVAILABILITY</div>
//                 <svg className="chart-svg" viewBox="0 0 100 100">
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#c8e6c9" strokeWidth="10"
//                     strokeDasharray="282.7" strokeDashoffset={calculateStrokeDashoffset(getObjectivePercentage("Availability"))} />
//                   <text x="50" y="50" fontSize="24" textAnchor="middle" dy="8" fill="#333" fontWeight="bold">
//                     {getObjectivePercentage("Availability")}%
//                   </text>
//                 </svg>
//               </div>
//             )}
//
//             {scores.privacyScore > 0 && (
//               <div className="impact-chart">
//                 <div className="chart-title">PRIVACY</div>
//                 <svg className="chart-svg" viewBox="0 0 100 100">
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#f8bbd0" strokeWidth="10"
//                     strokeDasharray="282.7" strokeDashoffset={calculateStrokeDashoffset(getObjectivePercentage("Privacy"))} />
//                   <text x="50" y="50" fontSize="24" textAnchor="middle" dy="8" fill="#333" fontWeight="bold">
//                     {getObjectivePercentage("Privacy")}%
//                   </text>
//                 </svg>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//
//       {/* Defense Strategies */}
//       <div className="defense-strategies-container">
//         <div className="defense-header">
//           <div className="defense-title">Defense Strategies for AML Model</div>
//           <div className="defense-actions">
//             <button className="defense-action">Apply Mitigations</button>
//             <button className="defense-action">Export</button>
//           </div>
//         </div>
//
//         <div className="defense-content">
//           <div className="defense-model-risk">
//             <div className="defense-section-title">MODEL RISK BY DEFENSE</div>
//             {modelRiskItems.map((item, index) => (
//               <div key={index} className="model-risk-item">
//                 <div className="risk-name">{item.name}</div>
//                 <div className="risk-bar-container">
//                   <div className="risk-bar" style={{
//                     width: `${(item.value / 10) * 100}%`,
//                     backgroundColor: item.critical ? '#f44336' : '#fb8c00'
//                   }}></div>
//                 </div>
//                 <div className="risk-value">{item.value}</div>
//               </div>
//             ))}
//           </div>
//
//           <div className="defense-details">
//             {/* Defense Probability */}
//             <div className="defense-probability">
//               <div className="defense-section-title">DEFENSE PROBABILITY</div>
//               {defenseProbabilities.map((defense, index) => (
//                 <div key={index} className="defense-item">
//                   <div className="defense-name">{defense.name}</div>
//                   <div className="defense-bar-container">
//                     <div
//                       className={`defense-bar ${defense.probability > 60 ? 'defense-bar-high' : 'defense-bar-med'}`}
//                       style={{ width: `${defense.probability}%` }}
//                     ></div>
//                     <div className="defense-value">{defense.probability}%</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//
//             {/* Attack Mitigations */}
//             <div className="defense-attacks">
//               <div className="defense-section-title">ATTACK MITIGATIONS</div>
//               {attacksData.map((attack, index) => (
//                 <div key={index} className="attack-row">
//                   <div className="attack-name-defense" title={attack.attack}>
//                     {attack.attack.length > 20 ? `${attack.attack.substring(0, 20)}...` : attack.attack}
//                   </div>
//                   <div className="artifact-item">
//                     <div className={`artifact-icon ${getIconClass(attack.objective)}`}>
//                       {getIconClass(attack.objective) === "icon-protection" ? "P" :
//                        getIconClass(attack.objective) === "icon-tool" ? "T" : "S"}
//                     </div>
//                     <div className="artifact-name">{getArtifactName(attack.objective)}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import "./DashboardPage.css";
// import attacksData from '/Users/barel/Downloads/riskAssesmentToolUpdate/src/data/aml-attacks-data.json'; // Import your data
//
// // Type definitions
// interface AttackData {
//   attack: string;
//   objective: string;
//   score: number;
// }
//
// // Risk level determination function
// const getRiskLevel = (score: number): string => {
//   if (score >= 7) return 'Critical';
//   if (score >= 6) return 'High';
//   if (score >= 5) return 'Medium';
//   if (score < 5) return 'Low';
//   return 'Unknown';
// };
//
// // Risk color determination function
// const getRiskColor = (score: number): string => {
//   if (score >= 7) return 'risk-critical';
//   if (score >= 6) return 'risk-high';
//   if (score >= 5) return 'risk-medium';
//   return 'risk-low';
// };
//
// const AMLRiskDashboard: React.FC = () => {
//   // Initialize state with data from the JSON file
//   const [attackData] = useState<AttackData[]>(attacksData);
//
//   // Calculate summary metrics
//   const [summaryMetrics, setSummaryMetrics] = useState({
//     overallRiskScore: 0,
//     highestRisk: { attack: '', score: 0 },
//     objectiveCounts: {} as Record<string, number>,
//     criticalCount: 0,
//     highCount: 0,
//     mediumCount: 0,
//     lowCount: 0
//   });
//
//   // Filter state
//   const [filterObjective, setFilterObjective] = useState<string>('All');
//   const [filterRiskLevel, setFilterRiskLevel] = useState<string>('All');
//
//   // Sort state
//   const [sortField, setSortField] = useState<'attack' | 'objective' | 'score'>('score');
//   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
//
//   // Calculate summary metrics whenever attack data changes
//   useEffect(() => {
//     if (!attackData.length) return;
//
//     const objectiveCounts: Record<string, number> = {};
//     let totalScore = 0;
//     let highestRisk = { attack: '', score: 0 };
//     let criticalCount = 0;
//     let highCount = 0;
//     let mediumCount = 0;
//     let lowCount = 0;
//
//     attackData.forEach(item => {
//       // Count by objective
//       objectiveCounts[item.objective] = (objectiveCounts[item.objective] || 0) + 1;
//
//       // Total score
//       totalScore += item.score;
//
//       // Highest risk
//       if (item.score > highestRisk.score) {
//         highestRisk = { attack: item.attack, score: item.score };
//       }
//
//       // Count by risk level
//       const riskLevel = getRiskLevel(item.score);
//       if (riskLevel === 'Critical') criticalCount++;
//       else if (riskLevel === 'High') highCount++;
//       else if (riskLevel === 'Medium') mediumCount++;
//       else if (riskLevel === 'Low') lowCount++;
//     });
//
//     setSummaryMetrics({
//       overallRiskScore: parseFloat((totalScore / attackData.length).toFixed(2)),
//       highestRisk,
//       objectiveCounts,
//       criticalCount,
//       highCount,
//       mediumCount,
//       lowCount
//     });
//   }, [attackData]);
//
//   // Filter and sort data for display
//   const getFilteredAndSortedData = () => {
//     return [...attackData]
//       .filter(item => {
//         const matchesObjective = filterObjective === 'All' || item.objective === filterObjective;
//         const riskLevel = getRiskLevel(item.score);
//         const matchesRiskLevel = filterRiskLevel === 'All' || riskLevel === filterRiskLevel;
//         return matchesObjective && matchesRiskLevel;
//       })
//       .sort((a, b) => {
//         if (sortField === 'score') {
//           return sortDirection === 'asc' ? a.score - b.score : b.score - a.score;
//         } else {
//           const valA = a[sortField].toLowerCase();
//           const valB = b[sortField].toLowerCase();
//           return sortDirection === 'asc'
//             ? valA.localeCompare(valB)
//             : valB.localeCompare(valA);
//         }
//       });
//   };
//
//   // Handle sorting
//   const handleSort = (field: 'attack' | 'objective' | 'score') => {
//     setSortDirection(sortField === field && sortDirection === 'desc' ? 'asc' : 'desc');
//     setSortField(field);
//   };
//
//   const filteredData = getFilteredAndSortedData();
//   const objectives = [...new Set(attackData.map(item => item.objective))];
//
//   return (
//     <div className="aml-dashboard">
//       <header className="dashboard-header">
//         <h1>AML Risk Assessment Dashboard</h1>
//         <p className="dashboard-subtitle">Adversarial Machine Learning Risk Analysis</p>
//       </header>
//
//       <div className="summary-cards">
//         <div className="summary-card">
//           <h3>Overall Risk Score</h3>
//           <div className={`score-value ${getRiskColor(summaryMetrics.overallRiskScore)}`}>
//             {summaryMetrics.overallRiskScore}
//           </div>
//           <div className="risk-level">
//             {getRiskLevel(summaryMetrics.overallRiskScore)}
//           </div>
//         </div>
//
//         <div className="summary-card">
//           <h3>Highest Risk</h3>
//           <div className={`score-value ${getRiskColor(summaryMetrics.highestRisk.score)}`}>
//             {summaryMetrics.highestRisk.score.toFixed(2)}
//           </div>
//           <div className="attack-name">{summaryMetrics.highestRisk.attack.split(' ').slice(0, 3).join(' ')}...</div>
//         </div>
//
//         <div className="summary-card risk-distribution">
//           <h3>Risk Distribution</h3>
//           <div className="risk-bars">
//             <div className="risk-bar-container">
//               <div className="risk-bar-label">Critical</div>
//               <div className="risk-bar">
//                 <div
//                   className="risk-bar-fill risk-critical"
//                   style={{ width: `${(summaryMetrics.criticalCount / attackData.length) * 100}%` }}
//                 ></div>
//               </div>
//               <div className="risk-bar-count">{summaryMetrics.criticalCount}</div>
//             </div>
//             <div className="risk-bar-container">
//               <div className="risk-bar-label">High</div>
//               <div className="risk-bar">
//                 <div
//                   className="risk-bar-fill risk-high"
//                   style={{ width: `${(summaryMetrics.highCount / attackData.length) * 100}%` }}
//                 ></div>
//               </div>
//               <div className="risk-bar-count">{summaryMetrics.highCount}</div>
//             </div>
//             <div className="risk-bar-container">
//               <div className="risk-bar-label">Medium</div>
//               <div className="risk-bar">
//                 <div
//                   className="risk-bar-fill risk-medium"
//                   style={{ width: `${(summaryMetrics.mediumCount / attackData.length) * 100}%` }}
//                 ></div>
//               </div>
//               <div className="risk-bar-count">{summaryMetrics.mediumCount}</div>
//             </div>
//             <div className="risk-bar-container">
//               <div className="risk-bar-label">Low</div>
//               <div className="risk-bar">
//                 <div
//                   className="risk-bar-fill risk-low"
//                   style={{ width: `${(summaryMetrics.lowCount / attackData.length) * 100}%` }}
//                 ></div>
//               </div>
//               <div className="risk-bar-count">{summaryMetrics.lowCount}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//
//       <div className="objectives-distribution">
//         <h3>Objectives Breakdown</h3>
//         <div className="objective-cards">
//           {Object.entries(summaryMetrics.objectiveCounts).map(([objective, count]) => (
//             <div key={objective} className="objective-card">
//               <div className="objective-name">{objective}</div>
//               <div className="objective-count">{count}</div>
//               <div className="objective-percent">
//                 {((count / attackData.length) * 100).toFixed(1)}%
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//
//       <div className="data-filters">
//         <div className="filter-group">
//           <label>Filter by Objective:</label>
//           <select
//             value={filterObjective}
//             onChange={(e) => setFilterObjective(e.target.value)}
//           >
//             <option value="All">All Objectives</option>
//             {objectives.map(obj => (
//               <option key={obj} value={obj}>{obj}</option>
//             ))}
//           </select>
//         </div>
//
//         <div className="filter-group">
//           <label>Filter by Risk Level:</label>
//           <select
//             value={filterRiskLevel}
//             onChange={(e) => setFilterRiskLevel(e.target.value)}
//           >
//             <option value="All">All Levels</option>
//             <option value="Critical">Critical</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>
//       </div>
//
//       <div className="data-table-container">
//         <h3>Attack Risk Details</h3>
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th onClick={() => handleSort('attack')}>
//                 Attack Type {sortField === 'attack' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
//               </th>
//               <th onClick={() => handleSort('objective')}>
//                 Objective {sortField === 'objective' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
//               </th>
//               <th onClick={() => handleSort('score')}>
//                 Risk Score {sortField === 'score' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
//               </th>
//               <th>Risk Level</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr key={index} className={getRiskColor(item.score)}>
//                 <td>{item.attack}</td>
//                 <td>{item.objective}</td>
//                 <td className="score-cell">{item.score.toFixed(2)}</td>
//                 <td>{getRiskLevel(item.score)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {filteredData.length === 0 && (
//           <div className="no-data-message">No attacks match the current filters</div>
//         )}
//       </div>
//
//       <footer className="dashboard-footer">
//         <p>AML Risk Assessment Tool • {new Date().toLocaleDateString()}</p>
//       </footer>
//     </div>
//   );
// };
//
// export default AMLRiskDashboard;

//
// import React, { useState, useEffect } from 'react';
// import "./DashboardPage.css";
// import attacksData from '/Users/barel/Downloads/riskAssesmentToolUpdate/src/data/aml-attacks-data.json'; // Import your data
//
// // Enhanced type definitions
// interface MitigationStep {
//   step: string;
//   description: string;
//   complexity: 'Low' | 'Medium' | 'High';
//   effectivenessScore: number;
// }
//
// interface Mitigation {
//   name: string;
//   description: string;
//   implementationSteps: MitigationStep[];
//   effectivenessScore: number;
//   resourceRequirement: 'Low' | 'Medium' | 'High';
// }
//
// interface AttackData {
//   attack: string;
//   objective: string;
//   score: number;
//   description?: string;
//   mitigations?: Mitigation[];
// }
//
// // Risk level determination function
// const getRiskLevel = (score: number): string => {
//   if (score >= 7) return 'Critical';
//   if (score >= 6) return 'High';
//   if (score >= 5) return 'Medium';
//   if (score < 5) return 'Low';
//   return 'Unknown';
// };
//
// // Risk color determination function
// const getRiskColor = (score: number): string => {
//   if (score >= 7) return 'risk-critical';
//   if (score >= 6) return 'risk-high';
//   if (score >= 5) return 'risk-medium';
//   return 'risk-low';
// };
//
// // Get effectiveness level
// const getEffectivenessLevel = (score: number): string => {
//   if (score >= 8) return 'Very High';
//   if (score >= 6) return 'High';
//   if (score >= 4) return 'Medium';
//   if (score >= 2) return 'Low';
//   return 'Very Low';
// };
//
// // Get effectiveness color
// const getEffectivenessColor = (score: number): string => {
//   if (score >= 8) return 'effectiveness-very-high';
//   if (score >= 6) return 'effectiveness-high';
//   if (score >= 4) return 'effectiveness-medium';
//   if (score >= 2) return 'effectiveness-low';
//   return 'effectiveness-very-low';
// };
//
// // Default mitigation data (in real app, this would come from backend)
// const getDefaultMitigations = (attackName: string): Mitigation[] => {
//   // This is placeholder data - in a real app, you'd have proper mitigation data for each attack
//   const commonMitigations: Mitigation[] = [
//     {
//       name: "Regular Model Monitoring",
//       description: "Implement continuous monitoring to detect unusual behavior in model inputs and outputs",
//       effectivenessScore: 7.5,
//       resourceRequirement: "Medium",
//       implementationSteps: [
//         {
//           step: "Establish Metrics",
//           description: "Define key performance indicators and drift metrics for model behavior",
//           complexity: "Medium",
//           effectivenessScore: 7
//         },
//         {
//           step: "Setup Monitoring Pipeline",
//           description: "Deploy automated monitoring tools to track model performance in production",
//           complexity: "Medium",
//           effectivenessScore: 8
//         },
//         {
//           step: "Define Alert Thresholds",
//           description: "Set appropriate thresholds for triggering alerts when anomalies are detected",
//           complexity: "Low",
//           effectivenessScore: 6
//         },
//         {
//           step: "Create Response Plan",
//           description: "Develop procedures for responding to different types of detected anomalies",
//           complexity: "Medium",
//           effectivenessScore: 7.5
//         }
//       ]
//     },
//     {
//       name: "Adversarial Training",
//       description: "Enhance model robustness by including adversarial examples in training data",
//       effectivenessScore: 8.5,
//       resourceRequirement: "High",
//       implementationSteps: [
//         {
//           step: "Generate Adversarial Examples",
//           description: "Create perturbations that cause the model to make mistakes",
//           complexity: "High",
//           effectivenessScore: 8
//         },
//         {
//           step: "Augment Training Data",
//           description: "Include adversarial examples in the training dataset",
//           complexity: "Medium",
//           effectivenessScore: 8.5
//         },
//         {
//           step: "Retrain Model",
//           description: "Train model with the augmented dataset including adversarial examples",
//           complexity: "High",
//           effectivenessScore: 9
//         },
//         {
//           step: "Validate Robustness",
//           description: "Test trained model against new adversarial examples to verify improvement",
//           complexity: "Medium",
//           effectivenessScore: 8
//         }
//       ]
//     },
//     {
//       name: "Input Validation",
//       description: "Implement strong validation of model inputs to detect and reject adversarial examples",
//       effectivenessScore: 6.5,
//       resourceRequirement: "Medium",
//       implementationSteps: [
//         {
//           step: "Define Normal Input Ranges",
//           description: "Establish valid ranges and patterns for each input feature",
//           complexity: "Medium",
//           effectivenessScore: 6
//         },
//         {
//           step: "Implement Preprocessing Filters",
//           description: "Create filters to normalize and sanitize inputs before model processing",
//           complexity: "Medium",
//           effectivenessScore: 7
//         },
//         {
//           step: "Add Anomaly Detection",
//           description: "Deploy algorithms to detect unusual patterns in input data",
//           complexity: "High",
//           effectivenessScore: 8
//         },
//         {
//           step: "Set Rejection Criteria",
//           description: "Define conditions for rejecting suspicious inputs",
//           complexity: "Low",
//           effectivenessScore: 5
//         }
//       ]
//     }
//   ];
//
//   // For some specific attacks, add customized mitigations
//   if (attackName.toLowerCase().includes("evasion")) {
//     return [
//       ...commonMitigations,
//       {
//         name: "Ensemble Methods",
//         description: "Use multiple models with different architectures to make predictions more robust",
//         effectivenessScore: 8.0,
//         resourceRequirement: "High",
//         implementationSteps: [
//           {
//             step: "Select Diverse Models",
//             description: "Choose different model architectures that have complementary strengths",
//             complexity: "Medium",
//             effectivenessScore: 7
//           },
//           {
//             step: "Train Individual Models",
//             description: "Train each model in the ensemble with potentially different data subsets",
//             complexity: "High",
//             effectivenessScore: 8
//           },
//           {
//             step: "Implement Voting Mechanism",
//             description: "Create a system to aggregate predictions from all models",
//             complexity: "Medium",
//             effectivenessScore: 8
//           },
//           {
//             step: "Monitor Ensemble Performance",
//             description: "Track the performance of individual models and the ensemble as a whole",
//             complexity: "Medium",
//             effectivenessScore: 7.5
//           }
//         ]
//       }
//     ];
//   } else if (attackName.toLowerCase().includes("poisoning")) {
//     return [
//       ...commonMitigations,
//       {
//         name: "Data Sanitization",
//         description: "Clean training data to remove potentially poisoned examples",
//         effectivenessScore: 9.0,
//         resourceRequirement: "High",
//         implementationSteps: [
//           {
//             step: "Identify Outliers",
//             description: "Use statistical methods to detect unusual training examples",
//             complexity: "Medium",
//             effectivenessScore: 8
//           },
//           {
//             step: "Implement Robust Preprocessing",
//             description: "Apply filters and transformations to neutralize poisoned data",
//             complexity: "High",
//             effectivenessScore: 9
//           },
//           {
//             step: "Verify Data Sources",
//             description: "Establish trustworthy data sources and validate data provenance",
//             complexity: "Medium",
//             effectivenessScore: 8.5
//           },
//           {
//             step: "Regular Data Audits",
//             description: "Periodically review and clean training datasets",
//             complexity: "Medium",
//             effectivenessScore: 7
//           }
//         ]
//       }
//     ];
//   }
//
//   return commonMitigations;
// };
//
// // Enhance attack data with mitigation info if not present
// const enhanceAttackData = (data: AttackData[]): AttackData[] => {
//   return data.map(attack => {
//     if (!attack.mitigations) {
//       return {
//         ...attack,
//         mitigations: getDefaultMitigations(attack.attack)
//       };
//     }
//     return attack;
//   });
// };
//
// const AMLRiskDashboard: React.FC = () => {
//   // Initialize state with enhanced data from the JSON file
//   const [attackData] = useState<AttackData[]>(enhanceAttackData(attacksData));
//
//   // Selected attack for showing mitigations
//   const [selectedAttack, setSelectedAttack] = useState<AttackData | null>(null);
//
//   // Selected mitigation for showing implementation details
//   const [selectedMitigation, setSelectedMitigation] = useState<Mitigation | null>(null);
//
//   // Calculate summary metrics
//   const [summaryMetrics, setSummaryMetrics] = useState({
//     overallRiskScore: 0,
//     highestRisk: { attack: '', score: 0 },
//     objectiveCounts: {} as Record<string, number>,
//     criticalCount: 0,
//     highCount: 0,
//     mediumCount: 0,
//     lowCount: 0
//   });
//
//   // Filter state
//   const [filterObjective, setFilterObjective] = useState<string>('All');
//   const [filterRiskLevel, setFilterRiskLevel] = useState<string>('All');
//
//   // Sort state
//   const [sortField, setSortField] = useState<'attack' | 'objective' | 'score'>('score');
//   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
//
//   // View mode state
//   const [viewMode, setViewMode] = useState<'risks' | 'defenses'>('risks');
//
//   // Calculate summary metrics whenever attack data changes
//   useEffect(() => {
//     if (!attackData.length) return;
//
//     const objectiveCounts: Record<string, number> = {};
//     let totalScore = 0;
//     let highestRisk = { attack: '', score: 0 };
//     let criticalCount = 0;
//     let highCount = 0;
//     let mediumCount = 0;
//     let lowCount = 0;
//
//     attackData.forEach(item => {
//       // Count by objective
//       objectiveCounts[item.objective] = (objectiveCounts[item.objective] || 0) + 1;
//
//       // Total score
//       totalScore += item.score;
//
//       // Highest risk
//       if (item.score > highestRisk.score) {
//         highestRisk = { attack: item.attack, score: item.score };
//       }
//
//       // Count by risk level
//       const riskLevel = getRiskLevel(item.score);
//       if (riskLevel === 'Critical') criticalCount++;
//       else if (riskLevel === 'High') highCount++;
//       else if (riskLevel === 'Medium') mediumCount++;
//       else if (riskLevel === 'Low') lowCount++;
//     });
//
//     setSummaryMetrics({
//       overallRiskScore: parseFloat((totalScore / attackData.length).toFixed(2)),
//       highestRisk,
//       objectiveCounts,
//       criticalCount,
//       highCount,
//       mediumCount,
//       lowCount
//     });
//
//     // Set default selected attack to the highest risk one
//     if (!selectedAttack) {
//       const highestRiskAttack = attackData.find(a => a.attack === highestRisk.attack);
//       if (highestRiskAttack) {
//         setSelectedAttack(highestRiskAttack);
//         if (highestRiskAttack.mitigations && highestRiskAttack.mitigations.length > 0) {
//           setSelectedMitigation(highestRiskAttack.mitigations[0]);
//         }
//       }
//     }
//   }, [attackData, selectedAttack]);
//
//   // Filter and sort data for display
//   const getFilteredAndSortedData = () => {
//     return [...attackData]
//       .filter(item => {
//         const matchesObjective = filterObjective === 'All' || item.objective === filterObjective;
//         const riskLevel = getRiskLevel(item.score);
//         const matchesRiskLevel = filterRiskLevel === 'All' || riskLevel === filterRiskLevel;
//         return matchesObjective && matchesRiskLevel;
//       })
//       .sort((a, b) => {
//         if (sortField === 'score') {
//           return sortDirection === 'asc' ? a.score - b.score : b.score - a.score;
//         } else {
//           const valA = a[sortField].toLowerCase();
//           const valB = b[sortField].toLowerCase();
//           return sortDirection === 'asc'
//             ? valA.localeCompare(valB)
//             : valB.localeCompare(valA);
//         }
//       });
//   };
//
//   // Handle sorting
//   const handleSort = (field: 'attack' | 'objective' | 'score') => {
//     setSortDirection(sortField === field && sortDirection === 'desc' ? 'asc' : 'desc');
//     setSortField(field);
//   };
//
//   // Handle attack selection
//   const handleAttackSelect = (attack: AttackData) => {
//     setSelectedAttack(attack);
//     if (attack.mitigations && attack.mitigations.length > 0) {
//       setSelectedMitigation(attack.mitigations[0]);
//     } else {
//       setSelectedMitigation(null);
//     }
//   };
//
//   // Handle mitigation selection
//   const handleMitigationSelect = (mitigation: Mitigation) => {
//     setSelectedMitigation(mitigation);
//   };
//
//   const filteredData = getFilteredAndSortedData();
//   const objectives = [...new Set(attackData.map(item => item.objective))];
//
//   return (
//     <div className="aml-dashboard">
//       <header className="dashboard-header">
//         <h1>AML Risk Assessment Dashboard</h1>
//         <p className="dashboard-subtitle">Adversarial Machine Learning Risk Analysis</p>
//
//         <div className="view-toggle">
//           <button
//             className={`view-toggle-btn ${viewMode === 'risks' ? 'active' : ''}`}
//             onClick={() => setViewMode('risks')}
//           >
//             Risk Assessment
//           </button>
//           <button
//             className={`view-toggle-btn ${viewMode === 'defenses' ? 'active' : ''}`}
//             onClick={() => setViewMode('defenses')}
//           >
//             Defense Strategies
//           </button>
//         </div>
//       </header>
//
//       {viewMode === 'risks' ? (
//         <>
//           <div className="summary-cards">
//             <div className="summary-card">
//               <h3>Overall Risk Score</h3>
//               <div className={`score-value ${getRiskColor(summaryMetrics.overallRiskScore)}`}>
//                 {summaryMetrics.overallRiskScore}
//               </div>
//               <div className="risk-level">
//                 {getRiskLevel(summaryMetrics.overallRiskScore)}
//               </div>
//             </div>
//
//             <div className="summary-card">
//               <h3>Highest Risk</h3>
//               <div className={`score-value ${getRiskColor(summaryMetrics.highestRisk.score)}`}>
//                 {summaryMetrics.highestRisk.score.toFixed(2)}
//               </div>
//               <div className="attack-name">{summaryMetrics.highestRisk.attack.split(' ').slice(0, 3).join(' ')}...</div>
//             </div>
//
//             <div className="summary-card risk-distribution">
//               <h3>Risk Distribution</h3>
//               <div className="risk-bars">
//                 <div className="risk-bar-container">
//                   <div className="risk-bar-label">Critical</div>
//                   <div className="risk-bar">
//                     <div
//                       className="risk-bar-fill risk-critical"
//                       style={{ width: `${(summaryMetrics.criticalCount / attackData.length) * 100}%` }}
//                     ></div>
//                   </div>
//                   <div className="risk-bar-count">{summaryMetrics.criticalCount}</div>
//                 </div>
//                 <div className="risk-bar-container">
//                   <div className="risk-bar-label">High</div>
//                   <div className="risk-bar">
//                     <div
//                       className="risk-bar-fill risk-high"
//                       style={{ width: `${(summaryMetrics.highCount / attackData.length) * 100}%` }}
//                     ></div>
//                   </div>
//                   <div className="risk-bar-count">{summaryMetrics.highCount}</div>
//                 </div>
//                 <div className="risk-bar-container">
//                   <div className="risk-bar-label">Medium</div>
//                   <div className="risk-bar">
//                     <div
//                       className="risk-bar-fill risk-medium"
//                       style={{ width: `${(summaryMetrics.mediumCount / attackData.length) * 100}%` }}
//                     ></div>
//                   </div>
//                   <div className="risk-bar-count">{summaryMetrics.mediumCount}</div>
//                 </div>
//                 <div className="risk-bar-container">
//                   <div className="risk-bar-label">Low</div>
//                   <div className="risk-bar">
//                     <div
//                       className="risk-bar-fill risk-low"
//                       style={{ width: `${(summaryMetrics.lowCount / attackData.length) * 100}%` }}
//                     ></div>
//                   </div>
//                   <div className="risk-bar-count">{summaryMetrics.lowCount}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//
//           <div className="objectives-distribution">
//             <h3>Objectives Breakdown</h3>
//             <div className="objective-cards">
//               {Object.entries(summaryMetrics.objectiveCounts).map(([objective, count]) => (
//                 <div key={objective} className="objective-card">
//                   <div className="objective-name">{objective}</div>
//                   <div className="objective-count">{count}</div>
//                   <div className="objective-percent">
//                     {((count / attackData.length) * 100).toFixed(1)}%
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//
//           <div className="data-filters">
//             <div className="filter-group">
//               <label>Filter by Objective:</label>
//               <select
//                 value={filterObjective}
//                 onChange={(e) => setFilterObjective(e.target.value)}
//               >
//                 <option value="All">All Objectives</option>
//                 {objectives.map(obj => (
//                   <option key={obj} value={obj}>{obj}</option>
//                 ))}
//               </select>
//             </div>
//
//             <div className="filter-group">
//               <label>Filter by Risk Level:</label>
//               <select
//                 value={filterRiskLevel}
//                 onChange={(e) => setFilterRiskLevel(e.target.value)}
//               >
//                 <option value="All">All Levels</option>
//                 <option value="Critical">Critical</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//           </div>
//
//           <div className="data-table-container">
//             <h3>Attack Risk Details</h3>
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th onClick={() => handleSort('attack')}>
//                     Attack Type {sortField === 'attack' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
//                   </th>
//                   <th onClick={() => handleSort('objective')}>
//                     Objective {sortField === 'objective' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
//                   </th>
//                   <th onClick={() => handleSort('score')}>
//                     Risk Score {sortField === 'score' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
//                   </th>
//                   <th>Risk Level</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item, index) => (
//                   <tr key={index} className={getRiskColor(item.score)}>
//                     <td>{item.attack}</td>
//                     <td>{item.objective}</td>
//                     <td className="score-cell">{item.score.toFixed(2)}</td>
//                     <td>{getRiskLevel(item.score)}</td>
//                     <td>
//                       <button
//                         className="btn-view-defense"
//                         onClick={() => {
//                           handleAttackSelect(item);
//                           setViewMode('defenses');
//                         }}
//                       >
//                         View Defenses
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {filteredData.length === 0 && (
//               <div className="no-data-message">No attacks match the current filters</div>
//             )}
//           </div>
//         </>
//       ) : (
//         <div className="defense-panel">
//           <div className="defense-header">
//             <button
//               className="btn-back"
//               onClick={() => setViewMode('risks')}
//             >
//               ← Back to Risk Assessment
//             </button>
//             <h2>Defense Strategies</h2>
//           </div>
//
//           {selectedAttack && (
//             <div className="defense-content">
//               <div className="attack-details">
//                 <h3>Selected Attack: {selectedAttack.attack}</h3>
//                 <div className={`attack-risk-badge ${getRiskColor(selectedAttack.score)}`}>
//                   Risk Score: {selectedAttack.score.toFixed(1)} - {getRiskLevel(selectedAttack.score)}
//                 </div>
//                 <p className="attack-objective">Objective: {selectedAttack.objective}</p>
//                 {selectedAttack.description && (
//                   <p className="attack-description">{selectedAttack.description}</p>
//                 )}
//               </div>
//
//               <div className="defense-grid">
//                 <div className="mitigations-list">
//                   <h4>Available Mitigations</h4>
//                   {selectedAttack.mitigations && selectedAttack.mitigations.length > 0 ? (
//                     <div className="mitigation-cards">
//                       {selectedAttack.mitigations.map((mitigation, index) => (
//                         <div
//                           key={index}
//                           className={`mitigation-card ${selectedMitigation === mitigation ? 'active' : ''}`}
//                           onClick={() => handleMitigationSelect(mitigation)}
//                         >
//                           <div className="mitigation-header">
//                             <h5>{mitigation.name}</h5>
//                             <div className={`effectiveness-badge ${getEffectivenessColor(mitigation.effectivenessScore)}`}>
//                               Effectiveness: {mitigation.effectivenessScore.toFixed(1)}
//                             </div>
//                           </div>
//                           <p className="resource-req">
//                             Resource Requirement: <span className={`resource-${mitigation.resourceRequirement.toLowerCase()}`}>
//                               {mitigation.resourceRequirement}
//                             </span>
//                           </p>
//                           <p className="mitigation-desc">{mitigation.description}</p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="no-data-message">No mitigations available for this attack</div>
//                   )}
//                 </div>
//
//                 {selectedMitigation && (
//                   <div className="implementation-details">
//                     <h4>Implementation Steps: {selectedMitigation.name}</h4>
//
//                     <div className="implementation-steps">
//                       {selectedMitigation.implementationSteps.map((step, index) => (
//                         <div key={index} className="implementation-step">
//                           <div className="step-header">
//                             <span className="step-number">{index + 1}</span>
//                             <h5>{step.step}</h5>
//                             <div className={`complexity-badge complexity-${step.complexity.toLowerCase()}`}>
//                               {step.complexity} Complexity
//                             </div>
//                           </div>
//                           <p className="step-description">{step.description}</p>
//                           <div className={`step-effectiveness ${getEffectivenessColor(step.effectivenessScore)}`}>
//                             Effectiveness: {step.effectivenessScore.toFixed(1)}
//                             - {getEffectivenessLevel(step.effectivenessScore)}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//
//                     <div className="mitigation-summary">
//                       <h5>Implementation Summary</h5>
//                       <div className="summary-metrics">
//                         <div className="summary-metric">
//                           <span className="metric-label">Overall Effectiveness:</span>
//                           <span className={`metric-value ${getEffectivenessColor(selectedMitigation.effectivenessScore)}`}>
//                             {selectedMitigation.effectivenessScore.toFixed(1)}
//                             - {getEffectivenessLevel(selectedMitigation.effectivenessScore)}
//                           </span>
//                         </div>
//                         <div className="summary-metric">
//                           <span className="metric-label">Resource Requirement:</span>
//                           <span className={`metric-value resource-${selectedMitigation.resourceRequirement.toLowerCase()}`}>
//                             {selectedMitigation.resourceRequirement}
//                           </span>
//                         </div>
//                         <div className="summary-metric">
//                           <span className="metric-label">Implementation Steps:</span>
//                           <span className="metric-value">{selectedMitigation.implementationSteps.length}</span>
//                         </div>
//                         <div className="summary-metric">
//                           <span className="metric-label">Average Step Complexity:</span>
//                           <span className="metric-value">
//                             {(() => {
//                               const complexityMap = { 'Low': 1, 'Medium': 2, 'High': 3 };
//                               const avgComplexity = selectedMitigation.implementationSteps.reduce(
//                                 (sum, step) => sum + complexityMap[step.complexity], 0
//                               ) / selectedMitigation.implementationSteps.length;
//
//                               if (avgComplexity <= 1.5) return 'Low';
//                               if (avgComplexity <= 2.5) return 'Medium';
//                               return 'High';
//                             })()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//
//       <footer className="dashboard-footer">
//         <p>AML Risk Assessment Tool • {new Date().toLocaleDateString()}</p>
//       </footer>
//     </div>
//   );
// };
//
// export default AMLRiskDashboard;

import React, { useState } from "react";
import "./DashboardPage.css";
// Updated imports with relative paths
import attacksData from '/Users/barel/Downloads/riskAssesmentToolUpdate/src/data/aml-attacks-data.json';
import mitigationsData from '/Users/barel/Downloads/riskAssesmentToolUpdate/src/data/mitigations-data.json';

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
  );
};

export default DashboardPage;
