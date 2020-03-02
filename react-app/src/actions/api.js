import axios from "axios";
const BASE_CONNECTION_URL = "http://localhost:64059/api/";

export default {
    // Perform crud operations through the API
    candidate(url = BASE_CONNECTION_URL + "candidates/") {
        return {
            fetchAll: async () => await axios.get(url),
            fetchById: async id => await axios.get(url + id),
            create: async newRecord => await axios.post(url, newRecord),
            update: async (id, updatedRecord) =>
                await axios.put(url + id, updatedRecord),
            delete: async id => await axios.delete(url + id)
        };
    }
};
