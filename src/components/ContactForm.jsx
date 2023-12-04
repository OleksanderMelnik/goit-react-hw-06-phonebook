import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { Form, Label, Button, Input } from './ContactsForm.styled'

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch(); 

  const handleChange = event => {
    event.preventDefault();
    
    const contact = {
      id: nanoid(),
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };


    const filterContact = contacts.some(
      ({ name }) => name.toLowerCase().trim() === contact.name.toLowerCase()
    );

    if (filterContact) {
      return alert(`${contact.name}: is already in contacts`);
    }

    dispatch(addContact(contact));
    event.target.reset(); 
  };

  return (
    <Form onSubmit={handleChange}>
      <Label htmlFor="">
        Name
        <Input
          type="text"
          name="name"
          title=""
          required
        />
      </Label>
      <Label htmlFor="">
        Number
        <Input
          type="tel"
          name="number"
          title=""
          required
        />
      </Label>
      <Button type="submit">
        Add contact
      </Button>
    </Form>
  );
};