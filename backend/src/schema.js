const { integer, text, json } = require("drizzle-orm/gel-core");
const { sqliteTable } = require("drizzle-orm/sqlite-core");
const { relations } = require("drizzle-orm");

const difficulty = ["Easy", "Medium", "Hard", "Don't Bother"];
// const status = ["Accepted", "Rejected"];

const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

const problems = sqliteTable("problems", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  authorId: integer('author_id').notNull(),
  description: text("description").notNull(),
  defaultCode: text("default_code").notNull(),
  examples: json("examples").notNull(),
  run_testcases: json("run_testcases").notNull(),
  constraints: text("constraints").notNull(),
  difficulty: text("difficulty", { enums: difficulty }).notNull(),
  param_types: text('param_types').notNull(),
  return_type: text('return_type'),
  function_name: text("function_name").notNull(),
  timelimit: integer("timelimit").notNull(),      // in ms
  memorylimit: integer("memorylimit").notNull(),  // in MB
});

const submissions = sqliteTable("submissions", {
  submissionId: text("submissionId").primaryKey(),
  userId: integer("userId"),
  problemId: integer("problemId"),
  code: text("code").notNull(),
  status: text("status").notNull(),
  result: text("result").notNull(),
});

const submit_testcases = sqliteTable("submit_testcases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  problemId: integer("problem_id").notNull(),
  input: text("input").notNull(),
  expectedOutput: text("expected_output").notNull(),
});

const usersRelations = relations(users, ({ many }) => ({
  submissions: many(submissions),
  problems: many(problems),
}));

const problemsRelations = relations(problems, ({ many, one }) => ({
  submissions: many(submissions),
  author: one(users, {
    fields: [problems.authorId],
    references: [users.id],
  }),
  submit_testcases: many(submit_testcases, {
    fields: [problems.id],
    references: [submit_testcases.problemId],
  }),
}));

const submissionsRelations = relations(submissions, ({ one }) => ({
  user: one(users, {
    fields: [submissions.userId],
    references: [users.id],
  }),
  problem: one(problems, {
    fields: [submissions.problemId],
    references: [problems.id],
  }),
}));

const submitTestcasesRelations = relations(submit_testcases, ({ one }) => ({
  problem: one(problems, {
    fields: [submit_testcases.problemId],
    references: [problems.id],
  }),
}));

module.exports = {
  users,
  problems,
  submissions,
  submit_testcases,
  usersRelations,
  problemsRelations,
  submissionsRelations,
  submitTestcasesRelations,
};
