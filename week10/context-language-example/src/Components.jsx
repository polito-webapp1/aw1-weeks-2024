import { useContext } from "react";
import LanguageContext from "./LanguageContext";
import translations from "./translations";

/* ----- Modern approach, using hooks. ----- */

function Button(props) {
  const language = useContext(LanguageContext);

  return <button onClick={props.toggleLanguage}>{translations[language]['button']}</button>;
}

function Welcome() {
  const language = useContext(LanguageContext);

  return <p>{translations[language]['welcome']}</p>;
}


/* ----- Older approach, using components. ----- */

/*
function Button(props) {
  return (
    <LanguageContext.Consumer>
      {language => 
        <button onClick={props.toggleLanguage}>{translations[language]['button']}</button>
      }
    </LanguageContext.Consumer>
  );
}

function Welcome() {
  return (
    <LanguageContext.Consumer>
      {language => <p>{translations[language]['welcome']}</p>}
    </LanguageContext.Consumer>
  )
}*/

export { Button, Welcome };
