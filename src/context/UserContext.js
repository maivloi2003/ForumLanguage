import { createContext, useEffect, useState } from "react";
import { infoUserCurrentService } from "~/apiServices";

const UserContext = createContext();

function UserProvider({ children }) {
    const [infoUser, setInfoUser] = useState(null)

    useEffect(() => {
        const fetchInfoUser = async () => {
            const token = localStorage.getItem('authToken')
            if (!token) {
                return;
            }

            const res = await infoUserCurrentService(token)

            if (res?.result) {
                setInfoUser(res.result)
            } else {
                localStorage.removeItem('authToken')
            }
        }

        fetchInfoUser()
    }, [])

    return (
        <UserContext.Provider value={infoUser}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };