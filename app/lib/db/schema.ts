import * as p from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm/sql";

export const pNewsCat =p.pgTable("p_news_cat", {
    newsCatId: p.integer("news_cat_id").primaryKey(),
    newsCatName: p.text("news_cat_name").notNull(),
});

export const tNews = p.pgTable("ctn_news", {
    newsId: p.integer("news_id").primaryKey().default(sql`nextval('news_id_seq')`),
    newsCatId: p.integer("news_cat_id").references(() => pNewsCat.newsCatId),
    newsTitle: p.text("news_title").notNull(),
    imgUrl: p.text("news_img"),
    authorBy: p.text("author_by"),
    newsContent: p.text("news_content").notNull(),
    isPublished: p.integer("ispublished").notNull().default(1),
    isHeadline: p.integer("isheadline").notNull().default(0),
    createdBy: p.text("created_by").notNull(),
    createdAt: p.timestamp("created_at").defaultNow(),
    updatedBy: p.text("updated_by"),
    updatedAt: p.timestamp("updated_at").$onUpdate(() => new Date()),
    statVisit: p.integer("stat_visit").default(0),
    tags: p.text("tags").array(),
    srcInex: p.text("src_inex"),
    srcNews: p.text("src_news"),
    srcUrl: p.text("src_url"),
});
   
export const tCompanyUsers =p.pgTable("ctn_users", {
    userId: p.text("user_id").primaryKey(),
    userName: p.text("user_name"),
    roleId: p.text("role_id"),
    hashPasswd: p.text("hash_pass"),
});
