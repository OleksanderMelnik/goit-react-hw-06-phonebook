import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';


export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch(); 

  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      id: nanoid(),
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };


    const isFilterContact = contacts.some(
      ({ name }) => name.toLowerCase().trim() === contact.name.toLowerCase()
    );

    if (isFilterContact) {
      return alert(`${contact.name}: is already in contacts`);
    }

    dispatch(addContact(contact));
    event.target.reset(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">
        Name
        <input
          type="text"
          name="name"
          title=""
          required
        />
      </label>
      <label htmlFor="">
        Number
        <input
          type="tel"
          name="number"
          title=""
          required
        />
      </label>
      <button type="submit">
        Add contact
      </button>
    </form>
  );
};