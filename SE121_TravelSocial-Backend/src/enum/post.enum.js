const PRIVACY_LEVEL ={
    PUBLIC: 'public',
    FRIENDS: 'friend',
    PRIVATE: 'private',
    SPECIFIC: 'specific'
}

const TRIP_TYPE = Object.freeze({
    SOLO: "solo",
    FAMILY: "family",
    COUPLE: "couple",
    FRIENDS: "friends",
    BUSINESS: "business"
});

const TRAVEL_SEASON = Object.freeze({
    SPRING: "spring",  // Mùa xuân
    SUMMER: "summer",  // Mùa hè
    AUTUMN: "autumn",  // Mùa thu
    WINTER: "winter"   // Mùa đông
});

const INTERACTION = {
    VIEW_COUNT: "viewCount",
    REACT_COUNT: "reactCount",
    COMMENTS_COUNT: "commentsCount",
    SHARECOUNT: "shareCount",
}

const SHARE_TARGET = {
    USER: 'user',
    GROUP: 'group',
}

const POST_TYPE = {
    SHARED: 'shared',
    ORIGINAL: 'original'
}
module.exports = {
    PRIVACY_LEVEL,
    TRIP_TYPE, 
    TRAVEL_SEASON,
    INTERACTION,
    SHARE_TARGET,
    POST_TYPE
}