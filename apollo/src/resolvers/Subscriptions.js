const newLabelSubscribe = (parent, args, context) => {
  const res = context.prisma.$subscribe
    .label({ mutation_in: ['CREATED'] })
    .node();
  return res;
};

const newLabel = {
  subscribe: newLabelSubscribe,
  resolve: payload => {
    return payload;
  },
};

module.exports = {
  newLabel,
};
