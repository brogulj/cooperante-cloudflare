import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_c_s_v_table_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`dark\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_s_v_table_block_order_idx\` ON \`pages_blocks_c_s_v_table_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_s_v_table_block_parent_id_idx\` ON \`pages_blocks_c_s_v_table_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_s_v_table_block_path_idx\` ON \`pages_blocks_c_s_v_table_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_c_s_v_table_block_locales\` (
  	\`title\` text NOT NULL,
  	\`csv\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_c_s_v_table_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_c_s_v_table_block_locales_locale_parent_id_unique\` ON \`pages_blocks_c_s_v_table_block_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_c_s_v_table_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_c_s_v_table_block_locales\`;`)
}
