
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 2000;
let OrderIdAutoIncrement = 3000;

let CurrentUser: User;

let NewEmailStatus = false;
let NewUserPasswordStatus = false;
let NewUserConfirmPasswordStatus = false;
let NewUserPhoneNumberStatus = false;
let isEmailExist = false;
let NewNameStatus = false;

//user class
class User {
    UserId: string;
    UserName : string;
    Email: string;
    Password: string;
    UserPhoneNumber: string;
    Balance: number;
    constructor(paramName:string, paramEmail: string, paramPassword: string, paramUserPhoneNumber: string, paramBalance:number) {

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

    MedicineId: string;
    MedicineName: string;
    MedicineCount: number;
    MedicinePrice: number;
    MedicineExpiryDate: Date;

    constructor(paramMedicineName: string, paramMedicineCount: number, paramMedicinePrice: number, MedicineExpiryDate: Date) {
        MedicineIdAutoIncrement++;

        this.MedicineId = "MID" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = MedicineExpiryDate;
    }
}

enum OrderStatus{  Ordered ="Ordered", Cancelled = "Cancelled"}

class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;
    OrderStatus: OrderStatus;
    MedicineName: string;
    MedicineCount: number;
    TotalPrice: number;
    OrderDate: Date;

    constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number, paramTotalPrice: number, paramOrderStatus: OrderStatus, paramOrderDate: Date) {
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


let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("Naren","naren@gmail.com", "Password@123", "9876453210", 100));
UserArrayList.push(new User("Ravi","ravi@gmail.com", "Password@123", "9123456780", 0));

let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2025,4,7)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date("2025-04-07")));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date("2024-05-03")));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date("2025-04-07")));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date("2025-04-07")));

let OrderList: Array<Order> = new Array<Order>();

function newUserPage() {
    hideAllHome();
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let existingEmail = document.getElementById('existingEmail') as HTMLInputElement;
    let existingPassword = document.getElementById('existingPassword') as HTMLInputElement;
    let existingEmailMessage = document.getElementById('existingEmailMessage') as HTMLLabelElement;
    let existingPasswordMessage = document.getElementById('existingPasswordMessage') as HTMLLabelElement;
    existingEmail.value = "";
    existingPassword.value = "";
    existingEmailMessage.innerHTML="";
    existingPasswordMessage.innerHTML = "";


    homePage.style.display = "block";
    newUserPage.style.display = "block";
    existingUserPage.style.display ="none";
}

