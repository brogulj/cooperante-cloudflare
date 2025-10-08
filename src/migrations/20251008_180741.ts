import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_lander_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_lander_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_links_order_idx\` ON \`pages_blocks_lander_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_links_parent_id_idx\` ON \`pages_blocks_lander_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_links_locale_idx\` ON \`pages_blocks_lander_hero_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_lander_hero_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`stat_value\` text,
  	\`stat_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_lander_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_stats_order_idx\` ON \`pages_blocks_lander_hero_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_stats_parent_id_idx\` ON \`pages_blocks_lander_hero_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_lander_hero_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_lander_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_logos_order_idx\` ON \`pages_blocks_lander_hero_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_logos_parent_id_idx\` ON \`pages_blocks_lander_hero_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_logos_logo_idx\` ON \`pages_blocks_lander_hero_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_lander_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_order_idx\` ON \`pages_blocks_lander_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_parent_id_idx\` ON \`pages_blocks_lander_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_path_idx\` ON \`pages_blocks_lander_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_background_image_idx\` ON \`pages_blocks_lander_hero\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_lander_hero_locales\` (
  	\`title\` text,
  	\`subtitle\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_lander_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_lander_hero_locales_locale_parent_id_unique\` ON \`pages_blocks_lander_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_block_company_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_trust_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_block_company_logos_order_idx\` ON \`pages_blocks_trust_block_company_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_block_company_logos_parent_id_idx\` ON \`pages_blocks_trust_block_company_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_block_company_logos_logo_idx\` ON \`pages_blocks_trust_block_company_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_block_order_idx\` ON \`pages_blocks_trust_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_block_parent_id_idx\` ON \`pages_blocks_trust_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_block_path_idx\` ON \`pages_blocks_trust_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_block_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_trust_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_trust_block_locales_locale_parent_id_unique\` ON \`pages_blocks_trust_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_services_block_image_icons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_id\` integer NOT NULL,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_services_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_image_icons_order_idx\` ON \`pages_blocks_services_block_image_icons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_image_icons_parent_id_idx\` ON \`pages_blocks_services_block_image_icons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_image_icons_icon_idx\` ON \`pages_blocks_services_block_image_icons\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_services_block_icons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_id\` integer NOT NULL,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_services_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_icons_order_idx\` ON \`pages_blocks_services_block_icons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_icons_parent_id_idx\` ON \`pages_blocks_services_block_icons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_icons_icon_idx\` ON \`pages_blocks_services_block_icons\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_services_block_icons_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_services_block_icons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_services_block_icons_locales_locale_parent_id_unique\` ON \`pages_blocks_services_block_icons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_services_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_order_idx\` ON \`pages_blocks_services_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_parent_id_idx\` ON \`pages_blocks_services_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_path_idx\` ON \`pages_blocks_services_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_block_background_image_idx\` ON \`pages_blocks_services_block\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_services_block_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_services_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_services_block_locales_locale_parent_id_unique\` ON \`pages_blocks_services_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_locale_idx\` ON \`pages_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`navbar_links_link_group_content_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navbar_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navbar_links_link_group_content_links_order_idx\` ON \`navbar_links_link_group_content_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbar_links_link_group_content_links_parent_id_idx\` ON \`navbar_links_link_group_content_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navbar_links_link_group_content_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navbar_links_link_group_content_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`navbar_links_link_group_content_links_locales_locale_parent_id_unique\` ON \`navbar_links_link_group_content_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navbar_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'singleLink' NOT NULL,
  	\`single_link_content_link_type\` text DEFAULT 'reference',
  	\`single_link_content_link_new_tab\` integer,
  	\`single_link_content_link_url\` text,
  	\`single_link_content_link_appearance\` text DEFAULT 'default',
  	\`link_group_content_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navbar\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navbar_links_order_idx\` ON \`navbar_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbar_links_parent_id_idx\` ON \`navbar_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navbar_links_locales\` (
  	\`single_link_content_link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navbar_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`navbar_links_locales_locale_parent_id_unique\` ON \`navbar_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navbar\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`navbar_logo_idx\` ON \`navbar\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`navbar_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`navbar\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navbar_rels_order_idx\` ON \`navbar_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`navbar_rels_parent_idx\` ON \`navbar_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navbar_rels_path_idx\` ON \`navbar_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`navbar_rels_pages_id_idx\` ON \`navbar_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_links_link_group_content_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_links_link_group_content_links_order_idx\` ON \`footer_links_link_group_content_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_links_link_group_content_links_parent_id_idx\` ON \`footer_links_link_group_content_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_links_link_group_content_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_links_link_group_content_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_links_link_group_content_links_locales_locale_parent_id_unique\` ON \`footer_links_link_group_content_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'singleLink' NOT NULL,
  	\`single_link_content_link_type\` text DEFAULT 'reference',
  	\`single_link_content_link_new_tab\` integer,
  	\`single_link_content_link_url\` text,
  	\`single_link_content_link_appearance\` text DEFAULT 'default',
  	\`link_group_content_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_links_order_idx\` ON \`footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_links_parent_id_idx\` ON \`footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_links_locales\` (
  	\`single_link_content_link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_links_locales_locale_parent_id_unique\` ON \`footer_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`social_links_instagram\` text,
  	\`social_links_facebook\` text,
  	\`social_links_twitter\` text,
  	\`social_links_linkedin\` text,
  	\`social_links_youtube\` text,
  	\`social_links_tiktok\` text,
  	\`social_links_whatsapp\` text,
  	\`social_links_telegram\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_logo_idx\` ON \`footer\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_locales\` (
  	\`copyright\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_locales_locale_parent_id_unique\` ON \`footer_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pages_id\` integer REFERENCES pages(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_lander_hero_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_lander_hero_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_lander_hero_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_lander_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_lander_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_trust_block_company_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_trust_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_trust_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_block_image_icons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_block_icons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_block_icons_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`navbar_links_link_group_content_links\`;`)
  await db.run(sql`DROP TABLE \`navbar_links_link_group_content_links_locales\`;`)
  await db.run(sql`DROP TABLE \`navbar_links\`;`)
  await db.run(sql`DROP TABLE \`navbar_links_locales\`;`)
  await db.run(sql`DROP TABLE \`navbar\`;`)
  await db.run(sql`DROP TABLE \`navbar_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_links_link_group_content_links\`;`)
  await db.run(sql`DROP TABLE \`footer_links_link_group_content_links_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_links\`;`)
  await db.run(sql`DROP TABLE \`footer_links_locales\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
