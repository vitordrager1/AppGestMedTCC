import http from '../http-common'

class TipoAtendenteDataService {


    getAll() {
        return http.get("/tipoAtendente/")
    }

    get(id) {
        return http.get(`/tipoAtendente/${id}`)
    }

    create(data) {
        console.log(data)
        return http.post(`/tipoAtendente/`, data)
    }

    update(id, data) {
        return http.put(`/tipoAtendente/${id}`, data)
    }

    delete(id) {
        return http.delete(`/tipoAtendente/${id}`)
    }

    deleteAll() {
        return http.delete(`/tipoAtendente`)
    }

    findByName(name) {
        return http.get(`tipoAtendente?name=${name}`)
    }
}

export default new TipoAtendenteDataService()