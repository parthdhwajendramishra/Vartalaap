import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/userAuthApi';
import { storeToken } from '../services/LocalStorageService';

const Signup = () => {
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    });


    const navigate = useNavigate();
    const [registerUser] = useRegisterUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            password_confirmation: data.get('password_confirmation'),
            tc: data.get('tc'),
        }
        if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation && actualData.tc !== null) {
            if (actualData.password === actualData.password_confirmation) {
                const res = await registerUser(actualData);

                console.log(res)

                if (res.data.status === "success") {
                    storeToken(res.data.token)
                    navigate('/dashboard')
                }

                if (res.data.status === "failed") {
                    setError({ status: true, msg: res.data.message, type: 'error' })
                }

            } else {
                setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
            }
        } else {
            setError({ status: true, msg: "All Fields are Required", type: 'error' })
        }
    }
    return <>
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
                <Form.Control type="password" placeholder="Password" name="password" style={{ width: '50%' }} />
            </Form.Group>

            <Button variant="primary" type="submit" className="mx-5">
                Submit
            </Button>
        </Form>
    </>;
};

export default Signup;
