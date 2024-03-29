import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';
import ResetButton from './ResetButton/ResetButton';

const headerTitle = 'Sip Happens Café';
const descriptionText = 'Please leave your feedback about our service by selecting one of the options below.';

function App() {
  const [clicks, setClicks] = useState(() => {
    try {
      const savedClicks = window.localStorage.getItem('user-feedback');
      return savedClicks ? JSON.parse(savedClicks) : { good: 0, neutral: 0, bad: 0 };
    } catch (error) {
      console.error('Error parsing stored feedback:', error);
      return { good: 0, neutral: 0, bad: 0 };
    }
  });
  
  const updateFeedback = (feedbackType, buttonInfo) => {
    setClicks(clicks => ({
      ...clicks,
      [feedbackType]: clicks[feedbackType] + 1,
    }));
    
    let currentButtonInfo = JSON.parse(window.localStorage.getItem('buttonsClickInfo'));

    if (!currentButtonInfo) {
      currentButtonInfo = [];
    }

    currentButtonInfo.push(buttonInfo);
    window.localStorage.setItem('buttonsClickInfo', JSON.stringify(currentButtonInfo));
  };

  const resetFeedback = () => {
    setClicks({ good: 0, neutral: 0, bad: 0 });
    window.localStorage.clear();
  }; 

  useEffect(() => {
  window.localStorage.setItem('user-feedback', JSON.stringify(clicks));
  }, [clicks]);

  const { good, neutral, bad } = clicks;
  const totalFeedback = good + neutral + bad;

  return (
    <div>
      <Description header={headerTitle} description={descriptionText}></Description>
      <Options onUpdate={() => { updateFeedback("good", "Good")}}>Good</Options>
      <Options onUpdate={() => { updateFeedback("neutral", "Neutral")}}>Neutral</Options>
      <Options onUpdate={() => { updateFeedback("bad", "Bad") }}>Bad</Options>
      {totalFeedback > 0 && <ResetButton onUpdate={resetFeedback}>Reset</ResetButton>}

      {totalFeedback === 0 ? <Notification message={'Ще немає відгуків.'}/> : <Feedback good={good} neutral={neutral} bad={bad} />}
    </div>
  );
}

export default App;
