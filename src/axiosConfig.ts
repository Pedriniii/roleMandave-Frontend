import axios from "axios";

export default axios.create({
    "baseURL": "https://role-mandave.vercel.app/",
    "headers": {
        "Access-Control-Allow-Origin": "https://rolemandave-frontend.netlify.app/"
    } 
});

