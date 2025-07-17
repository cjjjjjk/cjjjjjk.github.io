import { githubAPI } from "./enviroments";
import { APP_METADATA } from "@/constants/metadata";
export const getGitHubMainProfile = () => {
    return githubAPI.get(`/users/${APP_METADATA.USERNAME}`)
}

