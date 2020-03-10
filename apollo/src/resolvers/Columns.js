const labels = (parent, args, context) => {
  const res = context.prisma.column({ id: parent.id }).labels();
  return res;
};

const program = (parent, args, context) => {
  const res = context.prisma.column({ id: parent.id }).program();

  return res;
};

const status = (parent, args, context) => {
  const res = context.prisma.column({ id: parent.id }).status();

  return res;
};
module.exports = {
  labels,
  program,
  status,
};
