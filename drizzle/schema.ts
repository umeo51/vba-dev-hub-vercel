import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * VBA code snippets shared by users
 */
export const snippets = mysqlTable("snippets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  code: text("code").notNull(),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array stored as text
  views: int("views").default(0).notNull(),
  likes: int("likes").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Snippet = typeof snippets.$inferSelect;
export type InsertSnippet = typeof snippets.$inferInsert;

/**
 * User likes on snippets
 */
export const snippetLikes = mysqlTable("snippet_likes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  snippetId: int("snippetId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SnippetLike = typeof snippetLikes.$inferSelect;

/**
 * VBA error codes and solutions
 */
export const errorCodes = mysqlTable("error_codes", {
  id: int("id").autoincrement().primaryKey(),
  errorNumber: varchar("errorNumber", { length: 50 }).notNull(),
  errorName: varchar("errorName", { length: 255 }).notNull(),
  description: text("description").notNull(),
  causes: text("causes").notNull(),
  solutions: text("solutions").notNull(),
  examples: text("examples"),
  views: int("views").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ErrorCode = typeof errorCodes.$inferSelect;
export type InsertErrorCode = typeof errorCodes.$inferInsert;

/**
 * VBA functions and statements reference
 */
export const vbaReferences = mysqlTable("vba_references", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["function", "statement", "object", "property", "method"]).notNull(),
  category: varchar("category", { length: 100 }),
  syntax: text("syntax").notNull(),
  description: text("description").notNull(),
  parameters: text("parameters"), // JSON stored as text
  returnValue: text("returnValue"),
  examples: text("examples").notNull(),
  relatedItems: text("relatedItems"), // JSON array stored as text
  views: int("views").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VbaReference = typeof vbaReferences.$inferSelect;
export type InsertVbaReference = typeof vbaReferences.$inferInsert;

/**
 * Quiz questions for VBA learning
 */
export const quizQuestions = mysqlTable("quiz_questions", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  options: text("options").notNull(), // JSON array stored as text
  correctAnswer: int("correctAnswer").notNull(),
  explanation: text("explanation"),
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"]).notNull(),
  category: varchar("category", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = typeof quizQuestions.$inferInsert;

/**
 * User quiz attempts and scores
 */
export const quizAttempts = mysqlTable("quiz_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questionId: int("questionId").notNull(),
  selectedAnswer: int("selectedAnswer").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = typeof quizAttempts.$inferInsert;

/**
 * Code generation templates
 */
export const codeTemplates = mysqlTable("code_templates", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }),
  template: text("template").notNull(),
  parameters: text("parameters").notNull(), // JSON schema stored as text
  usageCount: int("usageCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CodeTemplate = typeof codeTemplates.$inferSelect;
export type InsertCodeTemplate = typeof codeTemplates.$inferInsert;

/**
 * Guide page feedback from users
 */
export const guideFeedback = mysqlTable("guide_feedback", {
  id: int("id").autoincrement().primaryKey(),
  guidePage: varchar("guidePage", { length: 100 }).notNull(), // e.g., "generator", "formatter", "regex"
  isHelpful: boolean("isHelpful").notNull(),
  userId: int("userId"), // Optional: null for anonymous feedback
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GuideFeedback = typeof guideFeedback.$inferSelect;
export type InsertGuideFeedback = typeof guideFeedback.$inferInsert;
