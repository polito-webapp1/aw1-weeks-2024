import './App.css';
import { useState } from 'react';
import { Button, Welcome } from './Components';
import LanguageContext from './LanguageContext';

function App() {
  const [language, setLanguage] = useState('english');

  function toggleLanguage() {
    setLanguage((language) => (language === 'english' ? 'italian' : 'english'));
  }

  return (
    <div className='App'>
      <LanguageContext.Provider value = {language} >
        <Welcome />
        <Button toggleLanguage={toggleLanguage}/>
      </LanguageContext.Provider>
    </div>
  );
}

export default App
