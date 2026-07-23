import * as p from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm/sql";

export const pNewsCat =p.pgTable("p_news_cat", {
    newsCatId: p.integer("news_cat_id").primaryKey(),
    newsCatName: p.text("news_cat_name").notNull(),
});

export const tNews = p.pgTable("ctn_news", {
    newsId: p.integer("news_id").primaryKey().default(sql`nextval('news_id_seq')`),
    newsCatId: p.integer("news_cat_id").notNull().references(() => pNewsCat.newsCatId),
    newsTitle: p.text("news_title").notNull(),
    imgUrl: p.text("news_img").notNull(),
    authorBy: p.text("author_by").notNull(),
    newsContent: p.text("news_content").notNull(),
    isPublished: p.integer("ispublished").notNull().default(1),
    createdBy: p.text("created_by").notNull(),
    createdAt: p.timestamp("created_at").defaultNow(),
    updatedBy: p.text("updated_by"),
    updatedAt: p.timestamp("updated_at").$onUpdate(() => new Date()),
    statVisit: p.integer("stat_visit").default(0),
    tags: p.text("tags").array(),
});
   

// export const usersTable = p.pgTable("users", {
//   id: p.serial().primaryKey(),
//   name: p.text().notNull(),
//   age: p.integer().notNull(),
//   email: p.text().notNull().unique(),
// });
// export const postsTable = p.pgTable("posts", {
//   id: p.serial().primaryKey(),
//   title: p.text().notNull(),
//   content: p.text().notNull(),
//   userId: p
//     .integer()
//     .notNull()
//     .references(() => usersTable.id, { onDelete: "cascade" }),
//   createdAt: p.timestamp().notNull().defaultNow(),
//   updatedAt: p
//     .timestamp()
//     .notNull()
//     .$onUpdate(() => new Date()),
// });
// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;
// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
