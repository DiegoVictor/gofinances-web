import formatValue from '../../src/utils/formatValue';

describe('formatValue', () => {
  it('should be able to format a value', async () => {
    expect(formatValue(100)).toBe('R$\xA0100,00');
  });
});
