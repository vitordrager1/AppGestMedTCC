import http from '../http-common'

class TipoIntervDataService {


    getAll() {
        return http.get("/tipoIntervencao/tipoIntervencao")
    }

    get(id) {
        return http.get(`/tipoIntervencao/${id}`)
    }

    create(data) {
        return http.post(`/tipoIntervencao`, data)
    }

    update(id, data) {
        return http.put(`/tipoIntervencao/${id}`, data)
    }

    delete(id) {
        return http.delete(`/tipoIntervencao/${id}`)
    }

    deleteAll() {
        return http.delete(`/tipoIntervencao`)
    }

    findByName(name) {
        return http.get(`tipointerv?name=${name}`)
    }
}

export default new TipoIntervDataService()