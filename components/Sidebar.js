import {Avatar,Button,IconButton} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection} from 'react-firebase-hooks/firestore'
import { addDoc,collection, query, where } from 'firebase/firestore';
import Chat from './Chat';
function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = collection(db,"chats")
    const q = query(userChatRef,where("users","array-contains",user.email))
    const [chatsSnapshot] = useCollection(q)
    const createChat = () =>{
        const input = prompt('Please enter an email address for the user you wish to chat with.');
        if(!input) return null;
        //add chat into db if it doesnt exist already and if it isn't the users email
        if(EmailValidator.validate(input) && !chatExists(input) && input!== user.email ){
            //TO-DO:
            addDoc(collection(db,"chats"),{
                users:[user.email,input]
            })
        }
    }

    const chatExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(chat=>chat.data().users.find(user=>
            user===recipientEmail)?.length>0
        );
    return (
        <Container>
            <Header>
                <UserAvatar src = {user.photoURL}/>
                <IconsContainer>
                    <IconButton>
                        <ExitToAppIcon onClick={()=>auth.signOut()}/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon/>
                <SearchInput placeholder="Search in Chats"/>
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

            {chatsSnapshot?.docs.map((chat)=>(
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    flex:.45;
    border-right: 1px solid whitesmoke;
    height:100vh;
    min-width:300px;
    max-width:360px;
    overflow-y:scroll;

    ::-webkit-scrollbar{
        display:none;
    }
    --ms-overflow-style:none; /* IE & EDGE */
    scrollbar-width:none; /* FIREFOX */
`

const Search = styled.div`
display:flex;
align-items:center;
padding:20px;
border-radius: 2px;
`
const Header = styled.div`
display:flex;
position:sticky;
top:0;
background-color:white;
z-index:10;
justify-content:space-between;
align-items:center;
padding:16px;
height:80px;
border-bottom:1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
cursor:pointer;

:hover{
    opacity:.7;
}
`

const IconsContainer = styled.div`
`

const SearchInput = styled.input`
outline-width:0;
border:none;
flex:1;
`

const SidebarButton = styled(Button)`
    width:100%;
    &&&{
        border-top:1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`