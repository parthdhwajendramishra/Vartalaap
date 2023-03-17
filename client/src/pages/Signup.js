import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/userAuthApi';

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
            fname: data.get('fname'),
            lname: data.get('lname'),
            email: data.get('email'),
            password: data.get('password'),
            password_confirmation:data.get('confirm_password')
        }
        if (actualData.fname &&  actualData.lname && actualData.email && actualData.password && actualData.password_confirmation && actualData.tc !== null) {
          
            if (actualData.password === actualData.password_confirmation) 
            {
                console.log(actualData);

                const res = await registerUser(actualData);

                console.log(res.response)

                if (res.data.status === "success") {
                    navigate('/')
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

            <Form.Group className="mb-3 mx-5" controlId="formBasicName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="name" placeholder="Name" name="fname" style={{ width: '50%' }} />
            </Form.Group>

            <Form.Group className="mb-3 mx-5" controlId="formBasicName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="name" placeholder="Name" name="lname" style={{ width: '50%' }} />
            </Form.Group>

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

            <Form.Group className="mb-3 mx-5" controlId="formBasicPassword1">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="confirm_password" style={{ width: '50%' }} />
            </Form.Group>




            <Button variant="primary" type="submit" className="mx-5">
                Submit
            </Button>
        </Form>
    </>;
};

export default Signup;
