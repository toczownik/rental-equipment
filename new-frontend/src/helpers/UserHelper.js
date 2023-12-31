import axios from "axios";
import {getToken} from "./LocalStorageHelper";

async function getUserById (id, setItem) {
    try {
        const response = await axios.post(`http://localhost:8080/api/user/${id}`, {
            headers: {
                Authorization: getToken(),
            },
        });
        const userDetails = response.data;
        console.log(userDetails);
    } catch (e) {
        console.log(e);
    }
}

async function getUserByEmail (id, setValue) {
    try {
        const token = getToken();
        const header = {
            Authorization: token,
        };
        await axios
            .get(`http://localhost:8080/api/user/by-email/${id}`, {
                headers: header,
            })
            .then((response) => {
                setValue(response.data);
            });
    } catch (e) {
        console.log(e);
    }
}

async function updateUser (user) {
    try {
        const token = getToken();
        const tempUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        const response = await fetch("http://localhost:8080/api/user", {
            method: "PUT",
            body: JSON.stringify(tempUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
            },
        });
        return response.status;
    } catch (e) {
        console.log(e);
    }
}

async function updateUserWithRole (user) {
    try {
        const token = getToken();
        const tempUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userRole: user.userRole,
        };

        const response = await fetch("http://localhost:8080/api/user/all", {
            method: "PUT",
            body: JSON.stringify(tempUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
            },
        });
        return response.status;
    } catch (e) {
        console.log(e);
    }
}

async function updateUserPassword (reqForNewPass) {
    try {
        const token = getToken();
        const tempUser = {
            userId: reqForNewPass.userId,
            password: reqForNewPass.password,
        };
        const response = await fetch("http://localhost:8080/api/user/setPassword", {
            method: "PUT",
            body: JSON.stringify(tempUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
            },
        });
        return response.status;
    } catch (e) {
        console.log(e);
    }
}

async function signUp (user) {
    try {
        const response = await fetch("http://localhost:8080/api/user/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        return response.status;
    } catch (e) {
        console.log(e);
    }
}

async function getUsersStats () {
    const token = getToken();
    try {
        return await fetch("http://localhost:8080/api/user/getStats", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
            },
        });
    } catch (e) {
        console.log(e);
    }
}

async function getAllUsers () {
    const token = getToken();
    try {
        return await fetch("http://localhost:8080/api/user", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
            },
        });
    } catch (e) {
        console.log(e);
    }
}

export {
    getUserById,
    getUserByEmail,
    updateUser,
    signUp,
    getAllUsers,
    updateUserWithRole,
    updateUserPassword,
    getUsersStats
};
