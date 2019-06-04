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

    // static async refreshTopic(name, ranking) {
    //     const query2 = `update rankings set ranking = ${ranking} from topics where topics.id=rankings.id AND topics.topic='${name}'`;

    //     try {
    //         let response2 = await db.result(query2)
    //         return response2;
    //     } catch(err) {
    //         console.log("ERROR", err.message);
    //         return err;
    //     };
    // }

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