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
class User {
    constructor(paramEmail, paramPassword, paramUserPhoneNumber, paramBalance) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.Email = paramEmail;
        this.Password = paramPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.Balance = paramBalance;
    }
}
class MedicineInfo {
    constructor(paramMedicineName, paramMedicineCount, paramMedicinePrice, MedicineExpiryDate) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = MedicineExpiryDate;
    }
}
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Initiated"] = 0] = "Initiated";
    OrderStatus[OrderStatus["Ordered"] = 1] = "Ordered";
    OrderStatus[OrderStatus["Cancelled"] = 2] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
class Order {
    constructor(paramMedicineId, paramUserId, paramMedicineName, paramMedicineCount, paramTotalPrice, paramOrderStatus) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.OrderStatus = paramOrderStatus;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.TotalPrice = paramTotalPrice;
    }
}
let UserArrayList = new Array();
UserArrayList.push(new User("naren@gmail.com", "Password@123", "9876453210", 0));
UserArrayList.push(new User("ravi@gmail.com", "Password@123", "9123456780", 0));
let MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2025, 4, 7)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2023, 4, 7)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 5, 3)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2025, 4, 7)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2025, 4, 7)));
let OrderList = new Array();
function newUserPage() {
    let homePage = document.getElementById('homePage');
    let newUserPage = document.getElementById('newUserPage');
    homePage.style.display = "none";
    newUserPage.style.display = "block";
}
function signUp() {
    if (NewEmailStatus == true &&
        isEmailExist == false &&
        NewUserPasswordStatus == true &&
        NewUserConfirmPasswordStatus == true &&
        NewUserPhoneNumberStatus == true) {
        let newEmail = document.getElementById('newEmail').value;
        let newUserPassword = document.getElementById('newUserPassword').value;
        let newUserPhoneNumber = document.getElementById('newUserPhoneNumber').value;
        UserArrayList.push(new User(newEmail.toLowerCase(), newUserPassword, newUserPhoneNumber, 0));
        displayHomePage();
    }
    else {
        alert("Please fill out all the details in the form.");
    }
}
function emailExist(paramEmail) {
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
    let isEmailExist = emailExist(newEmail);
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
    let isEmailExist = emailExist(newEmail);
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
    let newUserPhoneNumberRegex = /^[7-9][0-9]{9}$/;
    if (newUserPhoneNumberRegex.test(newUserPhoneNumber)) {
        NewUserPhoneNumberStatus = true;
        newUserPhoneNumberMessage.style.visibility = "hidden";
    }
    else {
        NewUserPhoneNumberStatus = false;
        newUserPhoneNumberMessage.innerHTML = "Please enter valid phone number";
        newUserPhoneNumberMessage.style.visibility = "visible";
        newUserPhoneNumberMessage.style.color = "tomato";
        newUserPhoneNumberMessage.style.marginLeft = "10px";
    }
}
function existingUserPage() {
    let homePage = document.getElementById('homePage');
    let existingUserPage = document.getElementById('existingUserPage');
    let availableUser = document.getElementById('availableUser');
    homePage.style.display = "none";
    existingUserPage.style.display = "block";
    // availableUser.innerHTML = "<h2>Available User</h2>";
    // for (let i = 0; i < UserArrayList.length; i++) {
    //     availableUser.innerHTML += `User Email : ${UserArrayList[i].Email} | User Id : ${UserArrayList[i].UserId}<br>`;
    // }
}
function signIn() {
    let noExistingUserIdChecker = true;
    let email = document.getElementById('existingEmail').value;
    let userPassword = document.getElementById("existingPassword").value;
    if (isEmailExist) {
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].Password == userPassword && UserArrayList[i].Email.toLowerCase() == email.toLowerCase()) {
                noExistingUserIdChecker = false;
                CurrentUser = UserArrayList[i];
                medicinePage();
                return;
            }
            else {
                noExistingUserIdChecker = true;
            }
        }
        if (noExistingUserIdChecker) {
            alert("Email ID or password mismatch");
        }
    }
    else {
        alert("Email doesn't registered ");
    }
}
function medicinePage() {
    let existingUserPage = document.getElementById('existingUserPage');
    let medicinePage = document.getElementById('medicinePage');
    let medicineDetailsTable = document.getElementById('medicineDetailsTable');
    let menu = document.getElementById('menu');
    let greet = document.getElementById('greet');
    medicineDetailsTable.style.display = "none";
    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";
    menu.style.display = "block";
    greet.innerHTML = `<h3>Hello ${CurrentUser.Email}</h3>`;
}
function medicineListCheck() {
    let medicineInfo = document.getElementById('medicineInfo');
    let medicineList = document.getElementById('medicineList');
    let medicineName = medicineList[medicineList.selectedIndex].innerHTML;
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineName == medicineName) {
            medicineInfo.innerHTML = `Medicine Id : ${MedicineList[i].MedicineId} --- Medicine Name : ${MedicineList[i].MedicineName} --- Medicine Count : ${MedicineList[i].MedicineCount} --- Medicine Price : ${MedicineList[i].MedicinePrice} `;
            displayRequiredCount();
        }
    }
}
function displayRequiredCount() {
    let medicineInfo = document.getElementById('medicineInfo');
    let requiredCount = document.getElementById('requiredCount');
    medicineInfo.style.display = "block";
    requiredCount.style.display = "block";
}
function buyMedicine() {
    let proceed = true;
    let finalMedicineRequiredCount = 0;
    let medicineList = document.getElementById('medicineList');
    let medicineRequiredCount = document.getElementById('medicineRequiredCount').value;
    let medicineName = medicineList[medicineList.selectedIndex].innerHTML;
    let medicineRequiredCountRegex = /^\d{1,3}$/;
    if (medicineRequiredCountRegex.test(medicineRequiredCount) && +medicineRequiredCount > 0) {
        for (let i = 0; i < MedicineList.length; i++) {
            if (MedicineList[i].MedicineName == medicineName) {
                if (MedicineList[i].MedicineCount > 0) {
                    if ((MedicineList[i].MedicineCount - +medicineRequiredCount) < 0) {
                        proceed = confirm(`We only have ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}. Do you want to buy ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}?`);
                        if (proceed) {
                            finalMedicineRequiredCount = MedicineList[i].MedicineCount;
                        }
                    }
                    else {
                        finalMedicineRequiredCount = +medicineRequiredCount;
                    }
                    if (proceed) {
                        MedicineList[i].MedicineCount = MedicineList[i].MedicineCount - finalMedicineRequiredCount;
                        OrderList.push(new Order(MedicineList[i].MedicineId, CurrentUser.UserId, MedicineList[i].MedicineName, finalMedicineRequiredCount, MedicineList[i].MedicinePrice * MedicineList[i].MedicineCount, OrderStatus.Ordered));
                        alert("Purchase Success.");
                        displayHomePage();
                    }
                }
                else if (MedicineList[i].MedicineCount <= 0) {
                    alert("Out of Stock, you can buy alternative medicine.");
                }
            }
        }
    }
    else {
        alert("Please enter valid Required Count");
    }
}
function showBalance() {
    let medicineDetailsTable = document.getElementById('medicineDetailsTable');
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable');
    let cancelOrderTable = document.getElementById('cancelOrderTable');
    let recharge = document.getElementById('recharge');
    let showBalance = document.getElementById('showBalance');
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable');
    purchaseMedicineTable.style.display = "none";
    cancelOrderTable.style.display = "none";
    recharge.style.display = "none";
    showBalance.style.display = "block";
    showOrderHistoryTable.style.display = "none";
    medicineDetailsTable.style.display = "none";
    showBalance.innerHTML = `Wallet Balance in Rs: ${CurrentUser.Balance}`;
}
function recharge() {
    let medicineDetailsTable = document.getElementById('medicineDetailsTable');
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable');
    let cancelOrderTable = document.getElementById('cancelOrderTable');
    let recharge = document.getElementById('recharge');
    let showBalance = document.getElementById('showBalance');
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable');
    purchaseMedicineTable.style.display = "none";
    cancelOrderTable.style.display = "none";
    recharge.style.display = "block";
    showBalance.style.display = "none";
    showOrderHistoryTable.style.display = "none";
    medicineDetailsTable.style.display = "none";
    showBalance.innerHTML = `Wallet Balance in Rs: ${CurrentUser.Balance}`;
}
function showOrderHistory() {
    let medicineDetailsTable = document.getElementById('medicineDetailsTable');
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable');
    let cancelOrderTable = document.getElementById('cancelOrderTable');
    let recharge = document.getElementById('recharge');
    let showBalance = document.getElementById('showBalance');
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable');
    purchaseMedicineTable.style.display = "none";
    cancelOrderTable.style.display = "none";
    recharge.style.display = "none";
    showBalance.style.display = "none";
    showOrderHistoryTable.style.display = "block";
    medicineDetailsTable.style.display = "none";
    let tableHTML = "<table border='1'>";
    tableHTML += "<tr><td>Order ID</td><td>Medicine ID</td><td>Medicine Name</td><td>Count</td><td>Total Price</td></tr>";
    let orderCount = 0;
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUser.UserId) {
            tableHTML += `<tr><td>${OrderList[i].OrderId}</td><td>${OrderList[i].MedicineId}</td><td>${OrderList[i].MedicineName}</td><td>${OrderList[i].MedicineCount}</td><td>${OrderList[i].TotalPrice}</td></tr>`;
            orderCount++;
        }
    }
    tableHTML += "</table>";
    if (orderCount == 0) {
        showOrderHistoryTable.innerHTML = "Order History is empty.<br>";
    }
    else {
        showOrderHistoryTable.innerHTML = tableHTML;
    }
}
function showMedicineDetails() {
    let medicineDetailsTable = document.getElementById('medicineDetailsTable');
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable');
    let cancelOrderTable = document.getElementById('cancelOrderTable');
    let recharge = document.getElementById('recharge');
    let showBalance = document.getElementById('showBalance');
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable');
    purchaseMedicineTable.style.display = "none";
    cancelOrderTable.style.display = "none";
    recharge.style.display = "none";
    showBalance.style.display = "none";
    showOrderHistoryTable.style.display = "none";
    medicineDetailsTable.style.display = "block";
    let tableHTML = "<h3>Medicine</h3>";
    tableHTML += "<table border='1'>";
    tableHTML += "<tr><td>Medicine Name</td><td>Count</td><td>Price</td><td>Expiry date</td></tr>";
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineExpiryDate > new Date()) {
            tableHTML += `<tr><td>${MedicineList[i].MedicineName}</td><td>${MedicineList[i].MedicineCount}</td><td>${MedicineList[i].MedicinePrice}</td><td>${MedicineList[i].MedicineExpiryDate.toLocaleDateString('en-GB')}</td></tr>`;
        }
    }
    tableHTML += "</table>";
    medicineDetailsTable.innerHTML = tableHTML;
}
function displayHomePage() {
    CurrentUser = new User("", "", "", 0);
    let medicineList = document.getElementById('medicineList');
    medicineList.selectedIndex = 0;
    let requiredCount = document.getElementById('requiredCount');
    let medicineDetailsTable = document.getElementById('medicineDetailsTable');
    let historyDisplay = document.getElementById('historyDisplay');
    let medicinePage = document.getElementById('medicinePage');
    let newUserPage = document.getElementById('newUserPage');
    let existingUserPage = document.getElementById('existingUserPage');
    let homePage = document.getElementById('homePage');
    let menu = document.getElementById('menu');
    // (document.getElementById('medicineRequiredCount') as HTMLInputElement).value = null;
    // (document.getElementById('existingUserId') as HTMLInputElement).value = null;
    // requiredCount.style.display = "none";
    // historyDisplay.style.display = "none";
    menu.style.display = "none";
    medicinePage.style.display = "none";
    // medicineInfo.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    medicineDetailsTable.style.display = "none";
    homePage.style.display = "block";
}
