/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { FormButton, InputControl } from './FormControl.jsx';
import styles from './FormLayout.css';

export default function AddForm({ onAdd, ...rest }) {
  const [value, setValue] = useState('');

  const handleChange = ({ target }) => setValue(target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(value);
    setValue('');
  };

  return (
    <div className={styles.page}>
      <div className={styles.Forms}>
        <form className={styles.Forms} onSubmit={handleSubmit}>
          <InputControl
            required value={value}
            onChange={handleChange}
            {...rest}  
          />

          <FormButton>Add Todo</FormButton>
        </form>
      </div>
    </div>
  );
}
