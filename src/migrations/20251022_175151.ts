import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_about_us_block_locales\` ADD \`story\` text;`)

  await db.run(sql`UPDATE \`pages_blocks_about_us_block_locales\`
  SET \`story\` = (
    SELECT \`story\` FROM \`pages_blocks_about_us_block\` 
    WHERE \`pages_blocks_about_us_block\`.\`id\` = \`pages_blocks_about_us_block_locales\`.\`_parent_id\`
  )
  WHERE \`_parent_id\` IN (
    SELECT \`id\` FROM \`pages_blocks_about_us_block\` WHERE \`story\` IS NOT NULL
  );`)

  await db.run(sql`ALTER TABLE \`pages_blocks_about_us_block\` DROP COLUMN \`story\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_about_us_block\` ADD \`story\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about_us_block_locales\` DROP COLUMN \`story\`;`)
}
