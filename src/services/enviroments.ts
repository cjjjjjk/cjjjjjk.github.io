import axios from "axios";
import { APP_METADATA } from "@/constants/metadata";
export const githubAPI = axios.create({
    baseURL: APP_METADATA.GITHUB_PROXY_URL,
    timeout: 10000
})