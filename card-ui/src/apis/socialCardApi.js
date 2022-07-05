import AxiosClient from "./axiosClient";

const SocialCardsApi = {
    showdata: () => {
        return AxiosClient.get('/');
    },
    saveAll: (data) => {
        return AxiosClient.post('/add', data);
    },
    // uploadFile: (upload) => {
    //     const url = "/socialcards/upload";
    //     return AxiosClient.post(url, upload)
    // },
    // uploadFileIMG: (upload) => {
    //     const url = "/socialcards/upload_avatar";
    //     return AxiosClient.post(url, upload)
    // },
    delete: (id) => {
        const url = "/" + id;
        return AxiosClient.delete(url)
    },
    update: (data) => {
        return AxiosClient.post("/update", data)
    },

    // updateStatus: (id, value) => {
    //     return AxiosClient.get('/socialcards/update-status/' + id + '/' + value)
    // },
    // revertUndo : (id) => {
    //     const url = "/socialcards/revertundo/" + id;
    //     return AxiosClient.get(url)
    // },
}

export default SocialCardsApi;