function signUp() {

    if (NewEmailStatus == true &&
        isEmailExist == false &&
        NewUserPasswordStatus == true && 
        NewUserConfirmPasswordStatus== true && 
        NewUserPhoneNumberStatus == true && 
        NewNameStatus == true) {
        let newName = (document.getElementById('newName') as HTMLInputElement)
        let newEmail = (document.getElementById('newEmail') as HTMLInputElement);
        let newUserPassword = (document.getElementById('newUserPassword') as HTMLInputElement);
        let newUserConfirmPassword = (document.getElementById('newUserConfirmPassword') as HTMLInputElement);
        let newUserPhoneNumber = (document.getElementById('newUserPhoneNumber') as HTMLInputElement);

        UserArrayList.push(new User(newName.value, newEmail.value.toLowerCase(), newUserPassword.value, newUserPhoneNumber.value, 0));
        newName.value ="";
        newEmail.value = "";
        newUserPassword.value="";
        newUserConfirmPassword.value="";
        newUserPhoneNumber.value="";
        alert('User added successfully');
        displayHomePage();
    }
    else
    {
        alert("Please fill out all the details in the form.")
    }

}
function emailExist(paramEmail: string): boolean{
    isEmailExist = false;
    for (let i = 0; i < UserArrayList.length; i++) {
        if(paramEmail.toLowerCase() == UserArrayList[i].Email.toLowerCase()){
            isEmailExist = true;
            break;
        }  
    }
    return isEmailExist;

}
function checkEmail(paramNewEmail: string) {
    let newEmail = (document.getElementById(paramNewEmail) as HTMLInputElement).value;
    let newEmailMessage = document.getElementById(paramNewEmail + "Message") as HTMLLabelElement;
    let newEmailRegex =  /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,10})?$/;
    isEmailExist = emailExist(newEmail);
    if (newEmailRegex.test(newEmail) && isEmailExist) {
        NewEmailStatus = true;
        newEmailMessage.style.visibility = "hidden";
    }
    else if(newEmailRegex.test(newEmail) && !isEmailExist){
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

function checkNewEmail(paramNewEmail: string) {
    let newEmail = (document.getElementById(paramNewEmail) as HTMLInputElement).value;
    let newEmailMessage = document.getElementById(paramNewEmail + "Message") as HTMLLabelElement;
    let newEmailRegex =  /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,10})?$/;
    isEmailExist = emailExist(newEmail);
    if (newEmailRegex.test(newEmail) && !isEmailExist) {
        NewEmailStatus = true;
        newEmailMessage.style.visibility = "hidden";
    }
    else if(isEmailExist){
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

function checkNewName(paramNewName: string) {
    let newName = (document.getElementById(paramNewName) as HTMLInputElement).value;
    let newNameMessage = document.getElementById(paramNewName + "Message") as HTMLLabelElement;
    let newNameRegex =  /^([a-zA-Z@]+)$/;
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

function checkNewUserPassword(paramNewUserPassword: string) {
    let newUserPassword = (document.getElementById(paramNewUserPassword) as HTMLInputElement).value;
    let newUserPasswordMessage = document.getElementById(paramNewUserPassword + "Message") as HTMLLabelElement;
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
function checkNewUserConfirmPassword(paramNewUserConfirmPassword: string, paramNewUserPassword:string ) {
    let newUserConfirmPassword = (document.getElementById(paramNewUserConfirmPassword) as HTMLInputElement).value;
    let newUserConfirmPasswordMessage = document.getElementById(paramNewUserConfirmPassword + "Message") as HTMLLabelElement;
    let newUserPassword = (document.getElementById(paramNewUserPassword) as HTMLInputElement).value;
    
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

function checkNewUserPhoneNumber(paramNewUserPhoneNumber: string) {
    let newUserPhoneNumber = (document.getElementById(paramNewUserPhoneNumber) as HTMLInputElement).value;
    let newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message") as HTMLLabelElement;
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
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    let newName = (document.getElementById('newNameMessage') as HTMLInputElement)
    let newEmail = (document.getElementById('newEmailMessage') as HTMLInputElement);
    let newUserPassword = (document.getElementById('newUserPasswordMessage') as HTMLInputElement);
    let newUserConfirmPassword = (document.getElementById('newUserConfirmPasswordMessage') as HTMLInputElement);
    let newUserPhoneNumber = (document.getElementById('newUserPhoneNumberMessage') as HTMLInputElement);
    let SignUpForm = document.getElementById('SignUpForm') as HTMLFormElement;
    
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

    let email = (document.getElementById('existingEmail') as HTMLInputElement);
    checkEmail('existingEmail');
    let userPassword = (document.getElementById("existingPassword") as HTMLInputElement);
    let existingUserId: boolean = false;
    if (isEmailExist) {
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].Password == userPassword.value && UserArrayList[i].Email.toLowerCase() == email.value.toLowerCase()) {
                CurrentUser = UserArrayList[i];
                email.value = "";
                userPassword.value ="";
                existingUserId = true;
                medicinePage();

                return;
            }
            
        }
        if(!existingUserId){
            alert('Email ID not registered');
        }
       
    }
    else {
        alert("Email ID is not in database. pleaase register ");
    }
}

function medicinePage() {

    hideAllHome();
    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
    
    let menu = document.getElementById('menu') as HTMLDivElement;
    let greet = document.getElementById('greet') as HTMLLabelElement;
    
    
    medicinePage.style.display = "block";
    menu.style.display= "block";
    greet.style.display = "block";
    greet.innerHTML = `<h3>Hello ${CurrentUser.UserName}</h3>`;
}


const form = document.getElementById("addMedicineForm") as HTMLFormElement;
const medicineName = document.getElementById('medicineName') as HTMLInputElement;
const medicineQuantity = document.getElementById('medicineQuantity') as HTMLInputElement;
const medicinePrice = document.getElementById('medicinePrice') as HTMLInputElement;
const medicineExpiryDate= document.getElementById('medicineExpiryDate') as HTMLInputElement;
const editMedicineName = document.getElementById('editMedicineName') as HTMLInputElement;
let editMedicineQuantity = document.getElementById('editMedicineQuantity') as HTMLInputElement;
const editMedicinePrice = document.getElementById('editMedicinePrice') as HTMLInputElement;
const editMedicineExpiryDate= document.getElementById('editMedicineExpiryDate') as HTMLInputElement;
form.addEventListener("submit", (event) => {
    event.preventDefault();
    MedicineList.push(new MedicineInfo(medicineName.value,  parseInt(medicineQuantity.value), parseFloat(medicinePrice.value),  new Date(medicineExpiryDate.value)));
    showMedicineDetails();
    form.reset();
    let medicineForm = document.getElementById('medicineForm') as HTMLDivElement;
    medicineForm.style.display = "none";
  });

const editForm = document.getElementById("editMedicineForm") as HTMLFormElement;
editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    editMedicineQuantity = document.getElementById('editMedicineQuantity') as HTMLInputElement;
    const item = MedicineList.find((item) => item.MedicineId == editingId);
    if (item!=null) {
        item.MedicineCount = parseInt(editMedicineQuantity.value);
        
    }
    showMedicineDetails();
    form.reset();
    let medicineFormEdit = document.getElementById('medicineFormEdit') as HTMLDivElement;
    medicineFormEdit.style.display = "none";
  });

