/* eslint-disable react/prop-types */
import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { Outlet } from 'react-router-dom';
import {
  createList, createListItem, deleteListItem, updateListItem, getLists,
} from '../services/lists.js';

const ListContext = createContext();

export default function ListProvider({ children }) {
  const [lists, setLists] = useState(null);
  const [listsById, setListById] = useState({});

  const fetchLists = async () => {
    const { data, error } = await getLists();
    if (error) {
      console.log(error);
    } if (data) {
      setLists(data);
      const map = data.reduce((map, list) => {
        map[list.id] = list;
        return map;
      }, {});
      setListById(map);
    }
  };
  useEffect(() => {
    fetchLists();
  }, []);

  const addList = (list) => {
    setLists((lists) => [...lists, list]);
    setListById((listById) => ({
      ...listsById, [list.id]: list,
    }));
  };

  const updateList = (updated) => {
    setLists((lists) =>
      lists.map((list) => (list.id === updated.id ? updated : list))
    ); setListById((listsById) => ({
      ...listsById, [updated.id]: updated,
    }));
  };

  const value = {
    lists, setLists, listsById, addList, updateList,
  };

  return (
    <ListContext.Provider value={value}>
      {children || <Outlet /> }
    </ListContext.Provider>
  );
}

export function useLists() {
  const [error, setError] = useState(null);
  const { lists, setLists } = useContext(ListContext);

  const addList = async (lists) => {
    const { data, error } = await createList(lists);
    if (error) {
      setError(error.message);
    } else {
      setLists((lists) => [...lists, data]);
      setError(null);
    }
  }; return { lists, error, addList };
}

export function useList(id) {
  const { listsById, updateList } = useContext(ListContext);
  const [error, setError] = useState(null);
  const list = listsById[id];

  const addItem = async (item) => {
    const { data, error } = await createListItem(id, item);

    if (error) {
      setError(error.message); 
    } else {
      const updatedList = { ...list, items: [...list.items, data] };
      updateList(updatedList);
      setError(null);
    }
  };

  const buyItem = async (itemId) => {
    const { data, error }  = await updateListItem(id, itemId, {
      purchased: true,
    });
    
    if (error) {
      setError(error.message);
    } else {
      const updatedList = {
        ...list, 
        items: list.items.map((item) => 
          item.id === itemId ? data : item),
      };
      updateList(updatedList);
      setError(null);
    }
  };

  const removeItem = async (itemId) => {
    const { error } = await deleteListItem(id, itemId);
    if (error) {
      setError(error.message);
    } else {
      const updatedList = {
        ...list,
        items: list.items.filter((item) => item.id !== itemId),
      };
      updateList(updatedList);
      setError(null);
    }
  };

  return {
    list, addItem, buyItem, removeItem, error 
  };
}
