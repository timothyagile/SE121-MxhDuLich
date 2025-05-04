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
    console.log("ReactService::create", reactData)
    let existReact = await reactRepository.findOneReact(postId, userId)
    
    if(existReact) {
        console.log("Found existing react:", existReact)
        if(existReact.type === type) {
            console.log("Same reaction type, removing reaction")
            try {
                await reactRepository.delete(existReact._id)
                console.log("Successfully deleted reaction, now updating post stats")
                await postService.updateStat(postId, INTERACTION.REACT_COUNT, -1)
                console.log("Successfully updated post stats after removing reaction")
            } catch (error) {
                console.error("Error while removing reaction:", error)
                throw error
            }
        }
        else {
            console.log("Different reaction type, updating reaction")
            existReact = await reactRepository.update(existReact._id, {type: type})
        }

        return existReact
    }
    else {
        console.log("No existing reaction, creating new one")
        try {
            const updatedPost = await postService.updateStat(
                postId, INTERACTION.REACT_COUNT, 1)
            console.log("Updated post stats for new reaction:", updatedPost)
            const savedReact = await reactRepository.create(reactData)
            console.log("Created new reaction:", savedReact)
            return savedReact;
        } catch (error) {
            console.error("Error creating new reaction:", error)
            throw error
        }
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

const checkUserReacted = async (postId, userId) => {
    try {
        const react = await reactRepository.findOneReact(postId, userId);
        return { 
            hasReacted: !!react, 
            reactType: react ? react.type : null 
        };
    } catch (error) {
        console.error("Error checking user reaction:", error);
        return { hasReacted: false, reactType: null };
    }
}

module.exports = {
    create,
    getByPostId,
    countReactionByType,
    checkUserReacted
}