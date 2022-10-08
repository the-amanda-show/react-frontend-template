/* eslint-disable react/prop-types */
import { useForm } from '../Forms/useForm.js';
import { FormButton, InputControl } from '../Forms/FormControl';
import styles from './ItemForm.css';

const initalData = {
  todo: '',
  location: '',
  description: '',
  qty: ''
};

export default function ItemForm({ onAdd, ...rest }) {
  const [data, handleChange, reset] = useForm(initalData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { qty, ...obj } = data;
    if (qty) obj.qty = qty;
    await onAdd(obj);
    reset();
  };

  return (
    <form className={styles.ItemForm} onSubmit={handleSubmit}>
      <InputControl
        label="todo"
        name="todo"
        required
        value={data.todo}
        onChange={handleChange}    
      />

      <InputControl
        label="location"
        name="location"
        required
        value={data.location}
        onChange={handleChange}    
      />

      <InputControl
        label="description"
        name="description"
        required
        value={data.description}
        onChange={handleChange}    
      />
      <InputControl
        label="Quantity"
        name="qty"
        type="number"
        step="1"
        value={data.qty}
        onChange={handleChange} 
        {...rest}   
      />

      <FormButton>Add todo</FormButton>
    </form>
  );


}
