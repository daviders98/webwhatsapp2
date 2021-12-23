import { Avatar } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'
function Chat({id,users}) {
    const [user] = useAuthState(auth)
    const recipientSnapshot = useCollection(collection())
    const recipientEmail = getRecipientEmail(users,user)
    return (
        <Container>
            <UserAvatar/>
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
    display:flex;
    align-items:center;
    cursor:pointer;
    padding:16px;
    word-break:break-word;
    :hover{
        background-color:#e9eaeb;
    }
`

const UserAvatar = styled(Avatar)`
    margin:8px;
    margin-right:16px;
`