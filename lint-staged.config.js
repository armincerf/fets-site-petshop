module.exports = {
  '*.{ts,tsx,css}': ['prettier . --write'],
  '*.{ts,tsx}': [() => 'yarn tsc --skipLibCheck']
}
