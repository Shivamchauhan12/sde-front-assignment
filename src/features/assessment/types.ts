import type { Assessment } from './schema';

export type AssessmentFormValues = Omit<
  Assessment,
  'barthelIndex' | 'medicationCount' | 'mobility' | 'consentObtained'
> & {
  barthelIndex: number | '';
  medicationCount: number | '';
  mobility: Assessment['mobility'] | '';
  consentObtained: boolean;
};
