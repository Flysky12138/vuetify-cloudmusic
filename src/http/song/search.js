import axios from "../api";

// 搜索
function search(keywords) {
    return axios
        .get("/search", {
            params: {
                keywords
            }
        })
        .then(response => {
            console.log(response);
            return Promise.resolve(response);
        });
}
export default search;
