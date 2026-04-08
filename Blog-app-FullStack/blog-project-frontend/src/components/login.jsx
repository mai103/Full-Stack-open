import { useState } from "react";

const LoginForm =({handleLogin}) =>{
    
    const [username, setUsername] =useState('');
    const [password, setPassword] =useState('');
    
    async function handleSubmition (event){
        event.preventDefault();
        handleLogin(username, password)
        setUsername('');
        setPassword('');
    }
    return(
        <form onSubmit={handleSubmition}>
            <input 
            type="text" 
            placeholder="username"
            onChange={({target}) => setUsername(target.value)} 
            value={username} />
            
            <input 
            type="password"  
            placeholder="password"
            onChange={({target}) => setPassword(target.value)} 
            value={password} 
            />

            <button type="submit" >Login</button>
        </form>
    )
}
export default LoginForm