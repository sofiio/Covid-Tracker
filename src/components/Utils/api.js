// export const instance = async (value) => {
//     // debugger
//     return await fetch(value)
//         .then(res => res.json())
//         .then(data => data)

// }
// const mainUrl = 'https://disease.sh/v3/covid-19/'
// export const api = {
//     getData(url) { return instance(`${mainUrl}${url}`) },
// }





import axios from "axios"

const instance = axios.create({
    baseURL: 'https://disease.sh/v3/covid-19/'
})


export const api = {
    getData(value) {
        return instance.get(`${value}`)
            .then(response => response.data)
    }

}