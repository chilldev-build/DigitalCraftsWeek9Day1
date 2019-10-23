const express = require('express'),
 router = express.Router(),
 classRankingsData = require('../models/classTopics')

const updateEach = async items => {
  const entriesArray = Object.keys(items);

  const results = await Promise.all(
    entriesArray.map(key => {
      return classRankingsData.update(key, items[key]);
    })
  );
  return results;
};

 /* GET rank page. */
router.get('/', async function(req, res, next) {
    const allClassTopics = await classRankingsData.getAllTopics();
    const allSelfRanks = await classRankingsData.getRankings();
    console.log('allself is: ', allSelfRanks);

    res.render('template', { 
      locals:{
        title: 'Subject Rankings',
        classTopics: allClassTopics,
        selfRanks: allSelfRanks
      },
      partials:{
        partial: 'partial-index'
      }
    });
  });

router.post('/', async (req,res) => {
  const addUpdatedValues = await updateEach(req.body);

  if (addUpdatedValues) {
    res.status(200).redirect('/');
  } else {
      res.sendStatus(500);
  }
});

  module.exports = router;

