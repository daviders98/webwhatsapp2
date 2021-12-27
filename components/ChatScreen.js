import { Avatar, IconButton } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import AttachFileIcon from "@material-ui/icons/AttachFile"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection, doc, orderBy, query, serverTimestamp, setDoc, where } from '@firebase/firestore';
import { InsertEmoticon, Mic } from '@material-ui/icons';
import { useRouter } from 'next/router';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useRef, useState } from 'react';
import Message from './Message';
import TimeAgo from 'timeago-react'
function ChatScreen({chat,messages}) {
    const [user] = useAuthState(auth);
    const [input,setInput] = useState("");
    const endOfMsgsRef = useRef(null);
    const router = useRouter();
    const msgRef = collection(db, "chats", router.query.id,"messages");
    const q1 = query(msgRef, orderBy("timestamp","asc"));
    const [messagesSnapshot] = useCollection(q1)

    const usersRef = collection(db,"users")
    const q2 = query(usersRef,where("email","==",getRecipientEmail(chat.users,user)))
    const [recipientSnapshot] = useCollection(q2)
    const showMessages = () =>{
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message=>(
                <Message key= {message.id}
                user = {message.data().user}
                message = {{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime()
                }}
                />
            ))
        }else{
            return JSON.parse(messages).map(message=>{
                <Message key={message.id} user={message.user} message={message}/>
            })
        }
    }
    const scrollToBottom = () =>{
        endOfMsgsRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    }
    const sendMessage = (e) =>{
        e.preventDefault();
        const usersRef = collection(db,"users")
        setDoc(doc(usersRef,user.uid), {
            lastSeen: serverTimestamp()
        },{merge:true});
        const addMsgRef = addDoc(msgRef,{
            timestamp: serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL
        })
        setInput("");
        scrollToBottom();
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users,user);
    return (
        <Container>
            <Header>
                {
                    recipient ? (
                        <Avatar src = {recipient?.photoURL}/>
                    ) : (
                        <Avatar>{recipientEmail[0]}</Avatar>
                    )
                }
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active: {" "}
                        {recipient?.lastSeen?.toDate()?(
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                        ): "Unavailable"}
                        </p>
                    ):(
                        <p>Loading last active...</p>
                    )}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMsgsRef}/>
            </MessageContainer>
            <InputContainer>
                <InsertEmoticon/>
                <Input value={input} onChange={ e => setInput(e.target.value)}/>
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <Mic/>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
    min-width:340px;
`

const Header = styled.div`
    position:sticky;
    background-color:white;
    z-index:100;
    top:0;
    display:flex;
    padding:12px;
    height:80px;
    align-items:center;
    border-bottom: 1px solid whitesmoke;
`

const HeaderInformation = styled.div`
    margin-left:16px;
    flex:1;
    > h3{
        margin-bottom:4px;
    }
    > p {
        font-size:14px;
        color:gray;
    }
`
const Input = styled.input`
    flex: 1;
    outline:0;
    border:none;
    border-radius:8px;
    background-color:whitesmoke;
    padding:20px;
    margin-left:16px;
    margin-right:16px;
`
const InputContainer = styled.form`
    display:flex;
    align-items:center;
    padding:12px;
    position:sticky;
    bottom:0;
    background-color:white;
    z-index:100;
`

const HeaderIcons = styled.div`
`

const EndOfMessage = styled.div`
    margin-bottom:48px;
`

const MessageContainer = styled.div`
    padding:16px;
    background-color: #e5ded8;
    min-height:90vh;
`