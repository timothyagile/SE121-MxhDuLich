'use strict'

const { countReacts } = require("../../controllers/social/react.controller")
const { INTERACTION } = require("../../enum/post.enum")
const reactRepository = require("../../repository/react.repository")
const postService = require('../social/post.service')


const create = async (reactData) => {

    const {userId, type, postId} = reactData
    /*
    1. find
    2. exist react ? { 
        isSame ? deleteReact : updateReact
    } : {
        create new create
        update stat
    }
    */
    console.log("ReactService::", reactData)
    var existReact = await reactRepository.findOneReact(postId, userId)
    
    if(existReact) {
        console.log("Existing react::", existReact)
        if(existReact.type === type) {
            await reactRepository.delete(existReact._id)
            await postService.updateStat(postId, INTERACTION.REACT_COUNT, -1)
        }
        else {
            existReact = await reactRepository.update(existReact._id, {type: type})
        }

        return existReact
    }
    else {
        const updatedPost = await postService.updateStat(
            postId, INTERACTION.REACT_COUNT, 1)
        const savedReact = await reactRepository.create(reactData)
        
        return savedReact;
    }
}  

const getByPostId = async(postId, type) => {
    //Get post's react by type (default getAll react), 
    //populate to user select userName, userAvatar
    const reacts = await reactRepository.getByPostId(postId, type)
    
    return reacts
}

const countReactionByType = async(postId) => {
    const countReacts = await reactRepository.countReactionByType(postId);
    return countReacts;
}

module.exports = {
    create,
    getByPostId,
    countReactionByType,
}