const { NotFoundException } = require("../errors/exception");

class BaseRepository {

    constructor(model) {
      this.model = model;
    }

    applyPopulateOptions(query, populateOptions) {
        if (populateOptions && populateOptions.length > 0) {
            populateOptions.forEach((option) => {
            query = query.populate(option);
            });
        }
        return query;
      }
  
    async create(data) {
      return await this.model.create(data);
    }
  
    async findById(id, populateOptions = null) {
        let query = this.model.findById(id);
        query = this.applyPopulateOptions(query, populateOptions)
        const result = await query.exec();
        if (!result) { throw new NotFoundException()}
        return result
    }
  
    async findAll(query = {}, populateOptions = null) {
        let dbQuery = this.model.find(query);
        
        dbQuery = this.applyPopulateOptions(dbQuery, populateOptions)
        
        const result = await dbQuery.exec();
        if (!result || result.length === 0) { throw new NotFoundException()}
        return result
    }
  
    async update(id, data) {
        const result = await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!result) { throw new NotFoundException()}
        return result
    }
  
    async delete(id) {
        const result = await this.model.findByIdAndDelete(id);
        if (!result) { throw new NotFoundException()}
        return result
    }
  }
  
  module.exports = BaseRepository;
  