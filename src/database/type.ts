export interface ILesson {
  id: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  note?: string;
  link?: string;
}

export interface IVocabulary {
  id: string;
  vocabulary: string;
  meaning: string;
  lessonId: string;
  synonyms?: string;
  usage?: string;
}
