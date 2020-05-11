const name = (parent, _, context) => {
    const res = context.prisma.tag({ id: parent.id }).name()
      return res
    }


    const isUsed = (parent, _, context) => {
        const res = context.prisma.tag({id: parent.id}).isUsed()
        return res
    }

  module.exports = {
    name,
    isUsed
  }
