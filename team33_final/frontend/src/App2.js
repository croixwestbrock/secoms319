import React, { useState } from 'react';

const App = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateCard = (card) => {
    return card.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/);
  };

  const handleCardInput = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const cardNumber = input.substring(0, 16); // limit the length to 16 digits
    let formattedCardNumber = '';
    
    for (let i = 0; i < cardNumber.length; i++) {
      if (i !== 0 && i % 4 === 0) {
        formattedCardNumber += '-';
      }
      formattedCardNumber += cardNumber[i];
    }
    
    setCard(formattedCardNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setAlert({ message: 'Name cannot be empty!', type: 'danger' });
      return;
    }
    if (!validateEmail(email)) {
      setAlert({ message: 'Invalid email address!', type: 'danger' });
      return;
    }
    if (!validateCard(card)) {
      setAlert({ message: 'Invalid card number!', type: 'danger' });
      return;
    }
    // If all validations pass
    setAlert({ message: 'You have made an order!', type: 'success' });
    // Process the form submission here
    // e.g., send data to an API or server
  };

  return (
    <div>
      {alert.message && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={card} onChange={handleCardInput} placeholder="Card Number" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
