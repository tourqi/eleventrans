import { describe, it, expect } from 'vitest';
import { UI, DATA } from '../data/translations';

describe('translations', () => {
  it('should have both id and en languages', () => {
    expect(UI.id).toBeDefined();
    expect(UI.en).toBeDefined();
  });

  it('should have matching keys in id and en', () => {
    const idKeys = Object.keys(UI.id);
    const enKeys = Object.keys(UI.en);

    const missingInEn = idKeys.filter((key) => !enKeys.includes(key));
    const missingInId = enKeys.filter((key) => !idKeys.includes(key));

    expect(missingInEn).toEqual([]);
    expect(missingInId).toEqual([]);
  });

  it('should not have empty translation values', () => {
    const emptyId = Object.entries(UI.id).filter(([, v]) => v === '');
    const emptyEn = Object.entries(UI.en).filter(([, v]) => v === '');

    expect(emptyId).toEqual([]);
    expect(emptyEn).toEqual([]);
  });

  it('DATA translations should have non-empty values', () => {
    const emptyData = Object.entries(DATA).filter(([, v]) => v === '');
    expect(emptyData).toEqual([]);
  });
});
