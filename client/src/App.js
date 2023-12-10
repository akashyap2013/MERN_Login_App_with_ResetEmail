import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Home from './components/home';
import TeacherHome from './components/teacher_home';
import StaffHome from './components/staff_home';
import UserLists from './components/UserLists';
import PdfList from './components/PdfList';
import PdfDisplay from './components/PdfDisplay';
import Grade from './components/Grade';
import ViewMarks from './components/ViewMarks';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/home',
        element : <AuthorizeUser><ProtectRoute><Home/></ProtectRoute></AuthorizeUser>
    },
    {
        path : '/teacher_home',
        element : <AuthorizeUser><ProtectRoute><TeacherHome/></ProtectRoute></AuthorizeUser>
    },
    {
        path : '/staff_home',
        element : <AuthorizeUser><ProtectRoute><StaffHome/></ProtectRoute></AuthorizeUser>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '/user-list',
        element : <UserLists></UserLists>
    },
    {
        path : '/pdflist',
        element : <PdfList></PdfList>
    },
    {
        path : '/pdfDisplay',
        element : <PdfDisplay></PdfDisplay>
    },
    {
        path : '/grade',
        element : <Grade></Grade>
    },
    {
        path : '/viewMarks',
        element : <ViewMarks></ViewMarks>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}