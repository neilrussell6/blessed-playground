const R = require('ramda')

// --------------------------------------
// product
// --------------------------------------

const product = (xs, ys, ...args) => {
  if (typeof ys === 'undefined') return xs
  const xys = [].concat(...xs.map(x => ys.map(y => [].concat(x, y))))
  return product(xys, ...args)
}

module.exports.product = product

// --------------------------------------
// buildTruthTable
// --------------------------------------

const buildTruthTable = (f, params = [0, 1]) => R.pipe(
  R.repeat(R.__, f.length > 1 ? f.length : 2),
  R.apply(product),
  R.map(x => [x, f(...x)]),
)(params)

module.exports.buildTruthTable = buildTruthTable

// --------------------------------------
// zipAll
// --------------------------------------

const zipAll = (list) => {
  var rv = [];
  var idx = list.length - 1;
  var len = list[0].length;
  while (list[idx]) {
    len = Math.min(len, list[idx].length);
    idx -= 1;
  }

  idx = 0;
  var j = 0;
  while (idx < len) {
    rv[idx] = [];
    j = 0;
    while (j < list.length) {
      rv[idx].push(list[j][idx]);
      j += 1;
    }
    idx += 1;
  }
  return rv;
}

module.exports.zipAll = zipAll
