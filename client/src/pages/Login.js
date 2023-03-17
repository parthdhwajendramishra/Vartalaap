import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/userAuthApi';
import { getToken, storeToken } from '../services/localStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../store/authSlice';


const Login = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    console.log(actualData);

    if (actualData.email && actualData.password) {
      const res = await loginUser(actualData);
     
      if (res.data.status === "success") {
       
        storeToken(res.data.accessToken)
        navigate('/dashboard')
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }

  let token = getToken('token');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserToken({ token: token }))
  }, [token, dispatch]);


  return (
    <Form className='m-auto' onSubmit={handleSubmit}>

      <Form.Group className="mb-3 mx-5" controlId="formBasicEmail" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" style={{ width: '50%' }} />

        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3 mx-5" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" style={{ width: '50%' }}/>
      </Form.Group>

      <Button variant="primary" type="submit" className="mx-5">
        Submit
      </Button>
    </Form>
  );
}
export default Login;