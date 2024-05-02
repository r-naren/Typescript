
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 2000;
let OrderIdAutoIncrement = 3000;

let CurrentUser: User;

let NewEmailStatus = false;
let NewUserPasswordStatus = false;
let NewUserConfirmPasswordStatus = false;
let NewUserPhoneNumberStatus = false;
let isEmailExist = false;


class User {

    UserId: string;
    Email: string;
    Password: string;
    UserPhoneNumber: string;
    Balance: number;
    constructor(paramEmail: string, paramPassword: string, paramUserPhoneNumber: string, paramBalance:number) {

        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();

        this.Email = paramEmail;
        this.Password = paramPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.Balance = paramBalance;
    }

}

class MedicineInfo {

    MedicineId: string;
    MedicineName: string;
    MedicineCount: number;
    MedicinePrice: number;
    MedicineExpiryDate: Date;

    constructor(paramMedicineName: string, paramMedicineCount: number, paramMedicinePrice: number, MedicineExpiryDate: Date) {
        MedicineIdAutoIncrement++;

        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = MedicineExpiryDate;
    }

}

enum OrderStatus{ Initiated, Ordered, Cancelled}

class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;
    OrderStatus: OrderStatus;
    MedicineName: string;
    MedicineCount: number;
    TotalPrice: number;

    constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number, paramTotalPrice: number, paramOrderStatus: OrderStatus) {
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


let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("naren@gmail.com", "Password@123", "9876453210", 0));
UserArrayList.push(new User("ravi@gmail.com", "Password@123", "9123456780", 0));

let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2025, 4, 7)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2023, 4, 7)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 5, 3)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2025, 4, 7)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2025, 4, 7)));

let OrderList: Array<Order> = new Array<Order>();



function newUserPage() {
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;

    homePage.style.display = "none";
    newUserPage.style.display = "block";
}

function signUp() {

    if (NewEmailStatus == true &&
        isEmailExist == false &&
        NewUserPasswordStatus == true && 
        NewUserConfirmPasswordStatus== true && 
        NewUserPhoneNumberStatus == true) {
        let newEmail = (document.getElementById('newEmail') as HTMLInputElement).value;
        let newUserPassword = (document.getElementById('newUserPassword') as HTMLInputElement).value;
        let newUserPhoneNumber = (document.getElementById('newUserPhoneNumber') as HTMLInputElement).value;

        UserArrayList.push(new User(newEmail.toLowerCase(), newUserPassword, newUserPhoneNumber, 0));

        displayHomePage();
    }
    else
    {
        alert("Please fill out all the details in the form.")
    }

}
function emailExist(paramEmail: string): boolean{
    
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
    let isEmailExist = emailExist(newEmail);
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
    let isEmailExist = emailExist(newEmail);
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
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    let availableUser = document.getElementById('availableUser') as HTMLLabelElement;

    homePage.style.display = "none";
    existingUserPage.style.display = "block";

    // availableUser.innerHTML = "<h2>Available User</h2>";


    // for (let i = 0; i < UserArrayList.length; i++) {

    //     availableUser.innerHTML += `User Email : ${UserArrayList[i].Email} | User Id : ${UserArrayList[i].UserId}<br>`;
    // }

}

function signIn() {

    let noExistingUserIdChecker: boolean = true;
    let email = (document.getElementById('existingEmail') as HTMLInputElement).value;
    
    let userPassword = (document.getElementById("existingPassword") as HTMLInputElement).value;

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

    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
    
    let medicineDetailsTable = document.getElementById('medicineDetailsTable') as HTMLDivElement;
    let menu = document.getElementById('menu') as HTMLDivElement;
    let greet = document.getElementById('greet') as HTMLLabelElement;
    medicineDetailsTable.style.display = "none";
    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";
    menu.style.display= "block";
    greet.innerHTML = `<h3>Hello ${CurrentUser.Email}</h3>`;
}

function medicineListCheck() {
    let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;

    let medicineList = document.getElementById('medicineList') as HTMLSelectElement;

    let medicineName = medicineList[medicineList.selectedIndex].innerHTML;

    for (let i = 0; i < MedicineList.length; i++) {

        if (MedicineList[i].MedicineName == medicineName) {
            medicineInfo.innerHTML = `Medicine Id : ${MedicineList[i].MedicineId} --- Medicine Name : ${MedicineList[i].MedicineName} --- Medicine Count : ${MedicineList[i].MedicineCount} --- Medicine Price : ${MedicineList[i].MedicinePrice} `;

            displayRequiredCount();
        }

    }
}

function displayRequiredCount() {
    let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
    let requiredCount = document.getElementById('requiredCount') as HTMLDivElement;

    medicineInfo.style.display = "block";
    requiredCount.style.display = "block";
}

