import AxiosClient from "./axiosClient";

const SocialCardsApi = {
    showdata: () => {
        return AxiosClient.get('/');
    },
    saveAll: (data) => {
        return AxiosClient.post('/add', data);
    },
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
    revertCard: (id) => {
        const url = `/revert/${id}`;
        return AxiosClient.put(url);
    },
}

export default SocialCardsApi;