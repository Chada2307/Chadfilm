const API_URL = "http://localhost:8080/api/favorites";

const getAuthHeaders = () => {
    const token = localStorage.getItem("auth_token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const checkIsFavorite = async (movieId: number | string) => {
    const token = localStorage.getItem("auth_token");
    if(!token) return false;

    try{
        const res = await fetch(`${API_URL}/check/${movieId}`, {
            method: "GET",
            headers: getAuthHeaders()
        });
        if(!res.ok) return false;
        return await res.json();
    }catch(err){
        console.error("blad sprawdzania ulubionych", err);
        return false;
    }
};

export const addToFavorites = async (movieId: number | string) => {
    const res = await fetch(`${API_URL}/${movieId}`, {
        method: "POST",
        headers: getAuthHeaders()
    });
    if(!res.ok) throw new Error("nie udalo sie dodac do ulubionych");
}

export const removeFromFavorites = async (movieId: number | string) => {
    const res = await fetch(`${API_URL}/${movieId}`,{
        method: "DELETE",
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error("nie udalo usunacsie z ulubionych");
};

export const getMyList = async () => {
    const res = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error("blad pobierania listy");
    return await res.json();
}