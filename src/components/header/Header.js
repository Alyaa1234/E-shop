import {React , useEffect, useState} from 'react'
import styles from './Header.module.scss'
import { Link , NavLink , useNavigate } from 'react-router-dom'
import { BiSolidCart } from 'react-icons/bi'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { FaTimes , FaUserCircle} from 'react-icons/fa'

import { signOut , onAuthStateChanged  } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'

import { useDispatch } from 'react-redux'
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice'
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice'

import  ShowOnLoggin ,{  ShowOnLoggout }  from '../hiddenLinks/HiddenLink'


const logo = (
    <div className={styles.logo}>
        <Link to="/">
            <h2>
              e<span>Shop</span>.
            </h2>
        </Link>
    </div>
)

const cart =(
    <span className={styles.cart}>
        <Link to="/cart">
            Cart
            <BiSolidCart size={20}/>
            <p>0</p>
        </Link>
    </span>
)

const ActiveLink = ({isActive})=>(
    isActive ? `${styles.active}` : "" 
)


const Header = () => {

    const [showMenu , setShowMenu] = useState(false);
    const [displayName , setDisplayName] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch()

    //monitor currently sign in user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              //console.log(user);
              //const uid = user.uid; //uid--->>user id
              //console.log(user.displayName);
              if(user.displayName == null)
               {
                 //this way is good with gmail acounts but not with all acounts like yahoo
                 //  const u1 = user.email.slice(0, -10)
                 //will take all chars before @
                 const u1 = user.email.substring(0, user.email.indexOf('@'));
                 const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
                 // console.log(uName);
                 setDisplayName(uName);
                }
               else
               {
                 setDisplayName(user.displayName);
                }

              dispatch(SET_ACTIVE_USER({
                email: user.email,
                useName: user.displayName ? user.displayName : displayName,
                userID: user.uid,
              }))
             
            }
            else {
              setDisplayName('');            
              dispatch(REMOVE_ACTIVE_USER())
            }
        });
          
    }, [dispatch , displayName])
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const hideMenu = () =>{
        setShowMenu(false)
    }

    const logoutUser = () => {
        signOut(auth)
        .then(() => {
            toast.success(`Logout Successfully goodbuy Dear`);
            navigate("/")
        })
        .catch((error) => {
            toast.error(error.message);
        });
    }

  return (
    <header>
        <div className={styles.header}> 
           {logo}

           <nav className={showMenu ? `${styles["show-nav"]}` : `${"hide-nav"}`}> 
              <div  className={showMenu ? `${styles["nav-wrapper"]} ${styles['show-nav-wrapper']} ` : `${styles['nav-wrapper']}`}
                    onClick={hideMenu}
              ></div>

              <ul  onClick={hideMenu}>
                 <li className={styles['logo-mobile']}>
                    {logo}
                    <FaTimes size={22} color="#fff"/>
                  </li>
                  <li>
                    <NavLink to="/" className={ActiveLink}>Home</NavLink> 
                  </li>
                  <li>
                    <NavLink to="/contact" className={ActiveLink}>Contact Us</NavLink> 
                  </li>
               </ul>

               <div className={styles["header-right"]}   onClick={hideMenu}>
                  <span className={styles.links}>
                    <ShowOnLoggout>
                      <NavLink className={ActiveLink} to="/login"> Login </NavLink>
                      <NavLink className={ActiveLink} to="/register"> Register </NavLink>
                    </ShowOnLoggout>

                    <ShowOnLoggin>
                      <a href="#home" style={{color: "#ff7722"}}>
                          <FaUserCircle size={16}/>
                          Hi, {displayName}
                      </a>
                      <NavLink className={ActiveLink} to="/order-history"> My Orders </NavLink>
                      <NavLink   to="/" onClick={logoutUser }>Logout</NavLink>{/*className={ActiveLink}*/}       
                   </ShowOnLoggin>
                   
                   
                   
                    
                  </span>
                  <ShowOnLoggin>
                   {cart} 
                  </ShowOnLoggin>
                  
               </div>
           </nav>

           <div className={styles['menu-icon']}>
               {cart}
               <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
           </div>

        </div>
    </header>
  )
}

export default Header