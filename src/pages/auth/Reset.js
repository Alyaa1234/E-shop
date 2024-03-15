import { useState } from 'react'
import styles from './auth.module.scss'
import resetImg from '../../assets/forgot.png'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail , fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'



const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if the email exists in the Firebase authentication database
    fetchSignInMethodsForEmail(auth, email)
      .then((methods) => {
        // If methods array is empty, the email is not registered
        if (methods.length === 0) {
          setIsLoading(false);
          toast.error("This email is not registered.");
        } 
        else {
          // The email is registered, send the password reset email
          sendPasswordResetEmail(auth, email)
            .then(() => {
              setIsLoading(false);
              toast.success("Check your email for a reset link");
            })
            .catch((error) => {
              setIsLoading(false);
              toast.error(error.message);
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader/>}
      <setion className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt='RestImg' width={500}/>
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset PassWord</h2>
            <form onSubmit={resetPassword}>
              <input type='text' placeholder='Email' required   value={email} onChange={(e)=>setEmail(e.target.value)}   />
              <button type="submit" className="--btn --btn-primary --btn-block">Reset PassWord</button>
              <div className={styles.links}>
                <p>
                  <Link to='/login'>-- Login</Link>
                </p>
                <p>
                  <Link to='/register'>-- Register</Link>
                </p>
              </div>
            </form>  
          </div>
        </Card> 
      </setion>
    </>  
  )
}


export default Reset;