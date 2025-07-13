const { validateBug } = require('../helpers/validation');

describe('validateBug', () => {
  it('should return error if title is missing', () => {
    const data = { title: '' };
    const result = validateBug(data);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('title');
  });

  it('should pass validation with valid title', () => {
    const data = { title: 'Fix login bug' };
    const result = validateBug(data);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});