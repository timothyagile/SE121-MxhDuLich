'use strict'

const { BadRequest } = require("../../errors/exception")
const postHashtagModel = require("../../models/social/post-hashtag.model")
const hashTagService = require('../social/hashtag.service')

const create = async ({postId, hashTagId}) => {
    console.log("Create post-hashtag service::", postId, hashTagId)
    const postHashtagData = new postHashtagModel({postId, hashTagId})
    
    const savedData = await postHashtagData.save()
    if(!savedData)
        throw new BadRequest()

    console.log("Create post-hashtag service::", savedData)
    
    await hashTagService.updateStat(hashTagId)
    return savedData;
}


//post update hashtag => update post-hashtag

//delete post => update post-hashtag

module.exports = {
    create
}