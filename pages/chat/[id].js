import { collection, doc, getDoc, getDocs, orderBy, query } from '@firebase/firestore'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import ChatScreen from '../../components/ChatScreen'
import Sidebar from '../../components/Sidebar'
import { auth, db } from '../../firebase'
import getRecipientEmail from '../../utils/getRecipientEmail'
function Chat({chat,messages}) {
    const [user] = useAuthState(auth);
    return (
        <Container>
        <Head>
            <title>Chat with {getRecipientEmail(chat.users,user)}</title>
        </Head>
        <Sidebar/>
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages}/>
        </ChatContainer>
        </Container>
    )
}

export default Chat

//server side rendering
export async function getServerSideProps(context){
    const msgRef = collection(db, "chats", context.query.id,"messages");
    const q = query(msgRef, orderBy("timestamp","asc"));
    const messagesRes = await getDocs(q);

    const messages = messagesRes.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    })).map((messages)=>({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    const chatRef = doc(db,"chats",context.query.id)
    const chatRes = await getDoc(chatRef);

    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }
    return {
        props:{
            messages: JSON.stringify(messages),
            chat
        }
    }
}

const Container = styled.div`
display:flex;
`

const ChatContainer = styled.div`
    flex:1;
    overflow:scroll;
    height:100vh;
    ::-webkit-scrollbar{
        display:none;
    }
    -ms--ms-overflow-style:none; /* IE & edge */
    scrollbar-width:none; /* Firefox */
`
