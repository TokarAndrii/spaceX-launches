const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");

//Types

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    launch_year: { type: GraphQLString },
    mission_name: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    details: { type: GraphQLString },
    launch_date_unix: { type: GraphQLInt },
    launch_date_local: { type: GraphQLString },
    rocket: { type: RocketType },
    links: { type: LinksType }
  })
});

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

const LinksType = new GraphQLObjectType({
  name: "Links",
  fields: () => ({
    mission_patch_small: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    flickr_images: { type: GraphQLList(GraphQLString) },
    video_link: { type: GraphQLString }
  })
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then(resp => resp.data)
          .catch(err => console.log(err))
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(resp => resp.data)
          .catch(err => console.log(err))
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then(resp => resp.data)
          .catch(err => console.log(err))
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(resp => resp.data)
          .catch(err => console.log(err))
      }
    },

  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
