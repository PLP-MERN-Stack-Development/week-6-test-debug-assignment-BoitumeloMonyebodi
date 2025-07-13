function validateBug(data) {
  const errors = {};
  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title is required';
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = { validateBug };