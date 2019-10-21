const express = require('express'),
 router = express.Router(),
 classRankings = require('../models/classTopics')

 /* GET rank page. */
router.get('/', async function(req, res, next) {
    const allClassTopics = await classRankings.getAllTopics();
    const allSelfRanks = await classRankings.getSelfRank();
  
    await res.render('template', { 
      locals:{
        title: 'Subject Rankings',
        classTopics: allClassTopics,
        selfRanks: allSelfRanks
      },
      partials:{
        partial: 'partial-rankings'
      }
    });
  });

  router.post('/', async (req,res) => {

    const rankObj = req.body;
  
    Object.keys(rankObj).forEach(async (key)=>{
      classRankings.addRankings(`'${key}'`,parseInt(rankObj[key]));
    })
  
    const allSelfRanks = await classRankings.getSelfRank();
    res.status(200).render('template', {
      locals: {
          title: 'UPDATED PAGE! <br/> Class Rankings',
          selfRanks: allSelfRanks
        },
          partials: {
            partial: 'partial-rankings'
          }
    });
  });

  module.exports = router;

