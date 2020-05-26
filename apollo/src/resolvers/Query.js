// @ts-nocheck

/** IMPORTS WILL MAYBE FOUND IS generated/prisma-client and add to apollo.graphql
/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').ProjectNullablePromise }
 */

// Queries must be defined to return fields of the same type
// See the Query field in the type definitions for examples

/** ********** PROGRAMS & PROGRAM ***************/
const programs = (parent, args, context) => {
  return context.prisma.programs();
};

const products = (parent, args, context) => {
  const res = context.prisma.products();
  return res;
};

/** ********** PROJECTS & PROJECT ***************/
const projects = (parent, args, context) => {
  const res = context.prisma.projects(args);
  return res;
};

const project = (parent, args, context) => {
  const { where } = args;
  console.log(args.where.id);
  const res = context.prisma.project(where);
  return res;
};

/** ********** PERSON & PERSONS ***************/
/** ********** VALUE DETERMINES YOU LEVEL OF ACCESS ***************/
const persons = (_, args, context) => {
  const res = context.prisma.persons();
  return res;
};

/** ********** ME ***************/
/** ********** CONNECTS OBJECT USER DURING LOGGING IN ***************/
const me = (parent, args, context) => {
  console.log('%O', context.user);

  return context.user;
};

const person = (_, args, context) => {
  const { where } = args;
  const res = context.prisma.person(where);
  return res;
};

/** ********** CodeClimateSnapshot ***************/
const codeClimateSnapshot = async (parent, args, context) => {
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
};

/** ********** GithubReposForOrg ***************/
/** ********** CONNECTED VIA PROGRAMS ***************/
const githubReposForOrg = async (parent, args, context) => {
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
};

/** ********** SparkyBoy ***************/
const sparkyBoy = async (parent, args, context) => {
  const { owner, name } = args;
  const GithubConnection = context.dataSources.gitHubAPI;
  try {
    const res = await GithubConnection.getSparkline(owner, name);
    return res;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

/** ********** SparkyDate ***************/
const sparkyDate = async (parent, args, context) => {
  const { owner, name, until } = args;
  const GithubConnection = context.dataSources.gitHubAPI;
  try {
    const res = await GithubConnection.getSparkline(owner, name, until);
    return res;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

/** ********** GithubPulse ***************/
const githubPulse = async (_, args, context) => {
  context.logger.debug('Query.gitHubPulse: %O', args);

  const { owner, name } = args;

  /** @type {import("../datasources/GitHubAPI")} */
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
};

/** ********** GithubRepos & GithubRepo ***************/
const githubRepos = (parent, args, context) => {
  const res = context.prisma.ghrepoes();
  return res;
};

const githubRepo = (parent, args, context) => {
  const { id } = args;
  const res = context.prisma.ghrepo({ id });
  return res;
};

/** ********** TAGS & TAG ***************/
const tags = (parent, args, context) => {
  const res = context.prisma.tags();
  return res;
};

const tag = (parent, args, context) => {
  const { where } = args;
  const res = context.prisma.tag(where);
  return res;
};

/****************** Uncommented code after engineer manger's refactoring ************************/
/********** Exisits in program just not fully uncommented to initate features *******************/
/* CONTAINS
 * Notes
 * Note
 * Statuses
 * Status
 * Labels
 * Label
 */

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

module.exports = {
  me,
  programs,
  products,
  projects,
  project,
  persons,
  person,
  codeClimateSnapshot,
  githubRepo,
  githubRepos,
  githubReposForOrg,
  sparkyBoy,
  sparkyDate,
  githubPulse,
  tags,
  tag,
  // projectTagElement,
  // projectTagElements

  /****************** Uncommented code after engineer manger's refactoring ************************/
  /********** Exisits in program just not fully uncommented to initate features *******************/
  // statuses,
  // status,
  // labels,
  // label,
  // note,
  // notes,
};
