const express = require('express'),
    router = express.Router(),
    yelpModel = require('../models/yelp');

router.get('/', async (req, res, next) => {
    const allReviews = await yelpModel.getAllReviews();

    res.render('template', { 
        locals: {
            title: 'YOU GET A REVIEW, YOU GET A REVIEW, EVERYONE GETS A REVIEW',
            reviewList: allReviews
        },
        partials : {
            content: 'partial-home'
        }
    });
})

router.get('/:business/:review', (req, res, next) => {
    console.log(req.params);
    const businessId = req.params.business;
    const review = req.params.review;

    yelpModel.getOneBusiness(businessId)
    .then(async () => {
        const allReviews = await yelpModel.getOneReviewForBusiness(businessId, review);

        res.status(200).render('template', {
            locals: {
                title: 'List of REVIEWS',
                reviewList: allReviews
            },
            partials: {
                content: 'partial-review'
            }
        });
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
})

router.post('/', (req, res) => {
    console.log(req.body);
    const { name } = req.body;

    yelpModel.getOneBusiness(name)
    .then(async () => {
        const allReviews = await yelpModel.getAllReviewsForBusiness(name);

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

module.exports = router;