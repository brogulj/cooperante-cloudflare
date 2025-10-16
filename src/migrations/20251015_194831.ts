import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_services_block_locales\` ADD \`content\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_services_block_locales\` DROP COLUMN \`description\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_services_block_locales\` ADD \`description\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_services_block_locales\` DROP COLUMN \`content\`;`)
}
