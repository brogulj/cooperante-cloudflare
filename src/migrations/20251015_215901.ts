import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_benefits_block_items\` ADD \`icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_block_items_icon_idx\` ON \`pages_blocks_benefits_block_items\` (\`icon_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_benefits_block_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_benefits_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_benefits_block_items\`("_order", "_parent_id", "id") SELECT "_order", "_parent_id", "id" FROM \`pages_blocks_benefits_block_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_benefits_block_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_benefits_block_items\` RENAME TO \`pages_blocks_benefits_block_items\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_block_items_order_idx\` ON \`pages_blocks_benefits_block_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_block_items_parent_id_idx\` ON \`pages_blocks_benefits_block_items\` (\`_parent_id\`);`)
}
