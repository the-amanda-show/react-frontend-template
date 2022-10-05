/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useAuth } from '../../state/UserContext.jsx';
import { InputControl, FormButton } from '../Forms/FormControl.jsx';
import { useForm } from '../Forms/useForm.js';
import styles from './AuthForm.css';

export default function AuthForm({ mode = 'signin' }) {
  const { signUp, signIn, error } = useAuth(); 
  const [credentials, handleChange] = useForm({
    email: '',
    password: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await type.action(credentials);
  };

  const signin = {
    prompt: 'Please Sign In To Your Account',
    button: 'Sign In',
    switch: {
      prompt: 'Dont Have An Account?',
      link: 'Sign Up Here',
    }, action: signIn,
  };

  const signup = {
    prompt: 'Create Your Account',
    button: 'Sign Up',
    switch: {
      prompt: 'Already Have An Account?',
      link: '../',
    }, action: signUp,
  };

  const modes = { signin, signup };
  const type = modes[mode];

  return(
    <form className={styles.AuthForm} onSubmit={handleSubmit}>
      <h2>{type.prompt}</h2>
      <InputControl 
        label="Email"
        name="email"
        type="email"
        required value ={credentials.email}
        onChange={handleChange}
      />
      <InputControl
        label="Password"
        name="password"
        type="password"
        required value ={credentials.password}
        onChange={handleChange}
      />
      <FormButton>{type.prompt}</FormButton>
      <p className="error">{error}</p>
      <nav>
        <Link to={type.switch.link}>{type.switch.prompt}</Link>
      </nav>
    </form>
  );













}
