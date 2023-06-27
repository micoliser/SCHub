import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import Input from '../components/Input';
import Form from '../components/Form';

function CreatePassword() {
  const location = useLocation();
  const { type } = location.state;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('...');
  const [secretAnswer, setSecretAnswer] = useState('');

  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState({ active: false });
  const [passwordError, setPasswordError] = useState({ active: false });
  const [verifyError, setVerifyError] = useState({ active: false });
  const [secretQuestionError, setSecretQuestionError] = useState({
    active: false,
  });
  const [secretAnswerError, setSecretAnswerError] = useState({ active: false });

  function getId(e) {
    e.preventDefault();

    if (email.length === 0) {
      setEmailError({ active: true, message: 'Email cannot be blank' });
      return;
    } else {
      setEmailError({ active: false });
    }

    if (password.length === 0) {
      setPasswordError({ active: true, message: 'Password cannot be blank' });
      return;
    } else {
      setPasswordError({ active: false });
    }

    if (verify !== password) {
      setVerifyError({ active: true, message: 'Passwords do not match' });
      return;
    } else {
      setVerifyError({ active: false });
    }

    if (secretQuestion === '...') {
      setSecretQuestionError({
        active: true,
        message: 'You must select a select a secret question',
      });
      return;
    } else {
      setSecretQuestionError({ active: false });
    }

    if (secretAnswer === '') {
      setSecretAnswerError({ active: true, message: 'Answer cannot be black' });
      return;
    } else {
      setSecretAnswerError({ active: false });
    }

    axios
      .get(`http://localhost:5000/api/${type.toLowerCase()}s`, {
        params: { email: email },
      })
      .then((res) => {
        createPassword(res.data.id);
      })
      .catch((err) => console.log('Error', err));
  }

  function createPassword(id) {
    const data = {
      password: password,
      recovery_question: secretQuestion,
      recovery_answer: secretAnswer,
    };
    axios
      .put(`http://localhost:5000/api/${type.toLowerCase()}s/${id}`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <Form onSubmit={getId}>
      <Input
        type='email'
        name='email'
        placeholder='Enter your email address'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (!validator.isEmail(email)) {
            setError(true);
            setEmailError({
              active: true,
              message: 'Invalid email address',
            });
          } else {
            setError(false);
            setEmailError({ active: false });
          }
        }}
        error={emailError}
      />
      <br />
      <Input
        type='password'
        name='password'
        placeholder='Create a password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />
      <br />
      <Input
        type='password'
        name='verify'
        placeholder='Verify password'
        value={verify}
        onChange={(e) => setVerify(e.target.value)}
        error={verifyError}
      />
      <h4>Set up a recovery phrase</h4>
      <p>Chose a secret question out of the following</p>
      <select onChange={(e) => setSecretQuestion(e.target.value)}>
        <option>..</option>
        <option>What is your mother's maiden name?</option>
        <option>What is your favorite football team?</option>
        <option>What street did you live as a child?</option>
        <option>What is the name of your childhood best friend?</option>
      </select>
      <br />
      {secretQuestionError && (
        <p
          style={{
            color: 'red',
            textAlign: 'center',
            fontSize: '0.8rem',
          }}
        >
          {secretQuestionError.message}
        </p>
      )}
      <Input
        type='text'
        name='answer'
        placeholder='Enter answer'
        value={secretAnswer}
        onChange={(e) => setSecretAnswer(e.target.value)}
        error={secretAnswerError}
      />
      <p>
        Note: Please keep your recovery question and answer secret and safe,
        without it you won't be able to recover your password. The phrase CANNOT
        be recovered
      </p>
      <Input
        type='submit'
        value='Create password'
        error={{ active: false }}
        disabled={error}
        id={error ? 'disabled' : ''}
      />
    </Form>
  );
}

export default CreatePassword;
