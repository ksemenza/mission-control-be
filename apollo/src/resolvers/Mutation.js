// Mutations must be defined explicitly in the type definition
// inside of the graphql schema to be valid.
// See schema.js in src for examples

// Create a new program, takes a string
const createProgram = (_parent, args, context) => {
  const program = context.prisma.createProgram({ name: args.name });

  return program;
};

// Create a new product, takes a string and a program ID
const createProduct = (_parent, args, context) => {
  const product = context.prisma.createProduct({
    name: args.name,
    program: { connect: { id: args.id } },
  });

  return product;
};

// Create a new project, takes a string and a product ID
const createProject = (_parent, args, context) => {
  const program = context.prisma.createProject({
    name: args.name,
    product: { connect: { id: args.id } },
  });

  return program;
};

// Create a new person, takes two strings and a role enum
// NOTE: email field is @unique, for enum see type defs
const createPerson = (_parent, args, context) => {
  const { name, email, role } = args;
  const person = context.prisma.createPerson({ name, email, role });

  return person;
};

// Adds a Section Lead to a project, takes a string where email = person email
// Takes a project ID where a project exists
const addProjectSectionLead = (_parent, args, context) => {
  const { id, email } = args;
  const addSectionLead = context.prisma.updateProject({
    data: { sectionLead: { connect: { email } } },
    where: { id },
  });

  return addSectionLead;
};

// Adds a Team Lead to a project, takes a string where email = person email
// Takes a project ID where a project exists
const addProjectTeamLead = (_parent, args, context) => {
  const { id, email } = args;
  const addTeamLead = context.prisma.updateProject({
    data: { teamLead: { connect: { email } } },
    where: { id },
  });

  return addTeamLead;
};

// Adds a new member to a project, takes a string where email = person email
// Takes a project ID where a project exists
const addProjectMember = (_parent, args, context) => {
  const { id, email } = args;
  const addMember = context.prisma.updateProject({
    data: { team: { connect: { email } } },
    where: { id },
  });

  return addMember;
};

const createNote = (_parent, args, context) => {
  const { id } = args;
  const note = context.prisma.updateProject({
    data: { project: { connect: { id } } },
    where: { id },
  });

  return note;
};

module.exports = {
  createProgram,
  createProduct,
  createProject,
  createPerson,
  addProjectSectionLead,
  addProjectTeamLead,
  addProjectMember,
  createNote,
};
