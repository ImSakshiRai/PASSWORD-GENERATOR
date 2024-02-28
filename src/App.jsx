import React, { useState, useCallback, useEffect,useRef } from 'react';

function App() {
  //Here all the variable are there length ,number ,charracter, and password itself on thises dependenices passwrd changes
  const [Length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  //useRef hook--to get the reference of password copied and highlight selected password
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) {
      str += '0123456789';
    }
    if (charAllowed) {
      str += '!@#$%^&*()+_~';
    }
    for (let i = 0; i < Length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
    
  }, [Length, numberAllowed, charAllowed, setPassword]);
  
const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password);
} ,[password])

  useEffect(()=>{ 
    passwordGenerator()
  },[Length,numberAllowed,charAllowed , passwordGenerator])
 
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-4 my-8  bg-gray-700 text-blue-300 '>
      <h1 className='text-white text-center text-bold my-3 '>PASSWORD GENERATOR</h1> 
       {/* this box is of password and copy button    */}
      <div class=" flex shadow rounded-lg overflow-hidden">
      <input
        type='text'
        value={password}
        placeholder='Password'
        className='outline-none w-full py-1 px-3 '
        readOnly
        ref={passwordRef}> 
        {/* used this to get password selected */}
      </input>
      <button
      onClick={copyToClipBoard}
      className='outline-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-0.5 shrink-0 text-lg transition-colors duration-300'
      >Copy
      </button>
      </div>
      {/* Now this  div  is for numbers and char and length */}
      <div className='flex text-lg gap-x-2 mt-3 my-3 '>
          <div className='flex items-center gap-x-1'>
              <input
              type='range'
              min={8}
              max={50}
              value={Length}
              className='cursor-pointer'
              style={{ width: '100px' }} // Set width explicitly
              onChange={(e) => {setLength(e.target.value)}}>
              </input>
              <label>Length: {Length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input
              type='checkbox'
              defaultChecked ={numberAllowed}
              className='cursor-pointer'
              //agr phle true h to false krdo vice versa
              onChange={() => setNumberAllowed((prev) => !prev)}>
              </input>
              <label>Number: {numberAllowed}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input
              type='checkbox'
              min={6}
              max={50}
              value={Length}
              className='cursor-pointer'
              onChange={() => setCharAllowed((prev) => !prev)}>
              </input>
              <label>Charracter: {charAllowed}</label>
          </div>
      </div>
    </div>

    {/* Footer Section */}
    <footer className="text-center text-gray-500 text-sm mt-80 py-4 bg-gray-800">
        &copy; 2024 I am Sakshi Rai. All Rights Reserved.
      </footer>
    </> 
  );
}

export default App;
