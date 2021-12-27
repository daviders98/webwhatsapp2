import { collection, query,where } from '@firebase/firestore'
import { Avatar } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'
function Chat({id,users}) {
    const router = useRouter();
    const [user] = useAuthState(auth)
    const usersRef = collection(db,"users")
    const q = query(usersRef,where("email","==",getRecipientEmail(users,user)))
    const [recipientSnapshot] = useCollection(q)

    const enterChat = () =>{
        router.push(`/chat/${id}`)
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users,user)
    return (
        <Container onClick = {enterChat}>
            {
                recipient ? (
                    <UserAvatar src={recipient?.photoURL}/>
                ) : (
                    <UserAvatar>{recipientEmail[0]}</UserAvatar>
                )
            }
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