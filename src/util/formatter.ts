var intlNumberFormatValues = ['de-DE', 'currency', 'EUR'];

export var formatter = new Intl.NumberFormat(intlNumberFormatValues[0], {
  style: intlNumberFormatValues[1],
  currency: intlNumberFormatValues[2],
});