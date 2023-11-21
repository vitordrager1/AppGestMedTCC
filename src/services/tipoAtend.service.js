import http from '../http-common'

class TipoAtendDataService {


    getAll() {
        return http.get("/tipoatend/tipoatend")
    }

    get(id) {
        return http.get(`/tipoatend/${id}`)
    }

    create(data) {
        console.log(data)
        return http.post(`/tipoatend/tipoatend`, data)
    }

    update(id, data) {
        return http.put(`/tipoatend/${id}`, data)
    }

    delete(id) {
        return http.delete(`/tipoatend/${id}`)
    }

    deleteAll() {
        return http.delete(`/tipoatend`)
    }

    findByName(name) {
        return http.get(`tipoatend?name=${name}`)
    }
}

export default new TipoAtendDataService()