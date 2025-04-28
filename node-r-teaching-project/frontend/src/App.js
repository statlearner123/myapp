import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import SectionList from './components/SectionList';
import SubsectionExercise from './components/SubsectionExercise';
import sectionsData from '../data/sections.json';

const App = () => {
  const [token, setToken] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentSubsectionIndex, setCurrentSubsectionIndex] = useState(0);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setSections(sectionsData.sections);
  }, []);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentSection(null);
    setCurrentSubsectionIndex(0);
    setProgress({});
  };

  const handleSelectSection = (section) => {
    setCurrentSection(section);
    setCurrentSubsectionIndex(0);
  };

  const handleCompleteSubsection = () => {
    const nextIndex = currentSubsectionIndex + 1;
    if (nextIndex < currentSection.subsections.length) {
      setCurrentSubsectionIndex(nextIndex);
    } else {
      alert('You have completed all subsections in this section!');
    }
  };

  if (!token) {
    return showSignup ? (
      <Signup onSignup={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={handleLogin} />
    );
  }

  if (!currentSection) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <SectionList sections={sections} onSelectSection={handleSelectSection} />
      </div>
    );
  }

  const currentSubsection = currentSection.subsections[currentSubsectionIndex];

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>{currentSection.title}</h1>
      <h3>{currentSubsection.title}</h3>
      <SubsectionExercise
        exercise={currentSubsection.exercise}
        onComplete={handleCompleteSubsection}
      />
    </div>
  );
};

export default App;
