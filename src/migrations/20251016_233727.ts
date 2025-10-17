import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block_contact_information_phones\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`phone\` text,
  	\`phone_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_contact_information_phones_order_idx\` ON \`pages_blocks_contact_block_contact_information_phones\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_contact_information_phones_parent_id_idx\` ON \`pages_blocks_contact_block_contact_information_phones\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block_contact_information_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email\` text,
  	\`email_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_contact_information_emails_order_idx\` ON \`pages_blocks_contact_block_contact_information_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_contact_information_emails_parent_id_idx\` ON \`pages_blocks_contact_block_contact_information_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block_contact_information_addresses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`address_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_contact_information_addresses_order_idx\` ON \`pages_blocks_contact_block_contact_information_addresses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_contact_information_addresses_parent_id_idx\` ON \`pages_blocks_contact_block_contact_information_addresses\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block_contact_information_addresses_locales\` (
  	\`address\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_block_contact_information_addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_contact_block_contact_information_addresses_locales_locale_parent_id_unique\` ON \`pages_blocks_contact_block_contact_information_addresses_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block_contact_information_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`social\` text,
  	\`social_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_contact_information_socials_order_idx\` ON \`pages_blocks_contact_block_contact_information_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_contact_information_socials_parent_id_idx\` ON \`pages_blocks_contact_block_contact_information_socials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block_clients\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`client_id\` integer,
  	FOREIGN KEY (\`client_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_clients_order_idx\` ON \`pages_blocks_contact_block_clients\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_clients_parent_id_idx\` ON \`pages_blocks_contact_block_clients\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_clients_client_idx\` ON \`pages_blocks_contact_block_clients\` (\`client_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_testimonials_order_idx\` ON \`pages_blocks_contact_block_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_testimonials_parent_id_idx\` ON \`pages_blocks_contact_block_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block_testimonials_locales\` (
  	\`testimonial\` text,
  	\`person\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_block_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_contact_block_testimonials_locales_locale_parent_id_unique\` ON \`pages_blocks_contact_block_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`contact_information_map_embed_url\` text,
  	\`form_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_order_idx\` ON \`pages_blocks_contact_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_parent_id_idx\` ON \`pages_blocks_contact_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_path_idx\` ON \`pages_blocks_contact_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_block_form_idx\` ON \`pages_blocks_contact_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_block_locales\` (
  	\`title\` text,
  	\`subtitle\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_contact_block_locales_locale_parent_id_unique\` ON \`pages_blocks_contact_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`forms\` ADD \`privacy_policy\` integer;`)
  await db.run(sql`ALTER TABLE \`forms\` ADD \`contact\` integer;`)
  await db.run(sql`ALTER TABLE \`forms\` ADD \`newsletter\` integer;`)
  await db.run(sql`ALTER TABLE \`forms\` ADD \`marketing\` integer;`)
  await db.run(sql`ALTER TABLE \`forms\` ADD \`terms_and_conditions\` integer;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block_contact_information_phones\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block_contact_information_emails\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block_contact_information_addresses\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block_contact_information_addresses_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block_contact_information_socials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block_clients\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_block_locales\`;`)
  await db.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`privacy_policy\`;`)
  await db.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`contact\`;`)
  await db.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`newsletter\`;`)
  await db.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`marketing\`;`)
  await db.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`terms_and_conditions\`;`)
}
