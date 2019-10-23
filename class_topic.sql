CREATE TABLE topic_rankings (
    id SERIAL PRIMARY KEY,
    rank_title text NOT NULL,
    rank int
);

INSERT INTO topic_rankings 
    (rank_title, rank) 
VALUES
    ('Unranked',0),
    ('Poor',1),
    ('Okay',2),
    ('Good',3),
    ('Great',4),
    ('Awesome',5);


CREATE TABLE class_topics (
    id SERIAL PRIMARY KEY,
    topic_name text NOT NULL,
    self_score INT REFERENCES topic_rankings(id)
);

INSERT INTO class_topics 
    (topic_name,self_score) 
VALUES     
    ('HTML',1),
    ('CSS',1),
    ('Javascript',1),
    ('PostgreSQL',1),
    ('Node',1),
    ('Express',1);
