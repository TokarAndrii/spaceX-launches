const {
  GraphQLObjectTypes,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");

//Types

const LaunchType = new GraphQLObjectTypes({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    launch_year: { type: GraphQLString },
    mission_name: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    details: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    rocket: { type: RocketType },
    links: { type: LinksType }
  })
});

const RocketType = new GraphQLObjectTypes({
  name: Rocket,
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

const LinksType = new GraphQLObjectTypes({
  name: "Links",
  fields: () => ({
    mission_patch_small: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    flickr_images: { type: GraphQLList(GraphQLString) },
    video_link: { type: GraphQLString }
  })
});

//RootQuery
const RootQuery = new GraphQLObjectTypes({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        axios
          .get("https://api.spacexdata.com/v3/launches")
          .then(resp => resp.data)
          .catch(error => {
            console.log(error, " error at GET launches");
            return error;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
