export function formatPrice(value, locale = 'pt-BR', currencyType = 'BRL'){
  const numeric = value.toString().replace(/[^\d]/g, '');
  const formated = numeric.replace(/[^\d]/g, '');

  const currency = { style: 'currency', currency: currencyType };

  let result =  (formated / 100).toLocaleString( locale, currency);
    
  return result;
};

export function defaultPriceFormat(Value){
  if(!Value) return 0;
  
  const clean = Value.replace(/[^\d]/g, '');

  const result = Number(clean) /100;

  return result;
};

export function formatForParcentage(Value){
  const num = parseFloat(Value);
  
  if(isNaN(num) || num < 0) return "0%";

  if(num > 100) return "100%";

  let result = `${num}%`;

  return result;
};

export function applyPercentagesIncreases( value, percent){
  if (!percent || isNaN(percent)) return value;

  let nVal = Number(value);
  let npec = Number(percent);

  if(npec > 100){
    npec = 100
  }
  if(npec < 0 ){
    npec = 0;
  }
  
  let result = nVal + (nVal * npec) / 100;

  return result
};

export function applyPercentagesDecreases(value, percent) {
  if (value == null || percent == null) return 0;

  let nVal = parseFloat(value);
  let nPerc = parseFloat(percent);

  if (isNaN(nVal) || isNaN(nPerc)) return 0;

  nPerc = Math.max(0, Math.min(100, nPerc));

  const result = nVal - (nVal * nPerc) / 100;

  return parseFloat(result.toFixed(2));
}
