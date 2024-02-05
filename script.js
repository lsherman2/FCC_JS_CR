let price = 19.5;
let cid = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
const cash = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const moneyArr = [100, 20, 10, 5, 1, .25, .10, .05, .01];

const grabCash = () => Number(cash.value);

const checkCash = (num) => {
  const till = countTill(cid);
  const due = num - price;
  if (num < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (num === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  } else {
    switch (tillStatus(till, due, num)) {
      case "INSUFFICIENT_FUNDS":
        changeDue.textContent = `Status: ${tillStatus(till, due, num)}`;
        break;
      case "CLOSED":
      case "OPEN":
        changeDue.textContent = `Status: ${tillStatus(till, due, num)} ${printChange(changeBack(due))}`;
        break;
    }
  }

};

const register = () => {
  checkCash(grabCash());
};

const tillStatus = (till, num, money) => {
  const denom = changeBack(num)
  if (denom.length === 1) {
    return "INSUFFICIENT_FUNDS"
  }

  if (till < num) {
    return "INSUFFICIENT_FUNDS";
  } else if (till === num) {
    return "CLOSED";
  } else if (till > num) {
    return "OPEN";
  }
};

const countTill = (arr) => {
  let sum = 0;
  for (const change of arr) {
    sum = sum + change[1];
    sum = Math.ceil(sum * 100) / 100
  }
  return sum;
};

const changeBack = (due) => {
  const moneyBack = [];
  const reverseCid = [...cid].reverse();
  let count = 0;
  for (let i = 0; i < 9; i++) {
    let amount = reverseCid[i][1];
    while (due - moneyArr[i] >= 0 && amount - moneyArr[i] >= 0) {
      count++;
      due -= moneyArr[i];
      due = Math.round(due * 100) / 100;
      amount -= moneyArr[i];
      amount = Math.round(amount * 100) / 100;
      console.log(due);
    }
    moneyBack.push(count);
    count = 0;
  }
  if (due > 0) {
    return [0];
  }
  return moneyBack;
};

const printChange = arr => {
  let str = '';
  const reverseCid = [...cid].reverse();
  arr.forEach((num, i) => {
    if (num !== 0) {
      str += `${reverseCid[i][0]}: $${moneyArr[i] * num}`
    }
    if (i < 8) {
      str += ' '
    }
  })
  return str
}

purchaseBtn.addEventListener("click", register);