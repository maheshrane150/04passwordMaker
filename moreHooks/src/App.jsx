import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [lenght, setLenght] = useState(8);
  const [allowNumber, setAllowNUmber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef (null);

  const passwordGenerator = useCallback(()=>{
    let pass ="";
    let str ="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if(allowNumber) str += "123456789";
    if(allowChar) str += "!@#$%^&*"

    for(let c=1; c<=lenght; c++){
      let index = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(index);
    }

    setPassword(pass);
  },[lenght,allowNumber,allowChar,setPassword])
  
  const select = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(()=>{
    passwordGenerator();
  }, [lenght, allowChar, allowNumber, passwordGenerator])

  return (
    <>
    <div className= 'text-white flex justify-center mt-32'>
      <div className='bg-slate-700 rounded-xl p-10'>
        <div className='text-center text-2xl'>
          <label>Password Maker</label>
        </div>
      <div className='mt-6'>
        <input type='text' value={password} placeholder='password' className='text-indigo-800 py-1' ref={passwordRef}></input>
        <button className='bg-blue-900 px-3 hover:opacity-75 py-1' onClick={select}>Copy</button>
      </div>
      <div className='mt-5 flex items-center'>
        <input type='range' min={6} max={16} value={lenght} onChange={(e)=>{setLenght(e.target.value)}}/>
        <label className='mr-3'>{lenght}</label>
        <input type='checkBox' defaultChecked={allowNumber} onChange={()=>{setAllowNUmber((prev) =>!prev)}} />
        <label className='mr-3'>Number</label>
        <input type='checkBox' defaultChecked={allowChar} onChange={()=>{setAllowChar((prev) => !prev)}} />
        <label className='mr-3'>Charector</label>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
