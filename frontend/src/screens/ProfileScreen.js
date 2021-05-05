import React,{useState,useEffect} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
const ProfileScreen= ({location,history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] =useState(null)

    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails)
    const {loading,error,user} = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile
    
    useEffect(()=>{ 
        if(!userInfo){
            history.push('/login')
        }else{ 
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setEmail(user.email)
                setName(user.name)
            }
        }
    },[dispatch,history,userInfo,user])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(confirmPassword !== password){
         setMessage('password does not matched!')   
        }else{
            dispatch(updateUserProfile({id:user._id,name:name, email:email, password:password,confirmPassword:confirmPassword}))
        } 
    }

    return (
    <Row>
        <Col md={3}>
        <h1>Profile Update</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
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

                <Button type='submit' variant='primary'>Update</Button>

            </Form>
        </Col>
        <Col md={9}>
        <h2>My orders</h2>
        </Col>
    </Row>
    )
}

export default ProfileScreen

