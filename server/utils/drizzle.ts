import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '@/server/db/schema';

export function db() {
  return drizzle({ 
    connection: {
      url: `file:${process.env.SQLITE_FILE_PATH}`, 
    },
    schema: schema
  });
}


