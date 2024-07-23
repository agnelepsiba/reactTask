import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

const Home = lazy(() => import('./components/Home'));
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
const FormSubmission = lazy(() => import('./components/FormSubmission'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/form-submission" element={<FormSubmission />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
