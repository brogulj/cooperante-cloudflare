import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_lander_hero_stats_locales\` (
  	\`stat_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_lander_hero_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_lander_hero_stats_locales_locale_parent_id_unique\` ON \`pages_blocks_lander_hero_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_block_industries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_block_industries_order_idx\` ON \`pages_blocks_industries_block_industries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_block_industries_parent_id_idx\` ON \`pages_blocks_industries_block_industries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_block_industries_image_idx\` ON \`pages_blocks_industries_block_industries\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_block_industries_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_block_industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_industries_block_industries_locales_locale_parent_id_unique\` ON \`pages_blocks_industries_block_industries_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_block_countries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`flag_id\` integer NOT NULL,
  	FOREIGN KEY (\`flag_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_block_countries_order_idx\` ON \`pages_blocks_industries_block_countries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_block_countries_parent_id_idx\` ON \`pages_blocks_industries_block_countries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_block_countries_flag_idx\` ON \`pages_blocks_industries_block_countries\` (\`flag_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_block_countries_locales\` (
  	\`country\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_block_countries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_industries_block_countries_locales_locale_parent_id_unique\` ON \`pages_blocks_industries_block_countries_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_block_order_idx\` ON \`pages_blocks_industries_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_block_parent_id_idx\` ON \`pages_blocks_industries_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_block_path_idx\` ON \`pages_blocks_industries_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_block_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`subtitle\` text NOT NULL,
  	\`countries_title\` text NOT NULL,
  	\`seo_line\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_industries_block_locales_locale_parent_id_unique\` ON \`pages_blocks_industries_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_block_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`person_image_id\` integer NOT NULL,
  	\`company_logo_id\` integer NOT NULL,
  	\`number_of_stars\` numeric NOT NULL,
  	FOREIGN KEY (\`person_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_block_testimonials_order_idx\` ON \`pages_blocks_testimonials_block_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_block_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials_block_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_block_testimonials_person_imag_idx\` ON \`pages_blocks_testimonials_block_testimonials\` (\`person_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_block_testimonials_company_log_idx\` ON \`pages_blocks_testimonials_block_testimonials\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_block_testimonials_locales\` (
  	\`person_name\` text NOT NULL,
  	\`person_title\` text NOT NULL,
  	\`testimonial\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials_block_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_testimonials_block_testimonials_locales_locale_parent_id_unique\` ON \`pages_blocks_testimonials_block_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_block_order_idx\` ON \`pages_blocks_testimonials_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_block_parent_id_idx\` ON \`pages_blocks_testimonials_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_block_path_idx\` ON \`pages_blocks_testimonials_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_block_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_testimonials_block_locales_locale_parent_id_unique\` ON \`pages_blocks_testimonials_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_workers_testimonials_block_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`person_image_id\` integer NOT NULL,
  	\`country_flag_id\` integer NOT NULL,
  	\`number_of_stars\` numeric NOT NULL,
  	FOREIGN KEY (\`person_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`country_flag_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_workers_testimonials_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_workers_testimonials_block_testimonials_order_idx\` ON \`pages_blocks_workers_testimonials_block_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_workers_testimonials_block_testimonials_parent_id_idx\` ON \`pages_blocks_workers_testimonials_block_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_workers_testimonials_block_testimonials_per_idx\` ON \`pages_blocks_workers_testimonials_block_testimonials\` (\`person_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_workers_testimonials_block_testimonials_cou_idx\` ON \`pages_blocks_workers_testimonials_block_testimonials\` (\`country_flag_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_workers_testimonials_block_testimonials_locales\` (
  	\`person_name\` text NOT NULL,
  	\`person_title\` text NOT NULL,
  	\`testimonial\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_workers_testimonials_block_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_workers_testimonials_block_testimonials_locales_locale_parent_id_unique\` ON \`pages_blocks_workers_testimonials_block_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_workers_testimonials_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_workers_testimonials_block_order_idx\` ON \`pages_blocks_workers_testimonials_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_workers_testimonials_block_parent_id_idx\` ON \`pages_blocks_workers_testimonials_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_workers_testimonials_block_path_idx\` ON \`pages_blocks_workers_testimonials_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_workers_testimonials_block_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_workers_testimonials_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_workers_testimonials_block_locales_locale_parent_id_unique\` ON \`pages_blocks_workers_testimonials_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_f_a_q_block_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_f_a_q_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_f_a_q_block_faqs_order_idx\` ON \`pages_blocks_f_a_q_block_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_f_a_q_block_faqs_parent_id_idx\` ON \`pages_blocks_f_a_q_block_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_f_a_q_block_faqs_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_f_a_q_block_faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_f_a_q_block_faqs_locales_locale_parent_id_unique\` ON \`pages_blocks_f_a_q_block_faqs_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_f_a_q_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_f_a_q_block_order_idx\` ON \`pages_blocks_f_a_q_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_f_a_q_block_parent_id_idx\` ON \`pages_blocks_f_a_q_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_f_a_q_block_path_idx\` ON \`pages_blocks_f_a_q_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_f_a_q_block_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_f_a_q_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_f_a_q_block_locales_locale_parent_id_unique\` ON \`pages_blocks_f_a_q_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lander_hero_stats\` DROP COLUMN \`stat_label\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_lander_hero_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_block_industries\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_block_industries_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_block_countries\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_block_countries_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_block_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_block_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_workers_testimonials_block_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_workers_testimonials_block_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_workers_testimonials_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_workers_testimonials_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_f_a_q_block_faqs\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_f_a_q_block_faqs_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_f_a_q_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_f_a_q_block_locales\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lander_hero_stats\` ADD \`stat_label\` text;`)
}
