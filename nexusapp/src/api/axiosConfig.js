import axios from 'axios';
export default axios.create({
    baseURL:'http://localhost:5000/'
});

// export default axios.create({
//     baseURL:'http://3.148.105.198:5000/'
// });
