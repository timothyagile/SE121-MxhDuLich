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

        return await query.exec();
    }
  
    async findAll(query = {}, populateOptions = null) {
        let dbQuery = this.model.find(query);
        
        dbQuery = this.applyPopulateOptions(dbQuery, populateOptions)

        return await dbQuery.exec();
    }
  
    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }
  
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
  }
  
  module.exports = BaseRepository;
  