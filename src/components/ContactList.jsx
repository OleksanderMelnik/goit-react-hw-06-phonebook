import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deletContact } from 'redux/contactsSlice';
import { List, Item, Button } from './ContctsList.style';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filterContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = id => {
    dispatch(deletContact(id));
  };

  return (
    <List>
      {filterContacts.map(({ id, name, number }) => (
        <Item key={id}>
          <b>{name}: </b>
          <b>{number}</b>
          <Button
            type="button"
            onClick={() => deleteContact(id)}
          >
            delete
          </Button>
        </Item>
      ))}
    </List>
  );
};

