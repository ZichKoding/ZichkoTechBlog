const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

router.get('/', (req, res) => {
    // find all blogs that the user owns
    Blog.findAll({
        where: {
            // user the user id from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'blog_post',
            'created_at'
        ],
        // Add the username to the blog
        include: [
            {
                model: User,
                attributes: ['username']
            },
            // add any comments related to the blog
            {
                model: Comment,
                attributes: [ 'id', 'comment_text', 'created_at', 'user_id', 'blog_id' ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(dbBlogData => {
            // serialize the data before passing handlebars
            const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
            res.render('dashboard', { blogs, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// // pulling infromation to load user's username into the dashboard
// router.get('/', (req, res) => {
//     User.findOne({
//         where: {
//             id: req.session.user_id
//         },
//         attributes: [ 'username' ]
//     })
//         .then(dbUserData => {
//             if(!dbUserData) {
//                 res.status(404).json({ message: "No user found" });
//                 return;
//             }

//             const user = dbUserData.get({ plain: true });
//             console.table(user);
//             res.render('dashboard', { user, loggedIn: req.session.loggedIn });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });


// pulling information for editting a blog.
router.get('/edit/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'blog_post',
            'created_at'
        ],
        // Add the username to the blog
        include: [
            {
                model: User,
                attributes: ['username']
            },
            // add any comments related to the blog
            {
                model: Comment,
                attributes: [ 'id', 'comment_text', 'created_at', 'user_id', 'blog_id' ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(dbBlogData => {
            if(!dbBlogData) {
                res.status(404).json({ message: "No blog found with this id" });
                return;
            }
            // serialize data before passing it to handlebars
            const blog = dbBlogData.get({ plain: true });
            res.render('edit-blog', {
                blog,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;