import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
const RegisterScreen = ({location,history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] =useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const userLogin = useSelector(state=>state.userLogin)
    const {loading,error} = userRegister
    const {userInfo} = userLogin
    
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(()=>{
        console.log(userInfo)
        console.log('redierect',redirect)
        console.log('locationSearch',location.search)
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(confirmPassword !== password){
         setMessage('password does not matched!')   
        }else{
            dispatch(register(name,email,password))
        } 
    }

    return (
        <FormContainer>
            <h1>Sign up</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </Form.Group>

                <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Group>


                <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Group>

                <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>

            </Form>
            <Row className='py-3'>
                <Col>
                Have an accoutn?
                <Link to={redirect ? `/login?redirect=${redirect}`:`/login`}>
                    Login
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen