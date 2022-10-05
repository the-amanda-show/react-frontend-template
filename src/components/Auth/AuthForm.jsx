
import { type } from '@testing-library/user-event/dist/types/utility/type.js';
import { Link } from 'react-router-dom';
import { useAuth } from '../../state/UserContext.jsx';
import { InputControl, FormButton } from '../Forms/FormControls.jsx';
import { useForm } from '../Forms/useForm.js';
import styles from './AuthForm.css';

export default function AuthForm({ mode = 'signin' }) {
  const { signUp, signIn, error } = useAuth(); 
  const [credentials, handleChange] = useForm({
    emaiil: '',
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
    <form>
        
    </form>
  )












}
