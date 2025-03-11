import React from "react";
import { useGame } from "../../context/GameContext";

const GameFooter: React.FC = () => {
  const { state, dispatch } = useGame();

  const handleNextDay = () => {
    dispatch({ type: "ADVANCE_DAY" });
  };

  return (
    <footer className="game-footer">
      <div className="footer-content">
        <div className="day-progress">
          <div className="companion-list">
            <h4>Companions:</h4>
            <div className="companions">
              {state.player.companions.map((companion) => (
                <div key={companion.id} className="companion">
                  <span>{companion.name}</span>
                  <div className="companion-skills">
                    {companion.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleNextDay} className="next-day-button">
            Rest and Continue to Next Day
          </button>
        </div>
        <div className="player-skills">
          <h4>Skills:</h4>
          <div className="skill-list">
            {state.player.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GameFooter;
