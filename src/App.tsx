import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Layout } from './components/Layout'
import { AddContent } from './components/AddContent'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route
            path="/blogs/:id"
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path="/blogs"
            element={
              <Layout>
                <Blogs />
              </Layout>
            }
          />
          <Route path='addContent' element={ <AddContent/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
