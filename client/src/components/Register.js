import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper'


import styles from '../styles/Username.module.css';

export default function Register() {
  const [file, setFile] = useState()
  const [courseCodes, setCourseCodes] = useState([]); 

  

  const formik = useFormik({
    initialValues : {
      email: '',
      username: '',
      password : '',
      role: '',
      courses: '',
      semesters: '',
      courseCodes: [],
    },
  
    validate : registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || ''})
      values.courseCodes = courseCodes;
      if (values.isAdmin) {
        values.role = 'admin';
      } else if (values.isStudent) {
        values.role = 'student';
      } else if (values.isStaff) {
        values.role = 'staff';
      } else{
        values.role = 'teacher';
      }
      let registerPromise = registerUser(values)
      console.log("data", registerPromise)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Register Successfully...!</b>,
        error : <b>Could not Register.</b>
      });
    }
  })

    
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

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: "45%", paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold -mt-12'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500 -mt-8'>
                Happy to join you!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-3 -mt-12'>
                  <label htmlFor="profile">
                    <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                  </label>
                  <input onChange={onUpload} type="file" id='profile' name='profile' style={{ display: 'none' }} />
              </div>
              <div className="textbox flex flex-col items-center gap-2 -mt-4">
                <div className="flex gap-4">
                  <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username*' />
                </div>  
                <div className="flex gap-4">
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password*' />
                  <label>
                    <input
                      type="checkbox"
                      {...formik.getFieldProps('isAdmin')}
                      checked={formik.values.isAdmin}
                      className={styles.checkbox}
                    />
                    Admin
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      {...formik.getFieldProps('isStudent')}
                      checked={formik.values.isStudent}
                      className={styles.checkbox}
                    />
                    Student
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      {...formik.getFieldProps('isStaff')}
                      checked={formik.values.isStaff}
                      className={styles.checkbox}
                    />
                    Staff
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      {...formik.getFieldProps('isTeacher')}
                      checked={formik.values.isTeacher}
                      className={styles.checkbox}
                    />
                    Teacher
                  </label>
                </div>  
              {formik.values.isTeacher && (
              <div>
                {courseCodes.map((courseCode, index) => (
                <div key={index}>
                  <label>
                        Course Code {index + 1}:
                    <input
                      type="text"
                      value={courseCode}
                      onChange={(e) => {
                        const updatedCourseCodes = [...courseCodes];
                        updatedCourseCodes[index] = e.target.value;
                         setCourseCodes(updatedCourseCodes);
                      }}
                      className={`${styles.smallInput}`}
                    />
                  </label>
                </div>
                ))}
                  <button
                    type="button"
                    onClick={() => setCourseCodes([...courseCodes, ''])}
                    className={styles.btn1}
                  >
                    Add Course Code
                  </button>
              </div>
              )}
              {formik.values.isStudent && (
               <div className="flex gap-4">
                <label>
                  Course:
                    <select {...formik.getFieldProps('courses')} className={styles.dropdown}>
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                </label>
                <label>
                  Semester:
                    <select {...formik.getFieldProps('semesters')} className={styles.dropdown}>
                      {semesters.map((semester)=> (
                        <option key={semester} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </select>
                </label>
              </div>
            )}
                <button className={styles.btn} type='submit'>Register</button>
                <Link to="/user-list">Delete User</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}
