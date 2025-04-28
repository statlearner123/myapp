import React from 'react';

const SectionList = ({ sections, onSelectSection }) => {
  return (
    <div>
      <h2>Sections</h2>
      <ul>
        {sections.map(section => (
          <li key={section.id}>
            <button onClick={() => onSelectSection(section)}>{section.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionList;
