import { del, get, post, put } from './request.js';

const URL = 'https://myreacttemplate.herokuapp.com/api/v1/todos';

export async function getLists() {
  return await get(URL);
}

export async function createList(list) {
  return await post(URL, list);
}

export async function createListItem(id, item) {
  return await post(`${URL}/${id}/items`, item);
}

export async function deleteListItem(listId, itemId) {
  return await del(`${URL}/${listId}/items/${itemId}`);
}

export async function updateListItem(listId, itemId, updates) {
  return await put(`${URL}/${listId}/items/${itemId}`, updates);
}
