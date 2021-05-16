import React, { useState } from 'react';


type LoginProps = {
  addUser: (newPlayerName: string) => void
}

const Login: React.FC<LoginProps> = ({ addUser }) => {
  const [input, setInput] = useState('');
  return (
    <div className="">
      <h1 className="title">Add players ???</h1>
      <div className="control block">
      <input className="input" type="text" value={input} name="newname" id="newname" onChange={e => {
        if ((e.target as any).value.length > 10) return;
        setInput((e.target as any).value);
      }} />
      </div>
      
      <div className="control block">
      <input className="button" type="button" onClick={() => {
        addUser(input);
        setInput('');

      }} value="Add" id="newnamebtn" />
      </div>
      
    </div>
  );
}

export default Login;
