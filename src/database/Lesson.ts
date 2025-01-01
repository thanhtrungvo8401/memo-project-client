import getDbInstance, { STORE_NAMES } from '.';
import { ILesson } from './type';

class LessonRepo {
  storeName: string;

  constructor() {
    this.storeName = STORE_NAMES.LESSON;
  }

  async getAll(): Promise<Array<ILesson>> {
    const db = await getDbInstance();

    const res: Array<ILesson> = (await db?.getAll(this.storeName)) ?? [];

    res.sort(
      (el1, el2) =>
        new Date(el2.updatedDate).getTime() -
        new Date(el1.updatedDate).getTime(),
    );

    return res ?? [];
  }

  async getOneById(id: string): Promise<ILesson> {
    const db = await getDbInstance();

    const tx = db?.transaction(this.storeName, 'readonly');
    const store = tx?.objectStore(this.storeName);

    return await store?.get(id);
  }

  async addOne(v: ILesson) {
    const db = await getDbInstance();

    return await db?.add(this.storeName, v);
  }

  async removeById(lessonId: string) {
    const db = await getDbInstance();

    const tx = db?.transaction(
      [this.storeName, STORE_NAMES.VOCABULARIES],
      'readwrite',
    );

    const lessonStore = tx?.objectStore(this.storeName);
    const vocabularyStore = tx?.objectStore(STORE_NAMES.VOCABULARIES);

    try {
      const vocabKeys =
        (await vocabularyStore?.index('lessonId').getAllKeys(lessonId)) ?? [];

      for (const key of vocabKeys) {
        await vocabularyStore?.delete(key);
      }

      await lessonStore?.delete(lessonId);
      await tx?.done;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }

  async addMany(values: Array<ILesson>) {
    const db = await getDbInstance();

    const tx = db?.transaction(this.storeName, 'readwrite');

    const process = values.map((v) => {
      return tx?.store.add(v);
    });
    return await Promise.all([...process, tx?.done]);
  }

  // if (key was not found in db, new instance will be inserted)
  async updateOne(value: ILesson) {
    const db = await getDbInstance();

    return await db?.put(this.storeName, value);
  }
}

export const lessonRepo = new LessonRepo();
