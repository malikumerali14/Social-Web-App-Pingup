import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import { useAuth, useUser } from '@clerk/clerk-react'
import LayoutPage from './pages/LayoutPage'
import { Toaster } from 'react-hot-toast'
import Connections from './pages/Connections'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Chatbox from './pages/ChatBox'
import { useEffect } from 'react'

const App = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (user) {
      getToken().then((token) => console.log(token));
    }

  }, [user])


  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={!user ? <LoginPage /> : <LayoutPage />}>
          <Route index element={<Feed />} />
          <Route path='messages' element={<Messages />} />
          <Route path='connections' element={<Connections />} />
          <Route path='discover' element={<Discover />} />
          <Route path='profile' element={<Profile />} />
          <Route path='create-post' element={<CreatePost />} />
          <Route path='messages/:id' element={<Chatbox />} />

        </Route>

      </Routes>
    </>
  )
}

export default App