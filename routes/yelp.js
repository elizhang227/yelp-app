const express = require('express'),
    router = express.Router(),
    yelpModel = require('../models/yelp');

router.get('/', async (req, res, next) => {
    const allReviews = await yelpModel.getallReviews();

    res.render('template', { 
        locals: {
            title: 'List of Topics from Class',
            topicList: allReviews
        },
        partials : {
            content: 'partial-topics'
        }
    });
})

router.post('/', (req, res) => {
    const { name, ranking } = req.body;

    yelpModel.refreshTopic(name, ranking)
    .then(async () => {
        const allReviews = await yelpModel.getallReviews();

        res.status(200).render('template', {
            locals: {
                title: 'List of Topics from Class',
                topicList: allReviews
            },
            partials: {
                content: 'partial-topics'
            }
        });
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
});

// router.post('/', (req, res) => {
//     const { name, ranking } = req.body;

//     yelpModel.addTopic(name, ranking)
//     .then(async () => {
//         const allReviews = await yelpModel.getallReviews();
//         await yelpModel.updateTopic();

//         //testtest();

//         res.status(200).render('template', {
//             locals: {
//                 title: 'List of Topics from Class',
//                 topicList: allReviews
//             },
//             partials: {
//                 content: 'partial-topics'
//             }
//         });
//     })
//     .catch((err) => {
//         res.sendStatus(500).send(err.message);
//     });
// });

module.exports = router;