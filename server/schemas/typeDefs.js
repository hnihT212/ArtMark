// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql` 
type Category {
    _id: ID
    name: String
}
{
    type product {
        _id: ID
        name: String
        
    }
}`;

// export the typeDefs
module.exports = typeDefs;