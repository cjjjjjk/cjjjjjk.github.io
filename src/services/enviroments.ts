import axios from "axios";
import { APP_METADATA } from "@/constants/metadata";
export const githubAPI = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 10000
})