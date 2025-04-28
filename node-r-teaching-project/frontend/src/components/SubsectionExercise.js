import React, { useEffect, useState } from 'react';

const SubsectionExercise = ({ exercise, onComplete }) => {
  const [userCode, setUserCode] = useState(exercise.sample_code);
  const [message, setMessage] = useState('');

  // This is a placeholder for running SCT tests.
  // In a real implementation, you would integrate testwhat or similar.
  const runTests = () => {
    // For demonstration, assume success if userCode includes solution code snippet
    if (userCode.includes(exercise.solution.trim())) {
      setMessage('Great job!');
      onComplete();
    } else {
      setMessage('Please try again.');
    }
  };

  return (
    <div data-datacamp-exercise data-lang="r">
      <code data-type="pre-exercise-code">
        {exercise.pre_exercise_code}
      </code>
      <textarea
        rows={10}
        cols={50}
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
      />
      <div>
        <button onClick={runTests}>Run Tests</button>
      </div>
      {message && <p>{message}</p>}
      <code data-type="solution" style={{ display: 'none' }}>
        {exercise.solution}
      </code>
      <code data-type="sct" style={{ display: 'none' }}>
        {exercise.sct}
      </code>
      <div data-type="hint">{exercise.hint}</div>
    </div>
  );
};

export default SubsectionExercise;