let editingId ="";
const edit = (id: string) => {
    
    editingId = id;
    showEditMedicineForm();
    const item = MedicineList.find((item) => item.MedicineId == id);
    if (item!=null) {
        editMedicineName.value = item.MedicineName;
        editMedicineQuantity.value = String(item.MedicineCount);
        editMedicinePrice.value = String(item.MedicinePrice);
        editMedicineExpiryDate.valueAsDate = item.MedicineExpiryDate;
    }
  };

  const remove = (id: string) => {
    MedicineList = MedicineList.filter((item) => item.MedicineId != id);
    showMedicineDetails();
  };

function showBalance(){
    hideAllHome();
    let showBalance = document.getElementById('showBalance') as HTMLDivElement;
    
    showBalance.style.display = "block";
    
    showBalance.innerHTML = ` <h2>Balance</h2><h3>Wallet Balance in Rs: ${CurrentUser.Balance}</h3>`;
}

function addMoney(){
    hideAllHome();
    let recharge = document.getElementById('recharge') as HTMLDivElement;
    recharge.style.display = "block";
    let money = document.getElementById('addMoney') as HTMLInputElement;
    
    if(parseInt(money.value)<1){
        alert('Enter valid amount to recharge');
    }
    else{
        CurrentUser.Balance += parseFloat(money.value);
        alert('Money added successfully');
        money.value = "";
    }
    
}

function topUp(){
    hideAllHome();
    let recharge = document.getElementById('recharge') as HTMLDivElement;
    recharge.style.display = "block";
}


