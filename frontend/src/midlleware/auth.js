import axios from "axios";

export default async function authenticated() {
    if (!localStorage.getItem('jwt') && !localStorage.getItem('userId')) {
        console.log((!localStorage.getItem('jwt') && !localStorage.getItem('userId')))
        return false;
    }
    let status = true
    let re = false
    const res = await axios.post('http://localhost:3000/api/v1.0.0/auth/check', {userId: localStorage.getItem('userId')}, {
        headers: {
            'x-access-token': localStorage.getItem('jwt'),
            'content-type': 'multipart/form-data',
        }
    })
    if (res.status == 200) {
        return true
    }
    return false;
}