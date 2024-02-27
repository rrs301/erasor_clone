import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { findUserByEmail } from "./users";

export const getTeams = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await findUserByEmail(ctx, args.email);
    if (!user) {
      throw new Error("User not found");
    }
    const result = await ctx.db
      .query("teams")
      .withIndex("createdBy", (q) => q.eq("createdBy", user._id))
      .collect();

    return result;
  },
});

export const createTeam = mutation({
  args: { teamName: v.string(), createdBy: v.string() },
  handler: async (ctx, args) => {
    const user = await findUserByEmail(ctx, args.createdBy);
    if (!user) {
      throw new Error("User not found");
    }
    const result = await ctx.db.insert("teams", {
      teamName: args.teamName,
      createdBy: user._id,
    });
    return result;
  },
});
