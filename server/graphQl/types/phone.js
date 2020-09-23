const {GraphQLObjectType,GraphQLNonNull,GraphQLID,GraphQLString} =require('graphql')

// re-schema for our db
exports.phoneType = new GraphQLObjectType({
  name: 'phone',
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      Name: {
        type: GraphQLString
      },
      PhoneNumber: {
        type: GraphQLString
      }
    }
  }
});