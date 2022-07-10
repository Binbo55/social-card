
import AxiosClient from "./axiosClient";

const commentApi = {
    saveComment: (data) => {
        return AxiosClient.post('/socialcards/save_comment', data);
    },
    showComment: () => {
        return AxiosClient.get('/comment/add');
    }
}