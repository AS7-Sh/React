import httpService from "./httpService";

export function registerUser(user) {
    return httpService.post("/users", user)
}

export function logInUser(email, password) {
    return httpService.post("/auth", { email, password })
}

httpService.log();