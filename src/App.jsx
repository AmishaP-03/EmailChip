import { useState } from 'react';
import { contactsData } from './contacts.js';

function App() {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  function handleClick(selectedSuggestion) {
    setUserInput(selectedSuggestion.emailAddress);
    setSuggestions([]);
  }

  function handleChange(event) {
    const enteredValue = event.target.value;
    const filteredContacts = contactsData.filter((contact) => contact.emailAddress.startsWith(enteredValue) || contact.name.startsWith(enteredValue));

    setUserInput(enteredValue);
    setSuggestions(filteredContacts);
  }

  return (
    <section>
      <h1>Enter email address</h1>
      <input value={userInput} onChange={handleChange}/>
      {suggestions.length > 0 && <div className='suggestionList'>
        <ul>
          {suggestions.map((suggestion) => {
            return (<li key={suggestion.id} onClick={() => {handleClick(suggestion)}}>
              <div className='suggestedUser'>
                <img src={suggestion.avatar} alt={suggestion.name}></img>
                <div>
                  <p>{suggestion.name}</p>
                  <p>{suggestion.emailAddress}</p>
                </div>
              </div>
            </li>);
          })}
        </ul>
      </div>}
    </section>
  );
}

export default App;
