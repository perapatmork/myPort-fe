import { useState, useEffect, useRef } from 'react';
import './SkillBar.css';

function SkillBar({ name, level, icon }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__label">
          {icon && <span className="skill-bar__icon">{icon}</span>}
          {name}
        </span>
        <span className="skill-bar__percentage">{level}</span>
      </div>
    </div>
  );
}

export default SkillBar;
