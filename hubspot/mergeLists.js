//Input: list A, list B, limit
//Goal: Merge list A and list B till the size of limit
//Output: Merged list A and B of length->limit.

const main = () => {
  let listA = [1, 3, 5];
  let listB = [4, 5, 6];
  let outputList = mergeList(listA, listB, 3);
  console.log(outputList);
};
const mergeList = (listA, listB, limit) => {
  if (limit > listA.length + listB.length) {
    return "";
  }
  let aListPointer = 0;
  let bListPointer = 0;
  let outputList = [];
  let outputListPointer = 0;
  while (
    aListPointer < listA.length &&
    bListPointer < listB.length &&
    outputListPointer < limit
  ) {
    if (listA[aListPointer] < listB[bListPointer]) {
      outputList[outputListPointer] = listA[aListPointer];
      outputListPointer++;
      aListPointer++;
    } else {
      outputList[outputListPointer] = listB[bListPointer];
      outputListPointer++;
      bListPointer++;
    }
  }
  //Finally merge leftover elements in either of this list
  while (aListPointer < listA.length && outputListPointer < limit) {
    outputList[outputListPointer] = listA[aListPointer];
    outputListPointer++;
    aListPointer++;
  }
  while (bListPointer < listB.length && outputListPointer < limit) {
    outputList[outputListPointer] = listB[bListPointer];
    outputListPointer++;
    bListPointer++;
  }
  return outputList;
};
main();
