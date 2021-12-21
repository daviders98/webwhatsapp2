import { Button } from '@material-ui/core'
import Head from 'next/head'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import {signInWithPopup} from 'firebase/auth'
function Login() {
    const signIn = () =>{
        const result = signInWithPopup(auth, provider).catch(()=>{
            console.log("User closed pop up sign in window")
        });
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png"/>
                <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
display:grid;
place-items:center;
height:100vh;
`

const LoginContainer = styled.div`
padding:100px;
display:flex;
flex-direction:column;
align-items:center;
background-color:white;
border-radius:8px;
box-shadow:0 4px 16px -4px rgba(0,0,0,.7)
`

const Logo = styled.img`
height:200px !important;
width:200px !important;
margin-bottom:48px;
`