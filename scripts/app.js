const form = document.getElementById("transaction-form");
const inputName = document.getElementById("transaction-name");
const inputAmount = document.getElementById("transaction-amount");
const listContainer = document.getElementById("transaction-list");
const balanceDisplay = document.getElementById("total-balance");

let transactions = JSON.parse(localStorage.getItem("transaction")) || [];

function addTransaction(event) {
  event.preventDefault(); // add 버튼을 눌렀을 때 새로고침 방지

  const name = inputName.value.trim();
  const amount = parseInt(inputAmount.value.trim());

  if (!name || isNaN(amount)) {
    alert("이름 혹은 수량을 잘못 입력했습니다.");
    return;
  }

  //   if (!name) {
  //     alert("비어있음");
  //     return; //!은 비어있음이다
  //   }

  //   if (isNaN(amount)) {
  //     alert("숫자 아님");
  //     return;
  //   }

  const transaction = {
    id: Date.now(),
    name,
    amount,
  };

  transactions.push(transaction);
  updateUI();
  form.reset();
}

function deleteTransaction(id) {
  transactions = transactions.filter((v) => v.id !== parseInt(id));
  updateUI();
}

function updateUI() {
  listContainer.innerHTML = "";
  let total = 0;

  transactions.forEach((v) => {
    const listItem = document.createElement("li");
    listItem.classList.add(v.amount > 0 ? "income" : "expense");
    listItem.innerHTML = `
        ${v.name}
        <span>${v.amount > 0 ? "+" : ""}${v.amount}원</span>
        <button class="delete-btn" data-id="${v.id}">X</button>
    `;
    listContainer.appendChild(listItem);

    total += v.amount;
  });
  balanceDisplay.textContent = `${total > 0 ? "+" : ""}${total}원`;

  document.querySelectorAll(".delete-btn").forEach((v) => {
    v.addEventListener("click", () => deleteTransaction(v.dataset.id));
  });

  localStorage.setItem("transaction", JSON.stringify(transactions));
}

form.addEventListener("submit", addTransaction);
updateUI();
