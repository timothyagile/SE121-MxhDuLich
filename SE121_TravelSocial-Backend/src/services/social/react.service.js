'use strict'

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
    let existReact = await reactRepository.findOneReact(postId, userId)
    
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

const getByPostId = (postId) => {
    
}

module.exports = {
    create
}