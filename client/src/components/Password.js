import React, {useEffect, useState} from 'react';
import avatar from '../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import  useFetch from '../hooks/fetch.hook';
import { verifyPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';

import styles from '../styles/Username.module.css';

export default function Password() {

    const navigate = useNavigate()
    const { username } = useAuthStore(state => state.auth)
    const [isOTPVerified, setOTPVerified] = useState(false);
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
    const role = apiData?.role;

    useEffect(() => {
      generateOTP(username).then((OTP) => {
        console.log(OTP)
        if(OTP) return toast.success('OTP has been send to your email!');
        return toast.error('Problem while generating OTP!')
      })
    }, [username]);
  
    const redirectTo = {
      student: '/home',
      teacher: '/teacher_home',
      staff: '/staff_home',
      admin: '/register'
    }[role]


    const formik = useFormik({
        initialValues : {
          password : ''
        },
        validate : passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
          toast.dismiss(); // Dismiss any existing toasts
            if (!isOTPVerified) {
              return toast.error('Please enter a valid OTP before logging in.');
            }
          let loginPromise = verifyPassword({ username, password : values.password })
          // Display loading message
          const loadingToastId = toast.loading('Checking...');
  
          loginPromise
          .then((res) => {
            let { token } = res.data;
            localStorage.setItem('token', token);
            console.log('Navigating to:', redirectTo);
            navigate(redirectTo);
            // Dismiss the loading message once successful
            toast.dismiss(loadingToastId);
            toast.success(<b>Login Successfully...!</b>); // Display success message
          })
          .catch((error) => {
            console.error(error); // Log the error for debugging
            // Dismiss the loading message if there was an error
            toast.dismiss(loadingToastId);
            toast.error(<b>Password Not Match!</b>); // Display error message
          });

        }
  })

    // handler of resend OTP
    function resendOTP(){

      let sentPromise = generateOTP(username);
  
      toast.promise(sentPromise ,
        {
          loading: 'Sending...',
          success: <b>OTP has been send to your email!</b>,
          error: <b>Could not Send it!</b>,
        }
      );
  
      sentPromise.then((OTP) => {
          console.log(OTP);
        })
        .catch((error) => {
          console.error(error);
          toast.error('An error occurred while resending OTP.');
        });
    }

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    return (
        <div className="container mx-auto">

          <Toaster position='top-center' reverseOrder={false}></Toaster>
  
          <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass}>
    
                <div className="title flex flex-col items-center">
                    <h4 className='text-5xl font-bold mt-[-60px]'>Hello {apiData?.firstName || apiData?.username}</h4>
                    <span className='py-3 text-xl w-2/3 text-center text-gray-500 mt-[-20px]'>
                        Explore More by connecting with us.
                    </span>
                </div>
    
               <form className='py-1'  onSubmit={formik.handleSubmit}>
                  <div className='profile flex justify-center py-1 mt-[-8px]' >
                      <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
                  </div>
    
                  <div className="textbox flex flex-col items-center gap-3">
                      <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='password' />
                      <div className="input text-center">
                        <span className='py-1 text-sm text-left text-gray-500 ' >
                          Enter 6 digit OTP sent to your email address.
                        </span>
                        <input
                            onChange={(e) => {
                              const enteredOTP = e.target.value;
                              if (enteredOTP.length === 6) {
                                verifyOTP({ username, code: enteredOTP })
                                  .then((result) => {
                                    if (result.status === 201) {
                                      setOTPVerified(true); // OTP is verified
                                      toast.success('OTP Verified Successfully!');
                                    } else {
                                      setOTPVerified(false); // OTP is invalid
                                      toast.error('Invalid OTP. Please try again.');
                                    }
                                  })
                                  .catch((error) => {
                                    console.error(error);
                                    setOTPVerified(false); // An error occurred during OTP verification
                                    toast.error('An error occurred while verifying OTP.');
                                  });
                              } else {
                                // OTP length is not 6 digits, so OTP is considered not verified
                                setOTPVerified(false);
                              }
                            }} 
                            className={styles.textbox}
                            type="text"
                            placeholder="OTP" 
                            maxLength={6} // Limit OTP input to 6 characters
                        />
                      </div>
                      <button className={styles.btn} type="submit" disabled={!isOTPVerified} style={{ marginTop: '-8px' }}>Sign In</button>
                  </div>
    
                  <div className="text-center py-3">    
                        <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/recovery">Recover Now </Link></span>
                        <span className='text-gray-500'>Can't get OTP? <button onClick={resendOTP} className='text-red-500' type='submit'>Resend</button></span>
                  </div>
                </form>
    
            </div>
          </div>
        </div>
    )

}            