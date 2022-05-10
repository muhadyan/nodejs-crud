const queryBook = require("../repository/book");

function postExcel(res, workbook) {
  let resArr = [];
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
      let tempArr = []
      tempArr.push(no.v, book.v, author.v);
      resArr.push(tempArr)
    }
  }
  queryBook.queryPostExcel(res, resArr);
}

module.exports = postExcel;
