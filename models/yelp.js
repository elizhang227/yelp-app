const db = require('./conn.js');

class Reviews {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAllReviews() {
        try {
            const response = await db.any(`select * from businesses, reviews where businesses.id=reviews.id`);
            //const response = await db.any(`select * from topics`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async addReview(name, review) {
        const query = `INSERT INTO businesses (business) VALUES ('${name}')`;
        const query2 = `INSERT INTO reviews (review) VALUES ('${review}')`;

        try {
            let response = await db.result(query)
            let response2 = await db.result(query2)
            return response, response2;
        } catch(err) {
            console.log("ERROR", err.message);
            return err;
        };
    }

    static async getOneBusiness(name) {
        try {
            const response = await db.any(`select business from businesses where businesses.business='${name}'`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getAllReviewsForBusiness(name) {
        try {
            const response = await db.any(`select review_id, business, review from businesses, reviews where businesses.business='${name}' and business_id=businesses.id`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    // static async getOneNameForBusiness(name) {
    //     try {
    //         const response = await db.any(`select review from reviews where reviews.review='${name}'`);
    //         return response;
    //     } catch(err) {
    //         return err.message
    //     }
    // }

    static async getOneReviewForBusiness(name, review_id) {
        try {
            const response = await db.any(`select review_id, business, review from businesses, reviews where businesses.business='${name}' and business_id=businesses.id and review_id=${review_id}`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    // static async updateTopic(name, ranking) {
    //     const query2 = `update rankings set ranking = ${ranking} from topics where topics.id=rankings.id AND topics.topic='${name}'`;

    //     try {
    //         let response2 = await db.result(query2)
    //         return response2;
    //     } catch(err) {
    //         console.log("ERROR", err.message);
    //         return err;
    //     };
    // }
}

module.exports = Reviews;