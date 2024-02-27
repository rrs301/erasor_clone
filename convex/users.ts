import { v } from "convex/values";
import { DatabaseReader, mutation, query } from "./_generated/server";

export function findUserByEmail(ctx: { db: DatabaseReader }, email: string) {
  return ctx.db
    .query("users")
    .withIndex("email", (q) => q.eq("email", email))
    .unique();
}
export const getUser = query({
  args: {
    email: v.string(),
  },

  handler: async (ctx, args) => {
    return findUserByEmail(ctx, args.email);
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});
