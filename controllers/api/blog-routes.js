const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

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
                attributes: [ 'id', 'comment_text', 'created_at', 'user_id', 'blog_id'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(dbBlogData => res.json(dbBlogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [ 'id', 'comment_text', 'created_at', 'user_id', 'blog_id'],
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
                res.status(404).json({ message: "No blog post found with this id." });
                return;
            }
            
            res.json(dbBlogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Blog.create({
        title: req.body.title,
        blog_post: req.body.blog_post,
        user_id: req.session.user_id
    })
        .then(dbBlogData => res.json(dbBlogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Blog.update(
        {
            title: req.body.title,
            blog_post: req.body.blog_post,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbBlogData => {
            if(!dbBlogData) {
                res.status(404).json({ message: 'No blog post found with this id.'});
                return;
            }

            res.json(dbBlogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbBlogData => {
            if(!dbBlogData) {
                res.status(404).json({ message: "No blog post found with this id." });
                return;
            }

            res.json(dbBlogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;