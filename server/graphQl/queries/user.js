var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var services = require('../../services');
var phoneType = require('../types/phone').phoneType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      phones: {
        type: new GraphQLList(phoneType),
        resolve: services.getUsers
      }
    }
  }
});