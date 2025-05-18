import { useState } from 'react';
import { contactsData } from './contacts.js';

function App() {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  function handleClick(selectedSuggestion) {
    setSelectedContacts((prev) => [...prev, selectedSuggestion]);
    setUserInput('');
    setSuggestions([]);
  }

  function handleChange(event) {
    const enteredValue = event.target.value;
    const filteredContacts = contactsData.filter((contact) => 
      !selectedContacts.some((selectedContact) => selectedContact.id === contact.id)
      && (contact.emailAddress.startsWith(enteredValue)
      || contact.name.startsWith(enteredValue))
    );

    setUserInput(enteredValue);
    setSuggestions(filteredContacts);
  }

  return (
    <section className='email'>
      <h1>Enter email address</h1>
      <section className='chip-email-section'>
        {selectedContacts.length > 0 && <section className='chips'>
          {selectedContacts.map((selectedContact) => {
            return (<img key={selectedContact.id} src={selectedContact.avatar} alt={selectedContact.name}></img>)
          })}</section>
        }

        {/* Remove onBlur as it prevents the selection of an entry via onClick */}
        <input value={userInput} onChange={handleChange}/>
      </section>
      {suggestions.length > 0 && <section className='suggestionList'>
        <ul>
          {suggestions.map((suggestion) => {
            return (<li key={suggestion.id} onClick={() => {handleClick(suggestion)}}>
              <section className='suggestedUser'>
                <img src={suggestion.avatar} alt={suggestion.name}></img>
                <section>
                  <p>{suggestion.name}</p>
                  <p>{suggestion.emailAddress}</p>
                </section>
              </section>
            </li>);
          })}
        </ul>
      </section>}
    </section>
  );
}

export default App;
