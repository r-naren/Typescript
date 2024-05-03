var UserIdAutoIncrement = 1000;
var MedicineIdAutoIncrement = 2000;
var OrderIdAutoIncrement = 3000;
var CurrentUser;
var NewEmailStatus = false;
var NewUserPasswordStatus = false;
var NewUserConfirmPasswordStatus = false;
var NewUserPhoneNumberStatus = false;
var isEmailExist = false;
var NewNameStatus = false;
var User = /** @class */ (function () {
    function User(paramName, paramEmail, paramPassword, paramUserPhoneNumber, paramBalance) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserName = paramName;
        this.Email = paramEmail;
        this.Password = paramPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.Balance = paramBalance;
    }
    return User;
}());
var MedicineInfo = /** @class */ (function () {
    function MedicineInfo(paramMedicineName, paramMedicineCount, paramMedicinePrice, MedicineExpiryDate) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = MedicineExpiryDate;
    }
    return MedicineInfo;
}());
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Ordered"] = "Ordered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
var Order = /** @class */ (function () {
    function Order(paramMedicineId, paramUserId, paramMedicineName, paramMedicineCount, paramTotalPrice, paramOrderStatus) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.OrderStatus = paramOrderStatus;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.TotalPrice = paramTotalPrice;
    }
    return Order;
}());
var UserArrayList = new Array();
UserArrayList.push(new User("Naren", "naren@gmail.com", "Password@123", "9876453210", 100));
UserArrayList.push(new User("Ravi", "ravi@gmail.com", "Password@123", "9123456780", 0));
var MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2025, 4, 7)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2023, 4, 7)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 5, 3)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2025, 4, 7)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2025, 4, 7)));
var OrderList = new Array();
function newUserPage() {
    hideAllHome();
    var newUserPage = document.getElementById('newUserPage');
    var existingUserPage = document.getElementById('existingUserPage');
    var homePage = document.getElementById('homePage');
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
        var newName = document.getElementById('newName');
        var newEmail = document.getElementById('newEmail');
        var newUserPassword = document.getElementById('newUserPassword');
        var newUserConfirmPassword = document.getElementById('newUserConfirmPassword');
        var newUserPhoneNumber = document.getElementById('newUserPhoneNumber');
        UserArrayList.push(new User(newName.value, newEmail.value.toLowerCase(), newUserPassword.value, newUserPhoneNumber.value, 0));
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
    for (var i = 0; i < UserArrayList.length; i++) {
        if (paramEmail.toLowerCase() == UserArrayList[i].Email.toLowerCase()) {
            isEmailExist = true;
            break;
        }
    }
    return isEmailExist;
}
function checkEmail(paramNewEmail) {
    var newEmail = document.getElementById(paramNewEmail).value;
    var newEmailMessage = document.getElementById(paramNewEmail + "Message");
    var newEmailRegex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,10})?$/;
    var isEmailExist = emailExist(newEmail);
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
    var newEmail = document.getElementById(paramNewEmail).value;
    var newEmailMessage = document.getElementById(paramNewEmail + "Message");
    var newEmailRegex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,10})?$/;
    var isEmailExist = emailExist(newEmail);
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
    var newName = document.getElementById(paramNewName).value;
    var newNameMessage = document.getElementById(paramNewName + "Message");
    var newNameRegex = /^([a-zA-Z@]+)$/;
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
    var newUserPassword = document.getElementById(paramNewUserPassword).value;
    var newUserPasswordMessage = document.getElementById(paramNewUserPassword + "Message");
    var newUserPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
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
    var newUserConfirmPassword = document.getElementById(paramNewUserConfirmPassword).value;
    var newUserConfirmPasswordMessage = document.getElementById(paramNewUserConfirmPassword + "Message");
    var newUserPassword = document.getElementById(paramNewUserPassword).value;
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
    var newUserPhoneNumber = document.getElementById(paramNewUserPhoneNumber).value;
    var newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message");
    var newUserPhoneNumberRegex = /^[7-9]{1}[0-9]{9}$/;
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
    var newUserPage = document.getElementById('newUserPage');
    var existingUserPage = document.getElementById('existingUserPage');
    newUserPage.style.display = "none";
    existingUserPage.style.display = "block";
}
function signIn() {
    var noExistingUserIdChecker = true;
    var email = document.getElementById('existingEmail');
    var userPassword = document.getElementById("existingPassword");
    if (isEmailExist) {
        for (var i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].Password == userPassword.value && UserArrayList[i].Email.toLowerCase() == email.value.toLowerCase()) {
                noExistingUserIdChecker = false;
                CurrentUser = UserArrayList[i];
                email.value = "";
                userPassword.value = "";
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
    hideAllHome();
    var medicinePage = document.getElementById('medicinePage');
    var menu = document.getElementById('menu');
    var greet = document.getElementById('greet');
    medicinePage.style.display = "block";
    menu.style.display = "block";
    greet.style.display = "block";
    greet.innerHTML = "<h3>Hello ".concat(CurrentUser.UserName, "</h3>");
}
var form = document.getElementById("addMedicineForm");
var medicineName = document.getElementById('medicineName');
var medicineQuantity = document.getElementById('medicineQuantity');
var medicinePrice = document.getElementById('medicinePrice');
var medicineExpiryDate = document.getElementById('medicineExpiryDate');
var editMedicineName = document.getElementById('editMedicineName');
var editMedicineQuantity = document.getElementById('editMedicineQuantity');
var editMedicinePrice = document.getElementById('editMedicinePrice');
var editMedicineExpiryDate = document.getElementById('editMedicineExpiryDate');
form.addEventListener("submit", function (event) {
    event.preventDefault();
    MedicineList.push(new MedicineInfo(medicineName.value, parseInt(medicineQuantity.value), parseFloat(medicinePrice.value), new Date(medicineExpiryDate.value)));
    showMedicineDetails();
    form.reset();
    var medicineForm = document.getElementById('medicineForm');
    medicineForm.style.display = "none";
});
var editForm = document.getElementById("editMedicineForm");
editForm.addEventListener("submit", function (event) {
    event.preventDefault();
    editMedicineQuantity = document.getElementById('editMedicineQuantity');
    var item = MedicineList.find(function (item) { return item.MedicineId == editingId; });
    if (item != null) {
        item.MedicineCount = parseInt(editMedicineQuantity.value);
    }
    showMedicineDetails();
    form.reset();
    var medicineFormEdit = document.getElementById('medicineFormEdit');
    medicineFormEdit.style.display = "none";
});
var editingId = "";
var edit = function (id) {
    editingId = id;
    showEditMedicineForm();
    var item = MedicineList.find(function (item) { return item.MedicineId == id; });
    if (item != null) {
        editMedicineName.value = item.MedicineName;
        editMedicineQuantity.value = String(item.MedicineCount);
        editMedicinePrice.value = String(item.MedicinePrice);
        editMedicineExpiryDate.valueAsDate = item.MedicineExpiryDate;
    }
};
var remove = function (id) {
    MedicineList = MedicineList.filter(function (item) { return item.MedicineId != id; });
    showMedicineDetails();
};
function showBalance() {
    hideAllHome();
    var showBalance = document.getElementById('showBalance');
    showBalance.style.display = "block";
    showBalance.innerHTML = " <h2>Balance</h2><h3>Wallet Balance in Rs: ".concat(CurrentUser.Balance, "</h3>");
}
function addMoney() {
    hideAllHome();
    var recharge = document.getElementById('recharge');
    recharge.style.display = "block";
    var money = document.getElementById('addMoney');
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
    var recharge = document.getElementById('recharge');
    recharge.style.display = "block";
}
function showOrderHistory() {
    hideAllHome();
    var showOrderHistoryTable = document.getElementById('showOrderHistoryTable');
    showOrderHistoryTable.style.display = "block";
    var tableHTML = "<h2>Orders</h2><table border='1'>";
    tableHTML += "<tr><td>Order ID</td><td>Medicine ID</td><td>Medicine Name</td><td>Count</td><td>Total Price</td><td>Order Status</td></tr>";
    var orderCount = 0;
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUser.UserId) {
            tableHTML += "<tr><td>".concat(OrderList[i].OrderId, "</td><td>").concat(OrderList[i].MedicineId, "</td><td>").concat(OrderList[i].MedicineName, "</td><td>").concat(OrderList[i].MedicineCount, "</td><td>").concat(OrderList[i].TotalPrice, "</td><td>").concat(OrderList[i].OrderStatus, "</td></tr>");
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
    var cancelOrderTable = document.getElementById('cancelOrderTable');
    cancelOrderTable.style.display = "block";
    var tableHTML = "<h2>Cancel Order</h2><table border='1'>";
    tableHTML += "<tr><td>Order ID</td><td>Medicine ID</td><td>Medicine Name</td><td>Count</td><td>Total Price</td><td>Order Status</td></tr>";
    var orderCount = 0;
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUser.UserId && OrderList[i].OrderStatus == OrderStatus.Ordered) {
            tableHTML += "<tr><td>".concat(OrderList[i].OrderId, "</td><td>").concat(OrderList[i].MedicineId, "</td><td>").concat(OrderList[i].MedicineName, "</td><td>").concat(OrderList[i].MedicineCount, "</td><td>").concat(OrderList[i].TotalPrice, "</td><td>").concat(OrderList[i].OrderStatus, "</td><td><button onclick=\"cancel('").concat(OrderList[i].OrderId, "')\">Cancel</button></td></tr>");
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
var cancel = function (id) {
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].OrderId == id && CurrentUser.UserId == OrderList[i].UserId) {
            CurrentUser.Balance += OrderList[i].TotalPrice;
            var item = MedicineList.find(function (item) { return item.MedicineId == OrderList[i].MedicineId; });
            if (item != null) {
                item.MedicineCount += OrderList[i].MedicineCount;
            }
            OrderList[i].OrderStatus = OrderStatus.Cancelled;
            break;
        }
    }
    MedicineList = MedicineList.filter(function (item) { return item.MedicineId != id; });
    alert('Order cancelled successfully');
    cancelOrder();
};
function purchaseMedicine() {
    hideAllHome();
    var purchaseMedicineTable = document.getElementById('purchaseMedicineTable');
    purchaseMedicineTable.style.display = "block";
    var tableHTML = "<h3>PurchaseMedicine</h3>";
    tableHTML += "<table border='1'>";
    tableHTML += "<tr><th>Medicine Name</th><th>Count</th><th>Price</th><th>Expiry date</th><th></th></tr>";
    for (var i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineExpiryDate > new Date() && MedicineList[i].MedicineCount > 0) {
            tableHTML += "<tr><td>".concat(MedicineList[i].MedicineName, "</td><td>").concat(MedicineList[i].MedicineCount, "</td><td>").concat(MedicineList[i].MedicinePrice, "</td><td>").concat(MedicineList[i].MedicineExpiryDate.toLocaleDateString('en-GB'), "</td>\n            <td><input type=\"number\" value=\"0\" style=\"width:5rem; margin-right:1rem;\" min=\"1\" max=\"").concat(MedicineList[i].MedicineCount, "\" id=\"").concat(MedicineList[i].MedicineId, "Quantity\">\n            <button onclick=\"purchase('").concat(MedicineList[i].MedicineId, "','").concat(MedicineList[i].MedicineId, "Quantity')\">Purchase</button></td></tr>");
        }
    }
    tableHTML += "</table>";
    purchaseMedicineTable.innerHTML = tableHTML;
}
function purchase(paramMedicineID, newQuantityElement) {
    var item = MedicineList.find(function (item) { return item.MedicineId == paramMedicineID; });
    var newQuantity = document.getElementById(newQuantityElement);
    var oldQuantity = 0;
    var amount = 0;
    if (item != null) {
        oldQuantity = item.MedicineCount;
        amount = parseInt(newQuantity.value) * item.MedicinePrice;
    }
    if (parseInt(newQuantity.value) > oldQuantity) {
        alert('Quantity is not available');
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
            OrderList.push(new Order(item.MedicineId, CurrentUser.UserId, item.MedicineName, parseInt(newQuantity.value), amount, OrderStatus.Ordered));
            alert('Medicine purchase successfully');
        }
    }
    purchaseMedicine();
}
function showMedicineDetails() {
    hideAllHome();
    var medicineDetailsTable = document.getElementById('medicineDetailsTable');
    var medicineDetailsPage = document.getElementById('medicineDetailsPage');
    medicineDetailsTable.style.display = "block";
    medicineDetailsPage.style.display = "block";
    var tableHTML = "<h3>Medicine</h3>";
    tableHTML += "<table border='1'>";
    tableHTML += "<tr><th>Medicine Name</th><th>Count</th><th>Price</th><th>Expiry date</th><th></th></tr>";
    for (var i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineExpiryDate > new Date()) {
            tableHTML += "<tr><td>".concat(MedicineList[i].MedicineName, "</td><td>").concat(MedicineList[i].MedicineCount, "</td><td>").concat(MedicineList[i].MedicinePrice, "</td><td>").concat(MedicineList[i].MedicineExpiryDate.toLocaleDateString('en-GB'), "</td>\n            <td><button onclick=\"edit('").concat(MedicineList[i].MedicineId, "')\">Edit</button><button onclick=\"remove('").concat(MedicineList[i].MedicineId, "')\">Delete</button></td></tr>");
        }
    }
    tableHTML += "</table>";
    medicineDetailsTable.innerHTML = tableHTML;
}
function showMedicineForm() {
    var medicineForm = document.getElementById("medicineForm");
    medicineForm.style.display = "block";
}
function showEditMedicineForm() {
    var editMedicineForm = document.getElementById("editMedicineForm");
    editMedicineForm.style.display = "block";
    var medicineFormEdit = document.getElementById("medicineFormEdit");
    medicineFormEdit.style.display = "block";
}
function displayHomePage() {
    hideAllHome();
    CurrentUser = new User("", "", "", "", 0);
    var menu = document.getElementById('menu');
    menu.style.display = "none";
    var medicinePage = document.getElementById('medicinePage');
    medicinePage.style.display = "none";
    var homePage = document.getElementById('homePage');
    homePage.style.display = "block";
}
function hideAllHome() {
    var medicineDetailsTable = document.getElementById('medicineDetailsTable');
    var medicineDetailsPage = document.getElementById('medicineDetailsPage');
    var purchaseMedicineTable = document.getElementById('purchaseMedicineTable');
    var cancelOrderTable = document.getElementById('cancelOrderTable');
    var newUserPage = document.getElementById('newUserPage');
    var existingUserPage = document.getElementById('existingUserPage');
    var homePage = document.getElementById('homePage');
    var recharge = document.getElementById('recharge');
    var showBalance = document.getElementById('showBalance');
    var showOrderHistoryTable = document.getElementById('showOrderHistoryTable');
    var greet = document.getElementById('greet');
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
