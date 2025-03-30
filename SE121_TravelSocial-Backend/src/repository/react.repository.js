const { NotFoundException } = require('../errors/exception');
const React = require('../models/social/react.model');
const BaseRepository = require('./base.repository');

class ReactRepository extends BaseRepository{

    constructor() {
        super(React)
    }

    async findOneReact(postId, userId) {
        const react = await React.findOne({
            postId: postId,
            userId: userId
        })

        return react
    }
    
}

module.exports = new ReactRepository();
