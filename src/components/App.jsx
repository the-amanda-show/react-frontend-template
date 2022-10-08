import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Colors from './Colors/Colors.jsx';
import Orange from './Orange/Orange.jsx';
import Blue from './Blue/Blue.jsx';
import BlueGreen from './Blue/BlueGreen.jsx';
import BabyBlue from './Blue/BabyBlue.jsx';
import DarkBlue from './Blue/DarkBlue.jsx';
import Layout from './Page/Layout.jsx';
import Form from './Forms/FormLayout.jsx';
import Search from './Search/Search.jsx';
import Auth from './Auth/Auth.jsx';
import AuthForm from './Auth/AuthForm.jsx';
import ProtectedRoute from './Auth/ProtectedRoute.jsx';
import UserProvider from '../state/UserContext.jsx';
import ListProvider from '../state/ListContext.jsx';
import { TodoLists } from './List/ShoppingList.jsx';
import { Lists } from './List/Lists.jsx';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route element={<Layout />} >
            <Route index element={<Colors />} />
            <Route path="orange" element={<Orange />} />
            <Route path="blue" element={<Blue />} >
              <Route path="baby blue" index element={<BabyBlue />} />
              <Route path="dark blue" element={<DarkBlue />} />
              <Route path="blue green" element={<BlueGreen />} />
            </Route>
            <Route path="form" element={<Form />} />
            <Route path="search" element={<Search />} />
            <Route path="auth" element={<Auth />} >
              <Route index element={<AuthForm mode="signin" />} />
              <Route path="signup" element={<AuthForm mode="signup" />} />
            </Route>
            <Route element={<ProtectedRoute />} >
              <Route element={<ListProvider />} >
                <Route path="lists">
                  <Route index element={<Lists />} />
                  <Route path=":id" element={<TodoLists />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}
