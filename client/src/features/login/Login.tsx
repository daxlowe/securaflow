import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    
    //@ts-expect-error e is any type
    const handleLogin = async (e) =>
    {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <form className="login" onSubmit={handleLogin}>
            <h3>Login</h3>
            <label>Email:</label>
            <input
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
            />
            <label>Password:</label>
            <input
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
            />

            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}