import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_globe_block_industries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_globe_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_industries_order_idx\` ON \`pages_blocks_industries_globe_block_industries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_industries_parent_id_idx\` ON \`pages_blocks_industries_globe_block_industries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_industries_image_idx\` ON \`pages_blocks_industries_globe_block_industries\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_globe_block_industries_locales\` (
  	\`industry\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_globe_block_industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_industries_globe_block_industries_locales_locale_parent_id_unique\` ON \`pages_blocks_industries_globe_block_industries_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_globe_block_countries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_globe_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_countries_order_idx\` ON \`pages_blocks_industries_globe_block_countries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_countries_parent_id_idx\` ON \`pages_blocks_industries_globe_block_countries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_globe_block_countries_locales\` (
  	\`country\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_globe_block_countries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_industries_globe_block_countries_locales_locale_parent_id_unique\` ON \`pages_blocks_industries_globe_block_countries_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_globe_block_locations_lat_long\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`lat_long\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_globe_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_locations_lat_long_order_idx\` ON \`pages_blocks_industries_globe_block_locations_lat_long\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_locations_lat_long_parent_id_idx\` ON \`pages_blocks_industries_globe_block_locations_lat_long\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_globe_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`main_location_lat_long\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_order_idx\` ON \`pages_blocks_industries_globe_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_parent_id_idx\` ON \`pages_blocks_industries_globe_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_globe_block_path_idx\` ON \`pages_blocks_industries_globe_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_globe_block_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries_globe_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_industries_globe_block_locales_locale_parent_id_unique\` ON \`pages_blocks_industries_globe_block_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_industries_globe_block_industries\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_globe_block_industries_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_globe_block_countries\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_globe_block_countries_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_globe_block_locations_lat_long\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_globe_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries_globe_block_locales\`;`)
}
