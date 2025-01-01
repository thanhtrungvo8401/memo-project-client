import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'MemoClient';
const DB_VERSION = 1;

export const STORE_NAMES = {
  LESSON: 'Lessons',
  VOCABULARIES: 'Vocabularies',
};

let database: IDBPDatabase | null = null;

function generateVersionUpdateStep(oldVer: number, newVer: number) {
  return Array(newVer - oldVer)
    .fill(oldVer)
    .map((value, index) => `${value + index}-${value + index + 1}`);
}

const initDB = async (): Promise<IDBPDatabase | null> => {
  try {
    if (!database) {
      database = await openDB(DB_NAME, DB_VERSION, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        upgrade(database, oldVersion, newVersion, transaction, _event) {
          const objectStoreNames = database.objectStoreNames;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const upgradeVersionStepByStep: any = {
            '0-1': () => {
              console.log('🚀 ~ 0-1');
              if (!objectStoreNames.contains(STORE_NAMES.LESSON)) {
                database.createObjectStore(STORE_NAMES.LESSON, {
                  keyPath: 'id',
                  autoIncrement: false,
                });
              }

              if (!objectStoreNames.contains(STORE_NAMES.VOCABULARIES)) {
                const vocabStore = database.createObjectStore(
                  STORE_NAMES.VOCABULARIES,
                  {
                    keyPath: 'id',
                    autoIncrement: false,
                  },
                );

                vocabStore.createIndex('lessonId', 'lessonId', {
                  unique: false,
                });
              }
            },
            // "1-2": () => {
            //   console.log("🚀 ~ 1-2");
            //   const vocabStore = transaction.objectStore(
            //     STORE_NAMES.VOCABULARIES
            //   );

            //   vocabStore.createIndex("lessonId", "lessonId", { unique: false });
            // },
          };

          if (
            typeof oldVersion == 'number' &&
            typeof newVersion == 'number' &&
            newVersion > oldVersion
          ) {
            generateVersionUpdateStep(oldVersion, newVersion).forEach((key) => {
              upgradeVersionStepByStep[key]?.();
            });
          }
        },
        blocked() {
          location.reload();
        },
        blocking() {
          location.reload();
        },
        terminated() {
          location.reload();
        },
      });
    }

    return database;
  } catch (error) {
    console.log('🚀 ', error);
    return null;
  }
};

const getDbInstance = async () => {
  if (database) return database;
  else return await initDB();
};

export default getDbInstance;
