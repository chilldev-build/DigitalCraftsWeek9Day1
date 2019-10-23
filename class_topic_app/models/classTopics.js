const db = require('./conn');

class classRankings {
    constructor(id, name, rank) {
        this.id = id;
        this.name = name;
        this.year = rank;
    }

    static async getAllTopics() {
        try {
            const response = await db.any(`SELECT
                    class_topics.id,
                    class_topics.topic_name,
                    class_topics.self_score,
                    topic_rankings.rank_title
                FROM class_topics
                INNER JOIN
                    topic_rankings on class_topics.self_score=topic_rankings.id
                ORDER BY class_topics.id;`);
            console.log('getalltopics is: ', response);
            return response;

        } catch(error) {
            return error.message
        }
    };


    static async getRankings(){
        try {
            const response = await db.any(`SELECT * FROM topic_rankings;`);
            console.log('rank response: ', response);
            return response;

        } catch(error) {
            return error.message
        }
    };

    static async update(topic, rank) {
        const query = `UPDATE class_topics SET self_score = ${rank} WHERE topic_name = '${topic}';`
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            console.log("ERROR", err.message);
            return err;
        }
    }
};



module.exports = classRankings;