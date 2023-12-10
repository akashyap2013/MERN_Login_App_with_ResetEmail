import React, { useState, useEffect } from 'react'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'

export default function Profile() {

  const [file, setFile] = useState();
  const [showRemoveButton, setShowRemoveButton] = useState(true);
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Function to handle the removal of the profile picture
  const removeProfilePicture = () => {
    setFile(avatar); // Clear the file state to remove the picture
    setShowRemoveButton(false);
  };


  const courses = [
    '--------------------------Select--------------------------',
    'BCA Data Science',
    'BCA MCA Integrated',
    'BCA',
    'BBA',
    'B.Sc Visual Media',
    'B.Com Taxation and Finance',
    'B.Sc-Physics, Mathematics and Computer Science',
    'B.Com Information Technology and Finance',
    'B.Sc-Physics, Chemistry and Mathematics',
    'MCA',
  ];

  const semesters = [
    '-----Select-----',
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8',
  ];
 
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      courses : apiData?.course || '',
      semesters: apiData?.semester || '',
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values, navigate, setUpdateSuccess);


      await toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

      // If the update is successful (updateSuccess is true), navigate to the home page
      if (updateSuccess) {
        navigate('/home');
      }

    }
  })

  useEffect(() => {
    setShowRemoveButton(true);
  }, []);


  const onUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const base64 = await convertToBase64(selectedFile);
      setFile(base64);
      setShowRemoveButton(true);
    } else {
      // No file selected, set the default avatar as the profile picture
      setFile(avatar); // Assuming `avatar` is the default avatar image
      setShowRemoveButton(false); // Hide the remove button when using the default avatar
    }
  };
  
  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto p-1"> {/* Added padding */}
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%" }}>

          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold -mt-16'>Profile</h4>
            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
              You can update the details.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}> {/* Adjusted padding */}
            <div className='profile flex justify-center -mt-2'  style={{ paddingLeft: '5px' }}>
              <label htmlFor="profile">
                <img src={file || apiData?.profile || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
              </label>
              {showRemoveButton && (
                <button type="button" onClick={removeProfilePicture} className='text-red-500 ml-2  '  style={{position: 'absolute', paddingLeft: '220px', paddingTop: '70px' }} >Remove</button>
              )}
              
              <input onChange={onUpload} type="file" id='profile' name='profile'  accept="image/*" style={{ display: 'none' }}/>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-3">
                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='First Name' />
                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Last Name' />
              </div>

              <div className="name flex w-3/4 gap-3 -mt-4">
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
              </div>

              <div className='course-dropdown -mt-4'>
                <label htmlFor='course'>Select Course:</label>
                <select {...formik.getFieldProps('course')} id='course'>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div className='semester-dropdown -mt-6'>
                <label htmlFor='semester'>Select Semester:</label>
                <select {...formik.getFieldProps('semester')} id='semester'>
                  {semesters.map((semester, index) => (
                    <option key={index} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>

              <button className={`-mt-4 ${styles.btn}`} type='submit'>Update</button>
            </div>

            <div className="text-center py-1">
              <span className='text-gray-500'>Come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}
