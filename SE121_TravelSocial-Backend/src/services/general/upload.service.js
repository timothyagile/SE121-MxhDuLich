const { BadRequest } = require("../../errors/exception");

const upload = (files) => {

    if (!files) {
        // No file was uploaded
        throw new BadRequest();
    }

    const images = files.map((file) => ({
        url: file.path,
        publicId: file.filename
    }))

    return images
}

module.exports = {
    upload
}