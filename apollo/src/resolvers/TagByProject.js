/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Project }
 */
const project = (parent, _, context) => {
    return context.prisma.tagByProject({ id: parent.id }).project();
  };
  
  const tag = (parent, args, context) => {
      const res = context.prisma.tagByProject({id:parent.id}).tag()
  }

  const name = (parent, _, context) => {
    const res = context.prisma.tagByProject({ id: parent.id }).name()
      return res
    }

    

    const isAssigned = (parent, _, context) => {
        const res = context.prisma.tagByProject({id: parent.id}).isUsed()
        return res
    }

  module.exports = {
    name,
    isAssigned,
    tag,
    project
  }
