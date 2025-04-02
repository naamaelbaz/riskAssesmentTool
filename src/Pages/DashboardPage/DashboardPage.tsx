import React from "react";
import "./DashboardPage.css";
import Header from "../../components/Header/Header.tsx";

interface DashboardData{
    score: number;
    riskLevel:string; 
}

interface DashboardPageProps{
    data: DashboardData
}

const getScoreColor = (score: number): string => {
    if (score >= 8) return "high"; // High score
    if (score >= 6) return "meduim"; // Medium score
    return "low"; // Low score
  };

const DashboardPage: React.FC<DashboardPageProps> = ({data}) =>{

    return(
        <div className="dash-container">
            <Header/>
            <div className="attack-container">
            <div className="attack-sub-container">
                   
                <div className="attack-scores">
                    <div className={`score ${getScoreColor(8.430)}`}>
                        <div className="text textScore">Score <br/> <br/> 8.430</div>
                    </div>
                    <div className={`score ${getScoreColor(6.230)}`}>
                        <div className="text textScore">Score <br/> <br/>6.230</div>
                    </div>
                    <div className={`score ${getScoreColor(5.783)}`}>
                        <div className="text textScore">Score <br/> <br/>5.783</div>
                    </div>
                    
                </div>
                <div className="attack-res">
                    <div className="content"> 
                        <div className="text">ATTACK SCORES</div>
                        <div className="sub-text">
                            <div className="cordinate"> 
                             </div>  Y: Attack-Name
                             <div className="cordinate"> 
                             </div>X: Score 
                        </div>
                    </div>
                    <div className="attack-score-graph">
                         {[...Array(7)].map((_, i) => (
                            <div key={i} className="graph-line"></div>
                         ))}
                    </div>
                    <div className="x-axis-labels">
                    {[2, 4, 6, 8, 10].map((num, index) => (
                        <div key={index} className="x-axis-tick">{num}</div>
                    ))}
                    </div>

                </div>
                             
            </div> 
  
            <div className="model-risk">
               
                        <div className="text modelRisk">Model Risk By Objectives</div>
                        <div className="model-risk-categories">
                            <div className="category-item inegrity">
                                Integrity
                            </div>
                            <div className="category-item availability"> 
                                Availability 
                            </div>
                            <div className="category-item privacy">
                                Privacy
                            </div>
                        </div>
            </div>

               
            </div>


            <div className="defense-strategies-container">
                <p>Defense Strategies</p>
            </div>
        </div>

    
    )
}

export default DashboardPage; 