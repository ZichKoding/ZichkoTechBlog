const router = require('express').Router();
const { Post } = require('../../just-tech-news/models');
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Blog.findAll({
        attributes: [
            'id',
            'title',
            'blog_post',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [ 'comment', 'created_at' ],
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
            const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
            res.render('homepage', {
                blogs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/post/:id', (req, res) => {
    Blog.findOne({
        attributes: [
            'id',
            'title',
            'blog_post',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['comment', 'created_at'],
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
            if (!dbBlogData) {
                res.status(404).json({ message: "No post found with this id." });
                return;
            }
            // serialize the data
            const blog = dbBlogData.get({ plain: true });

            console.log(blog);

            // pass data to template
            res.render('single-blog', {
                blog
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;