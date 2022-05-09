const queryBook = require('../repository/book')

function postExcel(res, workbook) {
  for (let i = 2; i > 0; i++) {
    A = `A${i}`;
    B = `B${i}`;
    C = `C${i}`;
    const no = workbook[A];
    const book = workbook[B];
    const author = workbook[C];
    if (no === undefined) {
      break;
    } else {
      queryBook.queryPostExcel(res, no.v, book.v, author.v);
    }
  }
}

module.exports = postExcel