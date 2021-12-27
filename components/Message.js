import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase'
function Message({user,message}) {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
    return (
        <Container>
            <TypeOfMessage>{message.message}
            <TimeStamp>
            {message.timestamp ? moment(message.timestamp).format("LT"):"..."}
            </TimeStamp>
            </TypeOfMessage>
        </Container>
    )
}

export default Message

const Container = styled.div``

const MessageElement = styled.p`
    width:fit-content;
    padding:16px;
    border-radius:8px;
    margin:12px;
    min-width:60px;
    padding-bottom:28px;
    position:relative;
    text-align:right;
`

const Sender = styled(MessageElement)`
    margin-left:auto;
    background-color:#dcf8c6;
`

const Receiver = styled(MessageElement)`
    background-color:whitesmoke;
    text-align: left;
`

const TimeStamp = styled.span`
    color:gray;
    padding:12px;
    font-size:8px;
    position:absolute;
    bottom:0;
    text-align:right;
    right:0;
`