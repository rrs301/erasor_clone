import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.id("teams"),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("files", args);
    return result;
  },
});

export const getFiles = query({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const result = ctx.db
      .query("files")
      .withIndex("teamId", (q) => q.eq("teamId", args.teamId))
      .order("desc")
      .collect();

    return result;
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, { document: args.document });
    return result;
  },
});

export const updateWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
    });
    return result;
  },
});

export const getFileById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});
