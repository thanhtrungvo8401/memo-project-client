import getDbInstance, { STORE_NAMES } from '.';
import { IVocabulary } from './type';

class VocabularyRepo {
  storeName: string;

  constructor() {
    this.storeName = STORE_NAMES.VOCABULARIES;
  }

  async addOne(v: IVocabulary) {
    const db = await getDbInstance();

    return await db?.add(this.storeName, v);
  }

  async removeById(id: string) {
    const db = await getDbInstance();

    return await db?.delete(this.storeName, id);
  }

  async addMany(values: Array<IVocabulary>) {
    const db = await getDbInstance();

    const tx = db?.transaction(this.storeName, 'readwrite');

    const process = values.map((v) => {
      return tx?.store.add(v);
    });
    return await Promise.all([...process, tx?.done]);
  }

  async updateOne(value: IVocabulary) {
    const db = await getDbInstance();

    return await db?.put(this.storeName, value);
  }

  async getListByLessonId(lessonId: string): Promise<Array<IVocabulary>> {
    const db = await getDbInstance();

    const tx = db?.transaction(this.storeName, 'readonly');
    const store = tx?.objectStore(this.storeName);
    const index = store?.index('lessonId');
    const res = await index?.getAll(lessonId);

    return res ?? [];
  }

  async getAll(): Promise<Array<IVocabulary>> {
    const db = await getDbInstance();

    const res = await db?.getAll(this.storeName);

    return res ?? [];
  }

  async getAllIds(): Promise<Array<IDBValidKey>> {
    const db = await getDbInstance();

    const res = await db?.getAllKeys(this.storeName);

    return res ?? [];
  }
}

export const vocabularyRepo = new VocabularyRepo();
