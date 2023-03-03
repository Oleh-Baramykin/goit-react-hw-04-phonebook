import React, { useState, useEffect } from 'react';
import { Globstyle } from './App.styled';
import { nanoid } from 'nanoid';
import { ContactForm } from './Form/ContactForm';
import { ContactList } from './ContactsList/CotactsList';
import { Filter } from './Filter/Filter';

const initialLocalStorage = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? initialLocalStorage
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (values, { resetForm }) => {
    const newContact = { id: nanoid(3), ...values };
    const newContactName = newContact.name.toLowerCase();
    if (contacts.find(people => people.name.toLowerCase() === newContactName)) {
      alert(`${newContact.name} is already in contact`);
      resetForm();
    } else {
      setContacts([newContact, ...contacts]);
      resetForm();
    }
  };

  const onFilterChange = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filterContact = () => {
    const visibleContact = contacts.filter(abonent =>
      abonent.name.toLowerCase().includes(filter)
    );
    return visibleContact;
  };

  return (
    <Globstyle>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      {contacts.length === 0 ? (
        <h2>You have no contacts saved</h2>
      ) : (
        <>
          <h2 style={{ margin: '30px 0 0' }}>Contacts</h2>
          <h2 style={{ margin: '15px 0 ' }}>Find contacs by name</h2>

          <Filter value={filter} onFilterChange={onFilterChange} />
          {filter !== contacts.name && (
            <ContactList
              listAbonents={filterContact()}
              deleteContact={deleteContact}
            />
          )}
        </>
      )}
    </Globstyle>
  );
}
