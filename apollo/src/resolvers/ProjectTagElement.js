// @ts-check

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Project }
 */
const project = (parent, _, context) => {
  return context.prisma.projectTagElement({ id: parent.id }).project();
};
/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Tag }
 */
const tag = (parent, _, context) => {
  return context.prisma.projectTagElement({ id: parent.id }).tag();
};



module.exports = {
  project,
  tag,
};
