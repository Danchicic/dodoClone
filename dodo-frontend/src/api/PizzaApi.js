const host = "http://localhost:8000";

class PizzaApi {
    static get_all = (regionSlug) => {
        return fetch(
            `${host}/products/${regionSlug}`,
        );
    }
    static get_all_regions = ()=>{
        return fetch(
            `${host}/regions`
        );
    }
}

export default PizzaApi;