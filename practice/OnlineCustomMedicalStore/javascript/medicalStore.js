"use strict";
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 2000;
let OrderIdAutoIncrement = 3000;
let CurrentUser;
let NewEmailStatus = false;
let NewUserPasswordStatus = false;
let NewUserConfirmPasswordStatus = false;
let NewUserPhoneNumberStatus = false;
let isEmailExist = false;
let NewNameStatus = false;
//user class
class User {
    constructor(paramName, paramEmail, paramPassword, paramUserPhoneNumber, paramBalance) {
        UserIdAutoIncrement++;
        this.UserId = "UID" + UserIdAutoIncrement.toString();
        this.UserName = paramName;
        this.Email = paramEmail;
        this.Password = paramPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.Balance = paramBalance;
    }
}
//med
class MedicineInfo {
    constructor(paramMedicineName, paramMedicineCount, paramMedicinePrice, MedicineExpiryDate) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MID" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = MedicineExpiryDate;
    }
}
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Ordered"] = "Ordered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
class Order {
    constructor(paramMedicineId, paramUserId, paramMedicineName, paramMedicineCount, paramTotalPrice, paramOrderStatus, paramOrderDate) {
        OrderIdAutoIncrement++;
        this.OrderId = "OID" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.OrderStatus = paramOrderStatus;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.TotalPrice = paramTotalPrice;
        this.OrderDate = paramOrderDate;
    }
}
let UserArrayList = new Array();
UserArrayList.push(new User("Naren", "naren@gmail.com", "Password@123", "9876453210", 100));
UserArrayList.push(new User("Ravi", "ravi@gmail.com", "Password@123", "9123456780", 0));
let MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2025, 4, 7)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date("2025-04-07")));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date("2024-05-03")));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date("2025-04-07")));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date("2025-04-07")));
let OrderList = new Array();
function newUserPage() {
    hideAllHome();
    let newUserPage = document.getElementById('newUserPage');
    let existingUserPage = document.getElementById('existingUserPage');
    let homePage = document.getElementById('homePage');
    let existingEmail = document.getElementById('existingEmail');
    let existingPassword = document.getElementById('existingPassword');
    let existingEmailMessage = document.getElementById('existingEmailMessage');
    let existingPasswordMessage = document.getElementById('existingPasswordMessage');
    existingEmail.value = "";
    existingPassword.value = "";
    existingEmailMessage.innerHTML = "";
    existingPasswordMessage.innerHTML = "";
    homePage.style.display = "block";
    newUserPage.style.display = "block";
    existingUserPage.style.display = "none";
}
function signUp() {
    if (NewEmailStatus == true &&
        isEmailExist == false &&
        NewUserPasswordStatus == true &&
        NewUserConfirmPasswordStatus == true &&
        NewUserPhoneNumberStatus == true &&
        NewNameStatus == true) {
        let newName = document.getElementById('newName');
        let newEmail = document.getElementById('newEmail');
        let newUserPassword = document.getElementById('newUserPassword');
        let newUserConfirmPassword = document.getElementById('newUserConfirmPassword');
        let newUserPhoneNumber = document.getElementById('newUserPhoneNumber');
        UserArrayList.push(new User(newName.value, newEmail.value.toLowerCase(), newUserPassword.value, newUserPhoneNumber.value, 0));
        newName.value = "";
        newEmail.value = "";
        newUserPassword.value = "";
        newUserConfirmPassword.value = "";
        newUserPhoneNumber.value = "";
        alert('User added successfully');
        displayHomePage();
    }
    else {
        alert("Please fill out all the details in the form.");
    }
}
function emailExist(paramEmail) {
    isEmailExist = false;
    for (let i = 0; i < UserArrayList.length; i++) {
        if (paramEmail.toLowerCase() == UserArrayList[i].Email.toLowerCase()) {
            isEmailExist = true;
            break;
        }
    }
    return isEmailExist;
}
function checkEmail(paramNewEmail) {
    let newEmail = document.getElementById(paramNewEmail).value;
    let newEmailMessage = document.getElementById(paramNewEmail + "Message");
    let newEmailRegex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,10})?$/;
    isEmailExist = emailExist(newEmail);
    if (newEmailRegex.test(newEmail) && isEmailExist) {
        NewEmailStatus = true;
        newEmailMessage.style.visibility = "hidden";
    }
    else if (newEmailRegex.test(newEmail) && !isEmailExist) {
        NewEmailStatus = false;
        newEmailMessage.innerHTML = "Email doesn't exist. Please register";
        newEmailMessage.style.visibility = "visible";
        newEmailMessage.style.color = "red";
        newEmailMessage.style.marginLeft = "0.6rem";
    }
    else {
        NewEmailStatus = false;
        newEmailMessage.innerHTML = "Please enter valid mail id";
        newEmailMessage.style.visibility = "visible";
        newEmailMessage.style.color = "red";
        newEmailMessage.style.marginLeft = "0.6rem";
    }
}
function checkNewEmail(paramNewEmail) {
    let newEmail = document.getElementById(paramNewEmail).value;
    let newEmailMessage = document.getElementById(paramNewEmail + "Message");
    let newEmailRegex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,10})?$/;
    isEmailExist = emailExist(newEmail);
    if (newEmailRegex.test(newEmail) && !isEmailExist) {
        NewEmailStatus = true;
        newEmailMessage.style.visibility = "hidden";
    }
    else if (isEmailExist) {
        NewEmailStatus = false;
        newEmailMessage.innerHTML = "Email already exists";
        newEmailMessage.style.visibility = "visible";
        newEmailMessage.style.color = "red";
        newEmailMessage.style.marginLeft = "0.6rem";
    }
    else {
        NewEmailStatus = false;
        newEmailMessage.innerHTML = "Please enter valid mail id";
        newEmailMessage.style.visibility = "visible";
        newEmailMessage.style.color = "red";
        newEmailMessage.style.marginLeft = "0.6rem";
    }
}
function checkNewName(paramNewName) {
    let newName = document.getElementById(paramNewName).value;
    let newNameMessage = document.getElementById(paramNewName + "Message");
    let newNameRegex = /^([a-zA-Z@]+)$/;
    if (newNameRegex.test(newName)) {
        NewNameStatus = true;
        newNameMessage.style.visibility = "hidden";
    }
    else {
        NewNameStatus = false;
        newNameMessage.innerHTML = "Please enter valid Name";
        newNameMessage.style.visibility = "visible";
        newNameMessage.style.color = "red";
        newNameMessage.style.marginLeft = "0.6rem";
    }
}
function checkNewUserPassword(paramNewUserPassword) {
    let newUserPassword = document.getElementById(paramNewUserPassword).value;
    let newUserPasswordMessage = document.getElementById(paramNewUserPassword + "Message");
    let newUserPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (newUserPasswordRegex.test(newUserPassword)) {
        NewUserPasswordStatus = true;
        newUserPasswordMessage.style.visibility = "hidden";
    }
    else {
        NewUserPasswordStatus = false;
        newUserPasswordMessage.innerHTML = "Please enter valid password";
        newUserPasswordMessage.style.visibility = "visible";
        newUserPasswordMessage.style.color = "red";
        newUserPasswordMessage.style.marginLeft = "0.6rem";
    }
}
function checkNewUserConfirmPassword(paramNewUserConfirmPassword, paramNewUserPassword) {
    let newUserConfirmPassword = document.getElementById(paramNewUserConfirmPassword).value;
    let newUserConfirmPasswordMessage = document.getElementById(paramNewUserConfirmPassword + "Message");
    let newUserPassword = document.getElementById(paramNewUserPassword).value;
    if (newUserConfirmPassword == newUserPassword) {
        NewUserConfirmPasswordStatus = true;
        newUserConfirmPasswordMessage.style.visibility = "hidden";
    }
    else {
        NewUserConfirmPasswordStatus = false;
        newUserConfirmPasswordMessage.innerHTML = "Password and confirm password mismatch";
        newUserConfirmPasswordMessage.style.visibility = "visible";
        newUserConfirmPasswordMessage.style.color = "red";
        newUserConfirmPasswordMessage.style.marginLeft = "0.6rem";
    }
}
function checkNewUserPhoneNumber(paramNewUserPhoneNumber) {
    let newUserPhoneNumber = document.getElementById(paramNewUserPhoneNumber).value;
    let newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message");
    let newUserPhoneNumberRegex = /^[7-9]{1}[0-9]{9}$/;
    if (newUserPhoneNumberRegex.test(newUserPhoneNumber)) {
        NewUserPhoneNumberStatus = true;
        newUserPhoneNumberMessage.style.visibility = "hidden";
    }
    else {
        NewUserPhoneNumberStatus = false;
        newUserPhoneNumberMessage.innerHTML = "Please enter valid phone number";
        newUserPhoneNumberMessage.style.visibility = "visible";
        newUserPhoneNumberMessage.style.color = "red";
        newUserPhoneNumberMessage.style.marginLeft = "0.6rem";
    }
}
function existingUserPage() {
    let newUserPage = document.getElementById('newUserPage');
    let existingUserPage = document.getElementById('existingUserPage');
    let newName = document.getElementById('newNameMessage');
    let newEmail = document.getElementById('newEmailMessage');
    let newUserPassword = document.getElementById('newUserPasswordMessage');
    let newUserConfirmPassword = document.getElementById('newUserConfirmPasswordMessage');
    let newUserPhoneNumber = document.getElementById('newUserPhoneNumberMessage');
    let SignUpForm = document.getElementById('SignUpForm');
    SignUpForm.reset();
    newName.innerHTML = "";
    newEmail.innerHTML = "";
    newUserPassword.innerHTML = "";
    newUserConfirmPassword.innerHTML = "";
    newUserPhoneNumber.innerHTML = "";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "block";
}
function signIn() {
    let email = document.getElementById('existingEmail');
    checkEmail('existingEmail');
    let userPassword = document.getElementById("existingPassword");
    let existingUserId = false;
    if (isEmailExist) {
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].Password == userPassword.value && UserArrayList[i].Email.toLowerCase() == email.value.toLowerCase()) {
                CurrentUser = UserArrayList[i];
                email.value = "";
                userPassword.value = "";
                existingUserId = true;
                medicinePage();
                return;
            }
        }
        if (!existingUserId) {
            alert('Email ID not registered');
        }
    }
    else {
        alert("Email ID is not in database. pleaase register ");
    }
}
function medicinePage() {
    hideAllHome();
    let medicinePage = document.getElementById('medicinePage');
    let menu = document.getElementById('menu');
    let greet = document.getElementById('greet');
    medicinePage.style.display = "block";
    menu.style.display = "block";
    greet.style.display = "block";
    greet.innerHTML = `<h3>Hello ${CurrentUser.UserName}</h3>`;
}
const form = document.getElementById("addMedicineForm");
const medicineName = document.getElementById('medicineName');
const medicineQuantity = document.getElementById('medicineQuantity');
const medicinePrice = document.getElementById('medicinePrice');
const medicineExpiryDate = document.getElementById('medicineExpiryDate');
const editMedicineName = document.getElementById('editMedicineName');
let editMedicineQuantity = document.getElementById('editMedicineQuantity');
const editMedicinePrice = document.getElementById('editMedicinePrice');
const editMedicineExpiryDate = document.getElementById('editMedicineExpiryDate');
form.addEventListener("submit", (event) => {
    event.preventDefault();
    MedicineList.push(new MedicineInfo(medicineName.value, parseInt(medicineQuantity.value), parseFloat(medicinePrice.value), new Date(medicineExpiryDate.value)));
    showMedicineDetails();
    form.reset();
    let medicineForm = document.getElementById('medicineForm');
    medicineForm.style.display = "none";
});
const editForm = document.getElementById("editMedicineForm");
editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    editMedicineQuantity = document.getElementById('editMedicineQuantity');
    const item = MedicineList.find((item) => item.MedicineId == editingId);
    if (item != null) {
        item.MedicineCount = parseInt(editMedicineQuantity.value);
    }
    showMedicineDetails();
    form.reset();
    let medicineFormEdit = document.getElementById('medicineFormEdit');
    medicineFormEdit.style.display = "none";
});
let editingId = "";
const edit = (id) => {
    editingId = id;
    showEditMedicineForm();
    const item = MedicineList.find((item) => item.MedicineId == id);
    if (item != null) {
        editMedicineName.value = item.MedicineName;
        editMedicineQuantity.value = String(item.MedicineCount);
        editMedicinePrice.value = String(item.MedicinePrice);
        editMedicineExpiryDate.valueAsDate = item.MedicineExpiryDate;
    }
};
const remove = (id) => {
    MedicineList = MedicineList.filter((item) => item.MedicineId != id);
    showMedicineDetails();
};
function showBalance() {
    hideAllHome();
    let showBalance = document.getElementById('showBalance');
    showBalance.style.display = "block";
    showBalance.innerHTML = ` <h2>Balance</h2><h3>Wallet Balance in Rs: ${CurrentUser.Balance}</h3>`;
}
function addMoney() {
    hideAllHome();
    let recharge = document.getElementById('recharge');
    recharge.style.display = "block";
    let money = document.getElementById('addMoney');
    if (parseInt(money.value) < 1) {
        alert('Enter valid amount to recharge');
    }
    else {
        CurrentUser.Balance += parseFloat(money.value);
        alert('Money added successfully');
        money.value = "";
    }
}
function topUp() {
    hideAllHome();
    let recharge = document.getElementById('recharge');
    recharge.style.display = "block";
}
function showOrderHistory() {
    hideAllHome();
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable');
    showOrderHistoryTable.style.display = "block";
    let tableHTML = "<h2>Orders</h2><table border='1'>";
    tableHTML += "<tr><td>Order ID</td><td>Medicine ID</td><td>Medicine Name</td><td>Count</td><td>Total Price</td><td>Ordered Date</td><td>Order Status</td></tr>";
    let orderCount = 0;
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUser.UserId) {
            tableHTML += `<tr><td>${OrderList[i].OrderId}</td><td>${OrderList[i].MedicineId}</td><td>${OrderList[i].MedicineName}</td><td>${OrderList[i].MedicineCount}</td><td>${OrderList[i].TotalPrice}</td><td>${OrderList[i].OrderDate.toLocaleDateString('en-GB')}</td><td>${OrderList[i].OrderStatus}</td></tr>`;
            orderCount++;
        }
    }
    tableHTML += "</table>";
    if (orderCount == 0) {
        showOrderHistoryTable.innerHTML = "<h2>Order History is empty.</h2>";
    }
    else {
        showOrderHistoryTable.innerHTML = tableHTML;
    }
}
function cancelOrder() {
    hideAllHome();
    let cancelOrderTable = document.getElementById('cancelOrderTable');
    cancelOrderTable.style.display = "block";
    let tableHTML = "<h2>Cancel Order</h2><table border='1'>";
    tableHTML += "<tr><td>Order ID</td><td>Medicine ID</td><td>Medicine Name</td><td>Count</td><td>Total Price</td><td>Order Date</td><td>Order Status</td><td>Action</td></tr>";
    let orderCount = 0;
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUser.UserId && OrderList[i].OrderStatus == OrderStatus.Ordered) {
            tableHTML += `<tr><td>${OrderList[i].OrderId}</td><td>${OrderList[i].MedicineId}</td><td>${OrderList[i].MedicineName}</td><td>${OrderList[i].MedicineCount}</td><td>${OrderList[i].TotalPrice}</td><td>${OrderList[i].OrderDate.toLocaleDateString('en-GB')}</td><td>${OrderList[i].OrderStatus}</td><td><button onclick="cancel('${OrderList[i].OrderId}')">Cancel</button></td></tr>`;
            orderCount++;
        }
    }
    tableHTML += "</table>";
    if (orderCount == 0) {
        cancelOrderTable.innerHTML = "<h2>There is no order to cancel.</h2>";
    }
    else {
        cancelOrderTable.innerHTML = tableHTML;
    }
}
//cancel order
const cancel = (id) => {
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].OrderId == id && CurrentUser.UserId == OrderList[i].UserId) {
            CurrentUser.Balance += OrderList[i].TotalPrice;
            let item = MedicineList.find((item) => item.MedicineId == OrderList[i].MedicineId);
            if (item != null) {
                item.MedicineCount += OrderList[i].MedicineCount;
            }
            OrderList[i].OrderStatus = OrderStatus.Cancelled;
            break;
        }
    }
    MedicineList = MedicineList.filter((item) => item.MedicineId != id);
    alert('Order cancelled successfully');
    cancelOrder();
};
function purchaseMedicine() {
    hideAllHome();
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable');
    purchaseMedicineTable.style.display = "block";
    let tableHTML = "<h3>PurchaseMedicine</h3>";
    tableHTML += "<table border='1'>";
    tableHTML += "<tr><th>Medicine Name</th><th>Count</th><th>Price</th><th>Action</th></tr>";
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineExpiryDate > new Date() && MedicineList[i].MedicineCount > 0) {
            tableHTML += `<tr><td>${MedicineList[i].MedicineName}</td><td>${MedicineList[i].MedicineCount}</td><td>${MedicineList[i].MedicinePrice}</td>
            <td><button onclick="showPurchase('${MedicineList[i].MedicineId}')">To Buy</button></td>
            <td id="${MedicineList[i].MedicineId}Purchase" style="display:none;border-style:none;">Enter quantity: <input type="number" value="0" style="width:5rem;  margin-right:1rem;" min="1" max="${MedicineList[i].MedicineCount}" id="${MedicineList[i].MedicineId}Quantity">
            <button onclick="purchase('${MedicineList[i].MedicineId}','${MedicineList[i].MedicineId}Quantity')">Purchase</button></td></tr>`;
        }
    }
    tableHTML += "</table>";
    purchaseMedicineTable.innerHTML = tableHTML;
}
function showPurchase(paramMedicineID) {
    let showMedicineInput = document.getElementById(paramMedicineID + "Purchase");
    showMedicineInput.style.display = "block";
}
function purchase(paramMedicineID, newQuantityElement) {
    let item = MedicineList.find((item) => item.MedicineId == paramMedicineID);
    let newQuantity = document.getElementById(newQuantityElement);
    let oldQuantity = 0;
    let amount = 0;
    if (item != null) {
        oldQuantity = item.MedicineCount;
        amount = parseInt(newQuantity.value) * item.MedicinePrice;
    }
    if (parseInt(newQuantity.value) > oldQuantity) {
        alert('Quantity is not available (Out Of Stock)');
    }
    else if (parseInt(newQuantity.value) < 1) {
        alert('Enter valid quantity to purchase');
    }
    else if (amount > CurrentUser.Balance) {
        alert("Invalid balance in wallet");
    }
    else {
        CurrentUser.Balance -= amount;
        if (item != null) {
            item.MedicineCount -= parseInt(newQuantity.value);
            OrderList.push(new Order(item.MedicineId, CurrentUser.UserId, item.MedicineName, parseInt(newQuantity.value), amount, OrderStatus.Ordered, new Date()));
            alert(`${item.MedicineName} Medicine purchased successfully and debited amount ${amount} from your wallet`);
            newQuantity.innerHTML = "0";
            let showMedicineInput = document.getElementById(paramMedicineID + "Purchase");
            showMedicineInput.style.display = "none";
        }
    }
    purchaseMedicine();
}
function showMedicineDetails() {
    hideAllHome();
    let medicineDetailsTable = document.getElementById('medicineDetailsTable');
    let medicineDetailsPage = document.getElementById('medicineDetailsPage');
    medicineDetailsTable.style.display = "block";
    medicineDetailsPage.style.display = "block";
    let tableHTML = "<h3>Medicine</h3>";
    tableHTML += "<table border='1'>";
    tableHTML += "<tr><th>Medicine Name</th><th>Count</th><th>Price</th><th>Expiry date</th><th>Action</th></tr>";
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineExpiryDate > new Date()) {
            tableHTML += `<tr><td>${MedicineList[i].MedicineName}</td><td>${MedicineList[i].MedicineCount}</td><td>${MedicineList[i].MedicinePrice}</td><td>${MedicineList[i].MedicineExpiryDate.toLocaleDateString('en-GB')}</td>
            <td><button onclick="edit('${MedicineList[i].MedicineId}')">Edit</button><button onclick="remove('${MedicineList[i].MedicineId}')">Delete</button></td></tr>`;
        }
    }
    tableHTML += "</table>";
    medicineDetailsTable.innerHTML = tableHTML;
}
function showMedicineForm() {
    let medicineForm = document.getElementById("medicineForm");
    medicineForm.style.display = "block";
}
function showEditMedicineForm() {
    let editMedicineForm = document.getElementById("editMedicineForm");
    editMedicineForm.style.display = "block";
    let medicineFormEdit = document.getElementById("medicineFormEdit");
    medicineFormEdit.style.display = "block";
}
function displayHomePage() {
    hideAllHome();
    CurrentUser = new User("", "", "", "", 0);
    let menu = document.getElementById('menu');
    menu.style.display = "none";
    let medicinePage = document.getElementById('medicinePage');
    medicinePage.style.display = "none";
    let homePage = document.getElementById('homePage');
    homePage.style.display = "block";
}
function hideAllHome() {
    let medicineDetailsTable = document.getElementById('medicineDetailsTable');
    let medicineDetailsPage = document.getElementById('medicineDetailsPage');
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable');
    let cancelOrderTable = document.getElementById('cancelOrderTable');
    let newUserPage = document.getElementById('newUserPage');
    let existingUserPage = document.getElementById('existingUserPage');
    let homePage = document.getElementById('homePage');
    let recharge = document.getElementById('recharge');
    let showBalance = document.getElementById('showBalance');
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable');
    let greet = document.getElementById('greet');
    medicineDetailsTable.style.display = "none";
    medicineDetailsPage.style.display = "none";
    purchaseMedicineTable.style.display = "none";
    cancelOrderTable.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    homePage.style.display = "none";
    recharge.style.display = "none";
    showBalance.style.display = "none";
    showOrderHistoryTable.style.display = "none";
    greet.style.display = "none";
}
