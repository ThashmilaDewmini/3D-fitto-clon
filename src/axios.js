//axios is a very powerfull fetcching library

import axios from "axios";

const instance = axios.create({
    baseURL:'...'// The API (cloud fuction) url
});

export default instance;