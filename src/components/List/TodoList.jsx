
import { Link, useParams } from 'react-router-dom';
import { useList } from '../../state/ListsContext.jsx';
import ItemForm from './ItemForm.jsx';
import ListItem from './ListItem.jsx';
import styles from './TodoList.css';

export default function TodoLists() {
  const { id } = useParams();
  const { list, addTodo, removeTodo, completeTodo } = useList(id);

  if (!list) return null;

  const handleAdd = async (item) => {
    await addTodo(item);
  };
  const handleRemove = async ({ id, qty, todo, location, description }) => {
    const message = `Remove ${qty} ${todo} at ${location}: ${description}?`;
    if (confirm(message)) {
      await removeTodo(id);
    }
  };

  const handleComplete = async ({ id }) => {
    await completeTodo(id);
  };

  return (
    <section className={styles.TodoList}>
      <div>
        <Link TO="..">LISTS</Link> &gt; {list.name}
      </div>

      <ItemForm onAdd={handleAdd}/>

      <ul>
        {list.items.map((item) => {
          <ListItem
            key={item.id}
            todo={item}
            onComplete={handleComplete}
            onRemove={handleRemove}
          />;
        })}
      </ul>
    </section>
  );
}
