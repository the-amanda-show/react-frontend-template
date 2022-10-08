import { Link } from 'react-router-dom';
import { useLists } from '../../state/ListContext.jsx';
import AddForm from '../Forms/AddForm.jsx';
import styles from './Lists.css';

export function Lists() {
  const { lists, addList } = useLists(); 


  const handleAdd = async (todo) => {
    console.log('todo', todo);
    await addList({ todo });
  };

  return (
    <section className={styles.Lists}>
      <h1>My Todo List</h1>
      <AddForm onAdd={handleAdd} placeholder="new list"/>
      <div className={styles.div}>

        <ul>
          {(lists || []).map((list) => {
            return (
              <li key={list.id}>
                <Link to={'$list.id'}>{list.todo}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
