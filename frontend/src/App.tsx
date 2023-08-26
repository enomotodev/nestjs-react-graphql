import './App.css'
import SignIn from './components/SignIn.tsx';
import SignUp from './components/SignUp.tsx';
import Main from './components/Main.tsx';
import NotFound from './components/NotFound.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GuestRoute, PrivateRoute } from './AuthRoute.tsx';
import client from './apolloCilent.ts';
import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<GuestRoute children={<SignIn />} />} />
          <Route path='/signup' element={<GuestRoute children={<SignUp />} />} />
          <Route path='/' element={<PrivateRoute children={<Main />} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
