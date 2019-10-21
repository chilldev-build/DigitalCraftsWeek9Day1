const db = require('./conn');

class classRankings {
    constructor(id, name, year) {
        this.name = name;
        this.year = year;
    }

    static async getAllTopics() {
        try {
            const response = await db.any(`SELECT * FROM class_topics ORDER BY id;`);
            console.log('response is: ', response);
            console.log('this is a test');
            return response;

        } catch(error) {
            return error.message
        }
    };

    // static async getAllRankings() {
    //     try {
    //         const response = await db.any(`SELECT * FROM topic_rankings ORDER BY id;`);
    //         console.log('response is: ', response);
    //         return response;

    //     } catch(error) {
    //         return error.message
    //     }
    // };

    static async getSelfRank() {
        try {
            const response = await db.any(`SELECT C.topic_name, R.id, R.ranking FROM class_topics AS C, topic_rankings AS R WHERE  C.self_score = R.id ORDER BY C.id;`);
            console.log('response is: ', response);
            return response;

        } catch(error) {
            return error.message
        }
    };

    static async addRankings(className,score){
        const query = `UPDATE class_topics SET self_score = ${score} WHERE topic_name = ${className}`;
        return await runQuery(query);
    }
    

};


async function runQuery(query){
    try {
        let response = await db.result(query);
        return response;
    } catch(err){
        console.log('ERROR', err.message);
        return err;
    }
}

module.exports = classRankings;