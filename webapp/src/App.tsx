import React, { createContext, useContext, useState } from 'react'
import './App.css';
import CreateForm from './components/CreateForm';
import UserList from './components/UserList';
import UserProvider from './contexts/UserContext';


function App() {
  return (
    <UserProvider>
      <div className='container'>
        <CreateForm/>
          <hr className='my-5'/>
        <UserList/>
      </div>
    </UserProvider>
  );
}

export default App;
