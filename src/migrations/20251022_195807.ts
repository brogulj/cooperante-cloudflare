import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_form_block_locales\` (
  	\`intro_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_form_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`pages_blocks_form_block_locales_locale_parent_id_unique\` ON \`pages_blocks_form_block_locales\` (\`_locale\`,\`_parent_id\`);`,
  )

  await db.run(sql`UPDATE \`pages_blocks_form_block_locales\`
  SET \`intro_content\` = (
    SELECT \`intro_content\` FROM \`pages_blocks_form_block\` 
    WHERE \`pages_blocks_form_block\`.\`id\` = \`pages_blocks_form_block_locales\`.\`_parent_id\`
  )
  WHERE \`_parent_id\` IN (
    SELECT \`id\` FROM \`pages_blocks_form_block\` WHERE \`intro_content\` IS NOT NULL
  );`)

  await db.run(sql`ALTER TABLE \`pages_blocks_form_block\` DROP COLUMN \`intro_content\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_form_block_locales\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`intro_content\` text;`)
}
