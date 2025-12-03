
const API_URL = "http://localhost:8080";

interface User {
    id: number;
    username: string;
    password: string;
}

interface AuthResponse{
    token:string;
    user: User;    
}


export async function loginRequest(username: string, password:string):Promise<AuthResponse>{


    const res = await fetch(`${API_URL}/api/login`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });

    if(!res.ok){

        let message = "login failed --";
        try{
            const data = await res.json();
            if(data.message) message = data.message;
        }catch{
            console.log("co ty rysiu");
        }
        throw new Error(message);
    }
    return res.json();
}
