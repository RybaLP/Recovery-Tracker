import { Addiction } from './addiction';

export interface AddictionStore {
  addictions: Addiction[];
  loading: boolean;
  error: string | null;
  getAddictionByUser: () => Promise<void>;
}