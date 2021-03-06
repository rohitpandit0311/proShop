import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { register } from '../actions/userAction';
import FormContainer from '../components/FormContainer.js';

const RegisterScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);

	const { loading, error, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo]);

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(name);
		console.log(email);
		if (password !== confirmPassword) {
			setMessage('passwords do not match');
		} else {
			//dispatch register
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>name Address</Form.Label>
					<Form.Control
						type='name'
						placeholder='enter Name'
						value={name}
						onChange={(e) => setName(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>password Address</Form.Label>
					<Form.Control
						type='password'
						placeholder='enter Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmPassword'>
					<Form.Label>confirmPassword Address</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Have an account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login{' '}
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
