import { useNavigate } from 'react-router';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useState } from 'react';
export const Landing = () => 
{   
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const handleStart = () => {
        if (user) {
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <form className="signup" onSubmit={handleStart}>
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

            <button>Start</button>
        </form>
    )
};