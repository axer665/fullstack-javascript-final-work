import { Schema } from 'mongoose';

// Идентификатор сущности всегда одного типа
export type ID = string | Schema.Types.ObjectId;
