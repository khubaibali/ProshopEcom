import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
const LoginScreen = ({location,history}) => {
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} = userLogin
    
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler=(e)=>{
        e.preventDefault() 
        dispatch(login(email,password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Group>

                <Button type='submit' variant='primary'>Sign In</Button>

            </Form>
            <Row className='py-3'>
                <Col>
                New Customer?
                <Link to={redirect ? `/register?redirect=${redirect}`:`/register`}>
                    Register
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
