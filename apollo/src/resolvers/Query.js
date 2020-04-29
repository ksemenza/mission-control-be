// @ts-check

// Queries must be defined to return fields of the same type
// See the Query field in the type definitions for examples

// /**
//  * @param { import('../context').ApolloContext } context
//  * @returns { import('../generated/prisma-client').ProjectNullablePromise }
//  */

//  /**
//    * @param { import('../context').ApolloContext } context
//    * @returns { import('../context').User }
//    */

//    /**
//    * @param { import('../context').ApolloContext } context
//    * @returns any
//    */

//    /** @type {import("../datasources/GitHubAPI")} */

const Query= {
  programs: (parent, args, context) => {
    return context.prisma.programs();
  },
  
  projects: (parent, { filter }, ctx, info) => {
    let where = null;
    if (filter) {
      where = {
        OR: [
          { name: filter }
        ]
      }
    }
    return ctx.db.query.projects({ where }, info)
  },

  project: (_, args, context) => {
    const { where } = args;
    const res = context.prisma.project(where);
    return res;
  },
   codeClimateSnapshot: async (parent, args, context) => {
    const CodeClimateConnection = context.dataSources.codeClimateAPI;
    try {
      const { slug } = args;
      const res = await CodeClimateConnection.getRepobyGHSlug(slug);
      const link = res.data[0].links.self;
      const repoId = res.data[0].id;
      const snapShot =
        res.data[0].relationships.latest_default_branch_snapshot.data.id;
      const name = res.data[0].attributes.human_name;
  
      let snapShotResponse = await CodeClimateConnection.getSnapshot(
        repoId,
        snapShot,
      );
      snapShotResponse = { ...snapShotResponse, name, link };
      return snapShotResponse;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  
  githubReposForOrg: async (parent, args, context) => {
    const { search, org } = args;
    let name;
    if (!org) {
      const grams = await context.prisma.programs();
      name = grams[0].name;
    } else name = org;
    const dynamicQuery = `${search} org:${name}`;
    const GithubConnection = context.dataSources.gitHubAPI;
    try {
      const res = await GithubConnection.getReposByOrg(dynamicQuery);
      return res;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  
  sparkyBoy: async (parent, args, context) => {
    const { owner, name } = args;
    const GithubConnection = context.dataSources.gitHubAPI;
    try {
      const res = await GithubConnection.getSparkline(owner, name);
      return res;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  
  sparkyDate: async (parent, args, context) => {
    const { owner, name, until } = args;
    const GithubConnection = context.dataSources.gitHubAPI;
    try {
      const res = await GithubConnection.getSparkline(owner, name, until);
      return res;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  
  
    githubPulse: async (_, args, context) => {
    context.logger.debug('Query.gitHubPulse: %O', args);
  
    const { owner, name } = args;
  
    
    const GithubConnection = context.dataSources.gitHubAPI;
    try {
      return await GithubConnection.getPulse(owner, name);
    } catch (error) {
      context.logger.error(
        'Error executing GithubConnection.getPulse\n%O',
        error,
      );
      throw new Error(error);
    }
  },
  
  githubRepos: (parent, args, context) => {
    const res = context.prisma.ghrepoes();
    return res;
  },
  
  githubRepo: (parent, args, context) => {
    const { id } = args;
    const res = context.prisma.ghrepo({ id });
    return res;
  },
  
  
  me: (parent, args, context) => {
    console.log('%O', context.user);
  
    return context.user;
  },
  persons: (_, args, context) => {
    const res = context.prisma.persons();
    return res;
  },
  
  person: (_, args, context) => {
    const { where } = args;
    const res = context.prisma.person(where);
    return res;
  }
}// end query



// const projects = (parent, args, context) => {
//   const res = context.prisma.projects();
//   return res;
// };


   

// /**
//  * @param Nil _parent
//  * @param { import('../context').ApolloContext } context
//  * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').Status> }
//  */
// const statuses = (_parent, _args, context) => {
//   const res = context.prisma.statuses();
//   return res;
// };

// const status = (parent, args, context) => {
//   const { where } = args;
//   const res = context.prisma.status(where);
//   return res;
// };

// const labels = (parent, args, context) => {
//   const res = context.prisma.labels();
//   return res;
// };

// const label = (_, args, context) => {
//   const { id } = args;
//   const res = context.prisma.label({ id });
//   return res;
// };



// const note = (_, args, context) => {
//   const { id } = args;
//   const res = context.prisma.note({ id });
//   return res;
// };

// const notes = (_, args, context) => {
//   const { orderBy, privatePerm } = args;
//   const res = context.prisma.notes({ orderBy });
//   const where = { privateNote: false };
//   const resPublic = context.prisma.notes({ where });
//   if (privatePerm) {
//     return res;
//   }
//   return resPublic;
// };



// module.exports = {
//   programs,
//   // products,
//   projects,
//   project,
//   // statuses,
//   // status,
//   // labels,
//   // label,
//   persons,
//   person,
//   // note,
//   // notes,
//   codeClimateSnapshot,
//   githubRepo,
//   githubRepos,
//   githubReposForOrg,
//   sparkyBoy,
//   sparkyDate,
//   githubPulse,
//   me,
// };

module.exports= {Query};