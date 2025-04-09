'use strict'

const { hash } = require('bcryptjs')
const Hashtag = require('../../models/social/hashtag.model');
const { NotFoundException } = require('../../errors/exception');

const create = async (name) => {
    console.log("Create hashtag service::", name)

    let hashTag = await Hashtag.findOne({name : name})

    if(!hashTag) {
        hashTag = new Hashtag({name})
        await hashTag.save()
    }

    console.log("Create hashtag service::", hashTag)

    return hashTag
}

const updateStat = async (hashTagId) => {
    console.log("Update hashtag service::", hashTagId)
    let hashTag = await Hashtag.findByIdAndUpdate(
        hashTagId,
        {
            $inc: {
                "stat.dailyPostCount": 1,
                "stat.monthlyPostCount": 1,
                "stat.weeklyPostCount": 1,
            }
        },
        {new: true, runValidators: true}
    )

    console.log("Update hashtag service::", hashTag)

    if(!hashTag)
        throw new NotFoundException()
    return hashTag;
}

const getTrendingHashTag = async () => {

}


module.exports = {
    create,
    updateStat
}