import { Login } from "@/app/types";
import { useState } from "react";

export async function fetchLogins() {
    const [logins, setLogins] = useState<Login[]>([]);
    try {
        const response = await fetch("http://192.168.56.1:3000/logins");
        const data: Login[] = await response.json();
        setLogins(data);
    } catch (error) {
        console.error("Błąd przy pobieraniu danych:", error);
    }
    return logins;
};