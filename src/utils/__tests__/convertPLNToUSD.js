import { convertPLNToUSD } from './../convertPLNtoUSD'; // zaimportowanie funkcji do sprawdzenia (testowania)

describe('ConvertPLNtoUSD', () => { // opisanie, czego będą tyczyć się testy - funkcji ConvertPLNtoUSD
  it('should return proper value when good input', () => { // opisanie tego, co jest konkretnie sprawdzane (tzw. scenariusze testowe);
    expect(convertPLNToUSD(1)).toBe('$0.29');              // w tym bloku znajdują się testy, które sprawdzą, czy funkcja
    expect(convertPLNToUSD(2)).toBe('$0.57');              // zwróci dobrą wartość, jeśli będą podane dobre inputy;
    expect(convertPLNToUSD(20)).toBe('$5.71');             // sprawdzanych jest kilka scenariuszy (dobra praktyka);
    expect(convertPLNToUSD(12)).toBe('$3.43');             // jeśli któryś ze scenariuszy nie spełnia założenia, to framework Jest o tym poinformuje
  });

  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('-543')).toBeNaN();
  });

  it('should return NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return "Error" when input is different than number and string', () => {
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
  });

  it('should return zero when input is lower than zero', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-2)).toBe('$0.00');
    expect(convertPLNToUSD(-56)).toBe('$0.00');
  });
});