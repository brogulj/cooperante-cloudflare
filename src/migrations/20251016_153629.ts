import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`job_ads\` ADD \`form_id\` integer REFERENCES forms(id);`)
  await db.run(sql`CREATE INDEX \`job_ads_form_idx\` ON \`job_ads\` (\`form_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_job_ads\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`employment_type\` text NOT NULL,
  	\`number_of_openings\` numeric NOT NULL,
  	\`status\` text DEFAULT 'inactive',
  	\`translated\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_job_ads\`("id", "slug", "slug_lock", "employment_type", "number_of_openings", "status", "translated", "updated_at", "created_at") SELECT "id", "slug", "slug_lock", "employment_type", "number_of_openings", "status", "translated", "updated_at", "created_at" FROM \`job_ads\`;`)
  await db.run(sql`DROP TABLE \`job_ads\`;`)
  await db.run(sql`ALTER TABLE \`__new_job_ads\` RENAME TO \`job_ads\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`job_ads_slug_idx\` ON \`job_ads\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`job_ads_updated_at_idx\` ON \`job_ads\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`job_ads_created_at_idx\` ON \`job_ads\` (\`created_at\`);`)
}
