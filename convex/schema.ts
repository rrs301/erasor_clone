import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileFields = {
  fileName: v.string(),
  teamId: v.id("teams"),
  createdBy: v.string(),
  archive: v.boolean(),
  document: v.string(),
  whiteboard: v.string(),
};
export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
  }).index("email", ["email"]),
  files: defineTable(fileFields).index("teamId", ["teamId"]),
  teams: defineTable({
    teamName: v.string(),
    createdBy: v.id("users"),
  }).index("createdBy", ["createdBy"]),
});
