import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { render } from '../../../test-utils';
import { AssessmentForm } from './AssessmentForm';
import { assessmentSchema } from './schema';

describe('Geriatric Assessment Form & Schema', () => {
  it('validates dateOfBirth age 60 boundary via safeParse', () => {
    const validBaseData = {
      mrn: 'MRN-004821',
      patientName: 'Sushila Deshpande',
      assessmentDate: '2026-08-07',
      mobility: 'cane' as const,
      barthelIndex: 80,
      medicationCount: 3,
      pharmacistReviewRequested: false,
      followUpDate: '2026-09-04',
      consentObtained: true as const,
    };

    // Exactly 60 years before assessmentDate (2026-08-07 - 60 years = 1966-08-07) -> should pass
    const exactly60Result = assessmentSchema.safeParse({
      ...validBaseData,
      dateOfBirth: '1966-08-07',
    });
    expect(exactly60Result.success).toBe(true);

    // One day short of 60 years (1966-08-08) -> should fail on dateOfBirth
    const oneDayShortResult = assessmentSchema.safeParse({
      ...validBaseData,
      dateOfBirth: '1966-08-08',
    });
    expect(oneDayShortResult.success).toBe(false);
    if (!oneDayShortResult.success) {
      const dateOfBirthIssue = oneDayShortResult.error.issues.find((issue) =>
        issue.path.includes('dateOfBirth')
      );
      expect(dateOfBirthIssue).toBeDefined();
      expect(dateOfBirthIssue?.message).toBe('This pathway is for patients aged 60 and over');
    }
  });

  it('renders form, loads sample patient, submits, and calls save handler with parsed values', async () => {
    const handleSave = vi.fn();
    const user = userEvent.setup();

    render(<AssessmentForm onSave={handleSave} />);

    // Click "Load sample patient"
    const loadSampleBtn = screen.getByRole('button', { name: /load sample patient/i });
    await user.click(loadSampleBtn);

    // Click "Save Assessment"
    const submitBtn = screen.getByRole('button', { name: /save assessment/i });
    await user.click(submitBtn);

    // Wait for the simulated async save to complete
    await waitFor(
      () => {
        expect(handleSave).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 }
    );

    expect(handleSave).toHaveBeenCalledWith({
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
    });
  });
});
