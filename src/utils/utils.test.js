import { validatePhone } from './utils';

describe('utils', () => {
  describe('Phone validation', () => {
    it('should be valid if is trigger onChange with a correct format', () => {
      expect(validatePhone('+57 3106')).toBe(true);
    });
    it('should be false if is trigger onChange with a invalid format', () => {
      expect(validatePhone('+57 31060644635')).toBe(false);
    });
    it('should be false if is trigger onChange with letters', () => {
      expect(validatePhone('+57 31060as')).toBe(false);
    });
    it('should be valid if is trigger onBlur with a correct format', () => {
      expect(validatePhone('+57 3106064463', true)).toBe(true);
    });
    it('should be false if is trigger onBlur with a invalid format', () => {
      expect(validatePhone('+57 31060644635', true)).toBe(false);
    });
    it('should be false if is trigger onBlur with letters', () => {
      expect(validatePhone('+57 310sasd', true)).toBe(false);
    });
  });
});
