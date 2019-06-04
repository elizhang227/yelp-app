const express = require('express'),
    router = express.Router(),
    yelpModel = require('../models/yelp');

router.get('/', async (req, res, next) => {
    const allReviews = await yelpModel.getAllReviews();

    res.render('template', { 
        locals: {
            title: 'List of REVIEWS',
            reviewList: allReviews
        },
        partials : {
            content: 'partial-yelp'
        }
    });
})

router.post('/', (req, res) => {
    console.log(req.body);
    const { name } = req.body;

    yelpModel.getOne(name)
    .then(async () => {
        const allReviews = await yelpModel.getAllReviewsForRestaurant(name);
        console.log(`this is the output for allReviews: ${allReviews}`);

        res.status(200).render('template', {
            locals: {
                title: 'List of REVIEWS',
                reviewList: allReviews
            },
            partials: {
                content: 'partial-yelp'
            }
        });
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
});

// router.post('/', (req, res) => {
//     console.log(req.body);
//     const { name, review } = req.body;

//     yelpModel.addReview(name, review)
//     .then(async () => {
//         const allReviews = await yelpModel.getAllReviews();

//         res.status(200).render('template', {
//             locals: {
//                 title: 'List of REVIEWS',
//                 reviewList: allReviews
//             },
//             partials: {
//                 content: 'partial-yelp'
//             }
//         });
//     })
//     .catch((err) => {
//         res.sendStatus(500).send(err.message);
//     });
// });

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