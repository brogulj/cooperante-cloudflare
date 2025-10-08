import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251002_173051 from './20251002_173051';
import * as migration_20251008_180741 from './20251008_180741';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251002_173051.up,
    down: migration_20251002_173051.down,
    name: '20251002_173051',
  },
  {
    up: migration_20251008_180741.up,
    down: migration_20251008_180741.down,
    name: '20251008_180741'
  },
];
