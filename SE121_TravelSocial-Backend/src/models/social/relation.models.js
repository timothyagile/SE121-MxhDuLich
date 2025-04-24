const mongoose = require("mongoose"); // Erase if already required
const { COLLECTION_LIST } = require("../../enum/collection.enum");
const { RELATION_TYPE } = require("../../enum/relation.enum");


// Declare the Schema of the Mongo model
const COLLECTION_NAME = "Relations";
const DOCUMENT_NAME = "Relation";

var relationSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: COLLECTION_LIST.USER,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: COLLECTION_LIST.USER,
    },
    type: {
      type: String,
      enum: RELATION_TYPE,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

relationSchema.index(
	{ requestId: 1, recipientId: 1, type: 1 },
	{ unique: true }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, relationSchema);
