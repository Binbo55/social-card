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
    destroyCard: (id) => {
        const url = `/destroy/${id}`;
        return AxiosClient.delete(url);
    },
    update: (id, data) => {
        return AxiosClient.put(`/${id}`, data)
    },
    updateStatus: (id, value) => {
        return AxiosClient.get('/socialcards/update-status/' + id + '/' + value)
    },
    revertCard: (id) => {
        const url = `/revert/${id}`;
        return AxiosClient.put(url);
    },
}

export default SocialCardsApi;