function buyMedicine() {

    let proceed : boolean = true;
    let finalMedicineRequiredCount : number = 0;

    let medicineList = document.getElementById('medicineList') as HTMLSelectElement;
    let medicineRequiredCount = (document.getElementById('medicineRequiredCount') as HTMLInputElement).value;

    let medicineName = medicineList[medicineList.selectedIndex].innerHTML;

    let medicineRequiredCountRegex = /^\d{1,3}$/;

    if (medicineRequiredCountRegex.test(medicineRequiredCount) && +medicineRequiredCount > 0) {
        for (let i = 0; i < MedicineList.length; i++) {

            if (MedicineList[i].MedicineName == medicineName) {

                
                if (MedicineList[i].MedicineCount > 0) {

                    if((MedicineList[i].MedicineCount - +medicineRequiredCount) < 0)
                    {
                        proceed = confirm(`We only have ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}. Do you want to buy ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}?`)
                        
                        if(proceed)
                        {
                            finalMedicineRequiredCount = MedicineList[i].MedicineCount;
                        }
                    }
                    else
                    {
                        finalMedicineRequiredCount = +medicineRequiredCount;
                    }

                    if(proceed)
                    {
                        MedicineList[i].MedicineCount = MedicineList[i].MedicineCount - finalMedicineRequiredCount;

                        OrderList.push(new Order(MedicineList[i].MedicineId, CurrentUser.UserId, MedicineList[i].MedicineName, finalMedicineRequiredCount,MedicineList[i].MedicinePrice*MedicineList[i].MedicineCount, OrderStatus.Ordered ));
                        alert("Purchase Success.");
                        displayHomePage();
                    }
                   
                }
                else if(MedicineList[i].MedicineCount <= 0) {
                    alert("Out of Stock, you can buy alternative medicine.");
                }
            }

        }
    }
    else {
        alert("Please enter valid Required Count");
    }


}

function showBalance(){
    let medicineDetailsTable = document.getElementById('medicineDetailsTable') as HTMLDivElement;
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable') as HTMLDivElement;
    let cancelOrderTable = document.getElementById('cancelOrderTable') as HTMLDivElement;
    let recharge = document.getElementById('recharge') as HTMLDivElement;
    let showBalance = document.getElementById('showBalance') as HTMLDivElement;
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable') as HTMLDivElement;
    
    purchaseMedicineTable.style.display = "none";
    cancelOrderTable.style.display = "none";
    recharge.style.display = "none";
    showBalance.style.display = "block";
    showOrderHistoryTable.style.display = "none";
    medicineDetailsTable.style.display = "none";
    showBalance.innerHTML = `Wallet Balance in Rs: ${CurrentUser.Balance}`;
}

function recharge(){
    let medicineDetailsTable = document.getElementById('medicineDetailsTable') as HTMLDivElement;
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable') as HTMLDivElement;
    let cancelOrderTable = document.getElementById('cancelOrderTable') as HTMLDivElement;
    let recharge = document.getElementById('recharge') as HTMLDivElement;
    let showBalance = document.getElementById('showBalance') as HTMLDivElement;
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable') as HTMLDivElement;
    
    purchaseMedicineTable.style.display = "none";
    cancelOrderTable.style.display = "none";
    recharge.style.display = "block";
    showBalance.style.display = "none";
    showOrderHistoryTable.style.display = "none";
    medicineDetailsTable.style.display = "none";
    showBalance.innerHTML = `Wallet Balance in Rs: ${CurrentUser.Balance}`
}

function showOrderHistory(){
    let medicineDetailsTable = document.getElementById('medicineDetailsTable') as HTMLDivElement;
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable') as HTMLDivElement;
    let cancelOrderTable = document.getElementById('cancelOrderTable') as HTMLDivElement;
    let recharge = document.getElementById('recharge') as HTMLDivElement;
    let showBalance = document.getElementById('showBalance') as HTMLDivElement;
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable') as HTMLDivElement;
    
    purchaseMedicineTable.style.display = "none";
    cancelOrderTable.style.display = "none";
    recharge.style.display = "none";
    showBalance.style.display = "none";
    showOrderHistoryTable.style.display = "block";
    medicineDetailsTable.style.display = "none";

    let tableHTML = "<table border='1'>";
    tableHTML += "<tr><td>Order ID</td><td>Medicine ID</td><td>Medicine Name</td><td>Count</td><td>Total Price</td></tr>";
    let orderCount: number = 0;
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUser.UserId ) {
            tableHTML += `<tr><td>${OrderList[i].OrderId}</td><td>${OrderList[i].MedicineId}</td><td>${OrderList[i].MedicineName}</td><td>${OrderList[i].MedicineCount}</td><td>${OrderList[i].TotalPrice}</td></tr>`;
            orderCount++;
        }
    }
    tableHTML +="</table>";

    if (orderCount == 0) {
        showOrderHistoryTable.innerHTML = "Order History is empty.<br>";
    }
    else{
        showOrderHistoryTable.innerHTML = tableHTML;
    }   
    

}

function showMedicineDetails(){
    let medicineDetailsTable = document.getElementById('medicineDetailsTable') as HTMLDivElement;
    let purchaseMedicineTable = document.getElementById('purchaseMedicineTable') as HTMLDivElement;
    let cancelOrderTable = document.getElementById('cancelOrderTable') as HTMLDivElement;
    let recharge = document.getElementById('recharge') as HTMLDivElement;
    let showBalance = document.getElementById('showBalance') as HTMLDivElement;
    let showOrderHistoryTable = document.getElementById('showOrderHistoryTable') as HTMLDivElement;
    
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
    CurrentUser = new User("","","",0);

    let medicineList = document.getElementById('medicineList') as HTMLSelectElement;
    medicineList.selectedIndex = 0;

    let requiredCount = document.getElementById('requiredCount') as HTMLDivElement;
    let medicineDetailsTable = document.getElementById('medicineDetailsTable') as HTMLLabelElement;

    let historyDisplay = document.getElementById('historyDisplay') as HTMLLabelElement;

    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let menu = document.getElementById('menu') as HTMLDivElement;

    // (document.getElementById('medicineRequiredCount') as HTMLInputElement).value = null;
    // (document.getElementById('existingUserId') as HTMLInputElement).value = null;

    // requiredCount.style.display = "none";
    // historyDisplay.style.display = "none";
    menu.style.display = "none";
    medicinePage.style.display = "none";
    // medicineInfo.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    medicineDetailsTable.style.display ="none";
    homePage.style.display = "block";
}