const{GraphQLNonNull,GraphQLString,GraphQLID, GraphQLInt}=require('graphql')
const { phoneType } = require('../types/phone');
var services = require('../../services');

exports.addContact = {
    type:phoneType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        Name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        PhoneNumber: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root, params) {
        return services.addPhones(params);
    }
}
