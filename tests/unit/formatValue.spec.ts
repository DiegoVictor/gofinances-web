import formatValue from '../../src/utils/formatValue';

describe('formatValue', () => {
  it('should be able to format a value', async () => {
    expect(formatValue(100)).toStrictEqual(
      expect.stringMatching(/^R\$\xA0?100,00/),
    );
  });
});
