import type { Assessment } from './schema';

export type AssessmentFormValues = Omit<
  Assessment,
  'barthelIndex' | 'medicationCount' | 'mobility'
> & {
  barthelIndex: number | '';
  medicationCount: number | '';
  mobility: Assessment['mobility'] | '';
};