function showOrderHistory(){
    hideAllHome();
    
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable') as HTMLDivElement;
    showOrderHistoryTable.style.display = "block";

    let tableHTML = "<h2>Orders</h2><table border='1'>";
    tableHTML += "<tr><td>Order ID</td><td>Medicine ID</td><td>Medicine Name</td><td>Count</td><td>Total Price</td><td>Ordered Date</td><td>Order Status</td></tr>";
    let orderCount: number = 0;
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUser.UserId ) {
            tableHTML += `<tr><td>${OrderList[i].OrderId}</td><td>${OrderList[i].MedicineId}</td><td>${OrderList[i].MedicineName}</td><td>${OrderList[i].MedicineCount}</td><td>${OrderList[i].TotalPrice}</td><td>${OrderList[i].OrderDate.toLocaleDateString('en-GB')}</td><td>${OrderList[i].OrderStatus}</td></tr>`;
            orderCount++;
        }
    }
    tableHTML +="</table>";

    if (orderCount == 0) {
        showOrderHistoryTable.innerHTML = "<h2>Order History is empty.</h2>";
    }
    else{
        showOrderHistoryTable.innerHTML = tableHTML;
    }   
}

function cancelOrder(){
    hideAllHome();
    
    let cancelOrderTable = document.getElementById('cancelOrderTable') as HTMLDivElement;
    cancelOrderTable.style.display = "block";

    let tableHTML = "<h2>Cancel Order</h2><table border='1'>";
    tableHTML += "<tr><td>Order ID</td><td>Medicine ID</td><td>Medicine Name</td><td>Count</td><td>Total Price</td><td>Order Date</td><td>Order Status</td><td>Action</td></tr>";
    let orderCount: number = 0;
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUser.UserId && OrderList[i].OrderStatus == OrderStatus.Ordered) {
            tableHTML += `<tr><td>${OrderList[i].OrderId}</td><td>${OrderList[i].MedicineId}</td><td>${OrderList[i].MedicineName}</td><td>${OrderList[i].MedicineCount}</td><td>${OrderList[i].TotalPrice}</td><td>${OrderList[i].OrderDate.toLocaleDateString('en-GB')}</td><td>${OrderList[i].OrderStatus}</td><td><button onclick="cancel('${OrderList[i].OrderId}')">Cancel</button></td></tr>`;
            orderCount++;
        }
    }
    tableHTML +="</table>";

    if (orderCount == 0) {
        cancelOrderTable.innerHTML = "<h2>There is no order to cancel.</h2>";
    }
    else{
        cancelOrderTable.innerHTML = tableHTML;
    }   

}
//cancel order
const cancel = (id: string) => {
    for(var i=0;i<OrderList.length;i++){
        if(OrderList[i].OrderId == id && CurrentUser.UserId == OrderList[i].UserId){
            CurrentUser.Balance += OrderList[i].TotalPrice;
            let item = MedicineList.find((item) => item.MedicineId == OrderList[i].MedicineId);
            if(item!=null){
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

function purchaseMedicine(){
    hideAllHome();
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable') as HTMLDivElement;
    purchaseMedicineTable.style.display = "block";
    let tableHTML = "<h3>PurchaseMedicine</h3>";
    tableHTML += "<table border='1'>";
    tableHTML += "<tr><th>Medicine Name</th><th>Count</th><th>Price</th><th>Action</th></tr>";
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineExpiryDate > new Date() && MedicineList[i].MedicineCount>0) {
            tableHTML += `<tr><td>${MedicineList[i].MedicineName}</td><td>${MedicineList[i].MedicineCount}</td><td>${MedicineList[i].MedicinePrice}</td>
            <td><button onclick="showPurchase('${MedicineList[i].MedicineId}')">To Buy</button></td>
            <td id="${MedicineList[i].MedicineId}Purchase" style="display:none;border-style:none;">Enter quantity: <input type="number" value="0" style="width:5rem;  margin-right:1rem;" min="1" max="${MedicineList[i].MedicineCount}" id="${MedicineList[i].MedicineId}Quantity">
            <button onclick="purchase('${MedicineList[i].MedicineId}','${MedicineList[i].MedicineId}Quantity')">Purchase</button></td></tr>`;
        }
    }
    tableHTML += "</table>";
    purchaseMedicineTable.innerHTML = tableHTML;
}

function showPurchase(paramMedicineID:string){
    let showMedicineInput = document.getElementById(paramMedicineID+"Purchase") as HTMLTableColElement;
    showMedicineInput.style.display = "block";
}

function purchase(paramMedicineID:string, newQuantityElement:string){
    let item = MedicineList.find((item) => item.MedicineId == paramMedicineID);
    let newQuantity = document.getElementById(newQuantityElement) as HTMLInputElement;
    
    let oldQuantity:number = 0;
    let amount: number = 0;
    if(item!=null){
        oldQuantity = item.MedicineCount;
        amount = parseInt(newQuantity.value)* item.MedicinePrice;
    }
    
    if(parseInt(newQuantity.value) > oldQuantity){
        alert('Quantity is not available (Out Of Stock)');
    }
    else if(parseInt(newQuantity.value)<1){
        alert('Enter valid quantity to purchase');
    }
    else if(amount > CurrentUser.Balance){
        alert("Invalid balance in wallet");
    }
    else{
        CurrentUser.Balance -= amount;
        if(item!=null){
            item.MedicineCount -= parseInt(newQuantity.value);
            OrderList.push(new Order(item.MedicineId, CurrentUser.UserId, item.MedicineName, parseInt(newQuantity.value), amount, OrderStatus.Ordered, new Date()));
            alert(`${item.MedicineName} Medicine purchased successfully and debited amount ${amount} from your wallet`);
            newQuantity.innerHTML = "0";
            let showMedicineInput = document.getElementById(paramMedicineID+"Purchase") as HTMLTableColElement;
            showMedicineInput.style.display = "none";
        }
    }
    purchaseMedicine();
    
}


function showMedicineDetails(){
    hideAllHome();
    let medicineDetailsTable = document.getElementById('medicineDetailsTable') as HTMLDivElement;
    let medicineDetailsPage = document.getElementById('medicineDetailsPage') as HTMLButtonElement;
    medicineDetailsTable.style.display = "block";
    medicineDetailsPage.style.display ="block";

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

function showMedicineForm(){
    let medicineForm = document.getElementById("medicineForm") as HTMLDivElement;
    medicineForm.style.display = "block";
} 
function showEditMedicineForm(){
    
    let editMedicineForm = document.getElementById("editMedicineForm") as HTMLDivElement;
    editMedicineForm.style.display = "block";
    let medicineFormEdit = document.getElementById("medicineFormEdit") as HTMLDivElement;
    medicineFormEdit.style.display = "block";
} 

function displayHomePage() {
    hideAllHome();
    CurrentUser = new User("","","","",0);
    
    let menu = document.getElementById('menu') as HTMLDivElement;
    menu.style.display = "none";
    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
    medicinePage.style.display = "none";
    
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    
    homePage.style.display = "block";
}

function hideAllHome(){
    let medicineDetailsTable = document.getElementById('medicineDetailsTable') as HTMLLabelElement;
    let medicineDetailsPage = document.getElementById('medicineDetailsPage') as HTMLLabelElement;
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable') as HTMLLabelElement;
    let cancelOrderTable = document.getElementById('cancelOrderTable') as HTMLLabelElement;
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let recharge = document.getElementById('recharge') as HTMLDivElement;
    let showBalance = document.getElementById('showBalance') as HTMLDivElement;
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable') as HTMLDivElement;
    let greet = document.getElementById('greet') as HTMLDivElement;
    
    medicineDetailsTable.style.display ="none";
    medicineDetailsPage.style.display ="none";
    purchaseMedicineTable.style.display ="none";
    cancelOrderTable.style.display ="none";
    newUserPage.style.display ="none";
    existingUserPage.style.display ="none";
    homePage.style.display ="none";
    recharge.style.display ="none";
    showBalance.style.display ="none";
    showOrderHistoryTable.style.display ="none";
    greet.style.display = "none";
}