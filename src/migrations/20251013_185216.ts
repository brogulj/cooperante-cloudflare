import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`footer_contact_info_addresses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`address_address_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_contact_info_addresses_order_idx\` ON \`footer_contact_info_addresses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_contact_info_addresses_parent_id_idx\` ON \`footer_contact_info_addresses\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_contact_info_addresses_locales\` (
  	\`address_address_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_contact_info_addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_contact_info_addresses_locales_locale_parent_id_unique\` ON \`footer_contact_info_addresses_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_contact_info_phones\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`phone_phone_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_contact_info_phones_order_idx\` ON \`footer_contact_info_phones\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_contact_info_phones_parent_id_idx\` ON \`footer_contact_info_phones\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_contact_info_phones_locales\` (
  	\`phone_phone_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_contact_info_phones\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_contact_info_phones_locales_locale_parent_id_unique\` ON \`footer_contact_info_phones_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_contact_info_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_email_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_contact_info_emails_order_idx\` ON \`footer_contact_info_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_contact_info_emails_parent_id_idx\` ON \`footer_contact_info_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_contact_info_emails_locales\` (
  	\`email_email_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_contact_info_emails\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_contact_info_emails_locales_locale_parent_id_unique\` ON \`footer_contact_info_emails_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`footer_contact_info_addresses\`;`)
  await db.run(sql`DROP TABLE \`footer_contact_info_addresses_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_contact_info_phones\`;`)
  await db.run(sql`DROP TABLE \`footer_contact_info_phones_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_contact_info_emails\`;`)
  await db.run(sql`DROP TABLE \`footer_contact_info_emails_locales\`;`)
}
