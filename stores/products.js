/**
 * Created by shiv on 06/03/2017.
 */
export class ProductsStore {

    constructor(resource, logger) {
        this._resource = resource;
        this._logger = logger;
    }

    getProducts() {
        let selectQuery = "SELECT * FROM public.products LIMIT 100";
        let args = [];
        return this._resource.query(selectQuery, args)
            .then(response => {
                return response;
            });
    }
}
