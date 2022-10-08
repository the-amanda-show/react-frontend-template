/* eslint-disable react/prop-types */
import { FormButton } from '../Forms/FormControl.jsx';
import styles from './ListItem.css';

export default function ListItem({ item, onComplete, onRemove }) {
  const { complete, qty, location, todo, description } = item;

  return (
    <li className={styles.ListItem}>
      {complete ? (
        <span className={styles.Complete}>✔</span>
      ) : (
        <FormButton onClick={() => onComplete(item)} icon>✅</FormButton>
      )}

      <span>
        {qty} {todo} {location} {description}
      </span>

      <button className={styles.RemoveButton} onClick={() => onRemove(item)}>
      🗑️ 
      </button>
    </li>
  );
}
