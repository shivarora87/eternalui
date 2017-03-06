/**
 * Created by shiv on 06/03/2017.
 */
"use strict";

export class AllProducts {

        constructor(productsStore, logger) {
            this._productsStore = productsStore;
            this._logger = logger;
        }

    /**
     *
     * @return {*[]}
     */
    products() {
        return [
            (req, res) => {
                this._productsStore.getProducts()
                    .then(data => {
                        res.render("showAllProducts", {data});
                    })
                    .catch(err => {
                        this._logger.error(err);
                        res.send({success: 0, message: "Error!", data: JSON.stringify(err), retry: 1});
                    });
            }
        ];
    }

    toggleProducts() {
        return [
            (req, res) => {
                this._productsStore.getProducts()
                    .then(result => {

                        var data = result.rows;
                        res.send({data});
                    })
                    .catch(err => {
                        this._logger.error(err);
                        res.send({success: 0, message: "Error!", data: JSON.stringify(err), retry: 1});
                    });
            }
        ];
    }
}
