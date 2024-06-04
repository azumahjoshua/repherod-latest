const API_URL = process.env.NEXT_PUBLIC_API_URL +"/user"


const login = async (email: string, password: string): Promise<string> => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data as string;
   
};

export default login;