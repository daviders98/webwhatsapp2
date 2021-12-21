import {Avatar,Button,IconButton} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components';
import * as EmailValidator from 'email-validator'
import { auth } from '../firebase';
function Sidebar() {
    const createChat = () =>{
        const input = prompt('Please enter an email address for the user you wish to chat with.');
        if(!input) return null;
        if(EmailValidator.validate(input)){
            //TO-DO:
        }
    }
    return (
        <Container>
            <Header>
                <UserAvatar onClick={()=>auth.signOut()}/>
                <IconsContainer>
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
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
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