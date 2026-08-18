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

export const pServiceCategory =p.pgTable("p_service_cat", {
    catId: p.integer("service_cat_id").primaryKey(),
    catName: p.text("cat_name").notNull(),
    description: p.text("cat_desc"),
    ordNum: p.integer("ord_num").default(0),
});

// === KARIR === //

export const pJobType =p.pgTable("p_job_type", {
    typeId: p.integer("type_id").primaryKey(),
    typeName: p.text("type_name").notNull(),
    description: p.text("type_desc"),
});


export const tJobs =p.pgTable("ctn_job_career", {
    jobId: p.integer("job_id").primaryKey().default(sql`nextval('job_id_seq')`),
    jobTitle: p.text("job_title").notNull(), 
    category: p.text("job_cat"), 
    typeId: p.text("job_type_id"), 
    location: p.text("location"), 
    jobDesc: p.text("job_desc"),
    qualifications: p.text("qualifications").array(),
    createdBy: p.text("created_by"),
    createdAt: p.timestamp("created_at").defaultNow(),
    updatedBy: p.text("updated_by"),
    updatedAt: p.timestamp("updated_at").$onUpdate(() => new Date()),
    isPublished: p.integer("ispublished").notNull().default(1),
});


// === GALERI === //

export const pGroupGal =p.pgTable("p_group_gallery", {
    groupId: p.integer("group_id").primaryKey(),
    groupName: p.text("group_name").notNull(),
    description: p.text("group_desc"),
    ordNum: p.integer("ord_num").default(0),
});

export const tGallery =p.pgTable("ctn_gallery", {
    galId: p.integer("gal_id").notNull().primaryKey().default(sql`nextval('gal_id_seq')`),
    groupId: p.integer("group_id").notNull().default(0),
    galTitle: p.text("gal_title").notNull(),
    galType: p.text("gal_type"),
    srcUrl: p.text("src_url"),
    thumbnailUrl: p.text("thumbnail_url"),
    createdAt: p.timestamp("created_at").defaultNow(),
    createdBy: p.text("created_by"),
    updatedAt: p.timestamp("updated_at").$onUpdate(() => new Date()),
    updatedBy: p.text("updated_by"),
});