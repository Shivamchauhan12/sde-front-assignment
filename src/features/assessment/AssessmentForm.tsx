import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { assessmentSchema, MOBILITY, type Assessment } from './schema';
import type { AssessmentFormValues } from './types';

const INITIAL_VALUES: AssessmentFormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: '',
  assessmentDate: '',
  mobility: '',
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: '',
  consentObtained: false,
};

const SAMPLE_FIXTURE: AssessmentFormValues = {
  mrn: 'MRN-004821',
  patientName: 'Sushila Deshpande',
  dateOfBirth: '1949-03-12',
  assessmentDate: '2026-08-07',
  mobility: 'cane',
  barthelIndex: 80,
  medicationCount: 3,
  pharmacistReviewRequested: false,
  followUpDate: '2026-09-04',
  consentObtained: true,
};

const mobilityOptions = MOBILITY.map((item) => ({
  value: item,
  label: item.charAt(0).toUpperCase() + item.slice(1),
}));

const parseIsoDate = (val: string | null): Date | null => {
  if (!val) {
    return null;
  }
  const d = dayjs(val, 'YYYY-MM-DD', true);
  return d.isValid() ? d.toDate() : null;
};

const formatIsoDate = (date: Date | string | null): string => {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    return date;
  }
  return dayjs(date).format('YYYY-MM-DD');
};

interface AssessmentFormProps {
  onSave?: (values: Assessment) => Promise<void> | void;
}

export function AssessmentForm({ onSave }: AssessmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<Assessment | null>(null);

  const form = useForm<AssessmentFormValues>({
    mode: 'controlled',
    initialValues: INITIAL_VALUES,
    validate: schemaResolver(assessmentSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    setSubmittedData(null);

    // Simulated save delay (~800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Parse values via Zod schema to ensure output matches Assessment shape
    const parsedValues = assessmentSchema.parse(values);

    if (onSave) {
      await onSave(parsedValues);
    }

    setSubmittedData(parsedValues);
    form.reset();
    setLoading(false);
  });

  const handleLoadSample = () => {
    form.setValues(SAMPLE_FIXTURE);
    setSubmittedData(null);
  };

  return (
    <Container size="sm" py="xl">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} mb="lg">
          Geriatric Care Assessment Form
        </Title>

        {submittedData && (
          <Alert color="green" title="Assessment Saved Successfully" mb="lg">
            <Code block>{JSON.stringify(submittedData, null, 2)}</Code>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Medical record number"
              placeholder="MRN-004821"
              key={form.key('mrn')}
              {...form.getInputProps('mrn')}
            />

            <TextInput
              label="Patient name"
              key={form.key('patientName')}
              {...form.getInputProps('patientName')}
            />

            <DateInput
              label="Date of birth"
              valueFormat="YYYY-MM-DD"
              key={form.key('dateOfBirth')}
              value={parseIsoDate(form.values.dateOfBirth)}
              onChange={(d) => form.setFieldValue('dateOfBirth', formatIsoDate(d))}
              error={form.errors.dateOfBirth}
            />

            <DateInput
              label="Assessment date"
              valueFormat="YYYY-MM-DD"
              maxDate={new Date()}
              key={form.key('assessmentDate')}
              value={parseIsoDate(form.values.assessmentDate)}
              onChange={(d) => form.setFieldValue('assessmentDate', formatIsoDate(d))}
              error={form.errors.assessmentDate}
            />

            <Select
              label="Mobility"
              data={mobilityOptions}
              key={form.key('mobility')}
              {...form.getInputProps('mobility')}
            />

            <NumberInput
              label="Barthel Index"
              step={5}
              min={0}
              max={100}
              key={form.key('barthelIndex')}
              {...form.getInputProps('barthelIndex')}
            />

            <NumberInput
              label="Regular medications"
              min={0}
              max={30}
              key={form.key('medicationCount')}
              {...form.getInputProps('medicationCount')}
            />

            <Checkbox
              label="Pharmacist review requested"
              key={form.key('pharmacistReviewRequested')}
              {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
            />

            <DateInput
              label="Next review date"
              valueFormat="YYYY-MM-DD"
              key={form.key('followUpDate')}
              value={parseIsoDate(form.values.followUpDate)}
              onChange={(d) => form.setFieldValue('followUpDate', formatIsoDate(d))}
              error={form.errors.followUpDate}
            />

            <Checkbox
              label="Patient or representative has given consent"
              key={form.key('consentObtained')}
              {...form.getInputProps('consentObtained', { type: 'checkbox' })}
            />

            <Group justify="flex-end" mt="md">
              <Button type="button" variant="default" onClick={handleLoadSample} disabled={loading}>
                Load sample patient
              </Button>
              <Button type="submit" loading={loading}>
                Save Assessment
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
