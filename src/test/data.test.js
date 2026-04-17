import { describe, it, expect } from 'vitest';
import { ARMADA_OPTIONS, PENGINAPAN_OPTIONS, LOKASI_OPTIONS, MAKAN_OPTIONS, KEGIATAN_OPTIONS, ADDITIONAL_OPTIONS } from '../data/calculator';
import { FLEET } from '../data/fleet';
import { PACKAGES } from '../data/packages';
import { SERVICES } from '../data/services';
import { TEAM } from '../data/team';

describe('data integrity', () => {
  it('all fleet items should have required fields', () => {
    FLEET.forEach((v) => {
      expect(v.id).toBeTruthy();
      expect(v.name).toBeTruthy();
      expect(v.capacity).toBeTruthy();
    });
  });

  it('all packages should have required fields', () => {
    PACKAGES.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.meta).toBeDefined();
    });
  });

  it('all services should have required fields', () => {
    SERVICES.forEach((s) => {
      expect(s.id).toBeTruthy();
      expect(s.title).toBeTruthy();
    });
  });

  it('all team members should have required fields', () => {
    TEAM.forEach((t) => {
      expect(t.name).toBeTruthy();
      expect(t.role).toBeTruthy();
      expect(t.desc).toBeTruthy();
    });
  });

  it('armada options should have prices', () => {
    ARMADA_OPTIONS.forEach((a) => {
      expect(a.price).toBeGreaterThan(0);
    });
  });

  it('additional options should only use perPax flag (no perTrip)', () => {
    ADDITIONAL_OPTIONS.forEach((opt) => {
      expect(opt).not.toHaveProperty('perTrip');
      expect(opt).not.toHaveProperty('busOrRequest');
    });
  });

  it('kegiatan options should have valid lokasi references', () => {
    const validLokasi = PACKAGES.map((p) => p.id);
    KEGIATAN_OPTIONS.forEach((k) => {
      k.lokasi.forEach((loc) => {
        expect(validLokasi).toContain(loc);
      });
    });
  });
});
