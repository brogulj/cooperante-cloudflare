import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251002_173051 from './20251002_173051';
import * as migration_20251008_180741 from './20251008_180741';
import * as migration_20251008_213853 from './20251008_213853';
import * as migration_20251009_120348 from './20251009_120348';
import * as migration_20251009_174844 from './20251009_174844';
import * as migration_20251013_163533 from './20251013_163533';
import * as migration_20251013_182949 from './20251013_182949';
import * as migration_20251013_185216 from './20251013_185216';

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
    name: '20251008_180741',
  },
  {
    up: migration_20251008_213853.up,
    down: migration_20251008_213853.down,
    name: '20251008_213853',
  },
  {
    up: migration_20251009_120348.up,
    down: migration_20251009_120348.down,
    name: '20251009_120348',
  },
  {
    up: migration_20251009_174844.up,
    down: migration_20251009_174844.down,
    name: '20251009_174844',
  },
  {
    up: migration_20251013_163533.up,
    down: migration_20251013_163533.down,
    name: '20251013_163533',
  },
  {
    up: migration_20251013_182949.up,
    down: migration_20251013_182949.down,
    name: '20251013_182949',
  },
  {
    up: migration_20251013_185216.up,
    down: migration_20251013_185216.down,
    name: '20251013_185216'
  },
];
