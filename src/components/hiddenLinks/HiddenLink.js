import { useSelector } from 'react-redux'//give you ability to select any information you want
import { selectIsLoggedIn } from '../../redux/slice/authSlice'

const ShowOnLoggin = ({children}) => {
    //children is anything that the shoeloggedin is wrapped around
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if(isLoggedIn){
        return children;
    }
    return null;
 
};

export const ShowOnLoggout = ({children}) =>
{
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if(!isLoggedIn){
        return children;
    }
    return null;
    
}

export default  ShowOnLoggin