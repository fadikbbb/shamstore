import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout actions
        window.localStorage.setItem("login", "false");
        // Navigate to the desired route
        navigate('/');
    }, [navigate]); // Add navigate as a dependency to useEffect

    // This component doesn't need to return anything, 
    // as it handles its effect in useEffect
    return null;
}

export default Logout;
