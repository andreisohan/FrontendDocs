var employeesList = [
    {
        firstName: 'John',
        lastName: 'King',
        phone: '0123456789',
        salary: 4500
    },
    {
        firstName: 'Steven',
        lastName: 'Gerard',
        phone: '0123456789',
        salary: 4500
    },
    {
        firstName: 'Diana',
        lastName: 'Ross',
        phone: '0123456789',
        salary: 4500
    },
    {
        firstName: 'Mike',
        lastName: 'Bob',
        phone: '0123456789',
        salary: 4500
    },
    {
        firstName: 'Emily',
        lastName: 'Hudson',
        phone: '0123456789',
        salary: 4500
    }
];
function showList() {
    var myTable = '<table class="table table-striped",border="1"><tr><th>First Name</th><th>Last Name</th><th>Phone</th><th>Salary</th><th>View Details</th><th>Delete</th></tr>';
    for(var i in employeesList) {
        myTable +=
            '<tr><td>'+employeesList[i].firstName+'</td><td>'+employeesList[i].lastName+'</td><td>'+employeesList[i].phone+'</td><td>'+employeesList[i].salary+'</td><td><button onclick="viewDetails('+i+')">View</button></td><td><button onclick="deleteRow('+i+');showList()">Delete Row</button></td></tr>';
    }
    myTable += '<tr><td>'+mostCommonFirstName()+'</td><td>'+noUniqueLastName()+'</td><td>'+mostPhoneNumbers()+'</td><td>'+averageSalary()+'</td></tr>'
    myTable += '</table>';
    var container = document.getElementById('listcontainer');
    container.innerHTML = myTable;
}

var Employee = function (firstName, lastName, phone, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.salary = salary;
}
function addEmployee() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phone = document.getElementById("phone").value;
    var salary = document.getElementById("salary").value;
    employeesList.push(new Employee(firstName, lastName, phone, salary));
    document.getElementById('firstName').value="";
    document.getElementById('lastName').value="";
    document.getElementById('phone').value="";
    document.getElementById('salary').value="";

}

function salaryTotal () {
    var sum=0;
    for(var i in employeesList){
        sum+=parseFloat(employeesList[i].salary);
    }
    var container = document.getElementById('totalSalary');
    container.innerHTML = "Total Salary is : "+sum;
}

function deleteEmployee(){
    employeesList.pop();
}

function viewDetails(i){
        alert("First Name = " + employeesList[i].firstName + " ; Last Name = " + employeesList[i].lastName + " ; Phone Number = " + employeesList[i].phone + " ; Salary = " + employeesList[i].salary);

}

function deleteRow(i){
    employeesList.splice(i,1);
}

function mostCommonFirstName(){
    var indexTable = [];
    for(var i = 0; i < employeesList.length; i++) {
        indexTable[i] = 0;
    }
    for (var i = 0; i < employeesList.length; i++) {
        for (var j = 0; j < employeesList.length; j++) {
            if (employeesList[i].firstName.localeCompare(employeesList[j].firstName) == 0) {
                indexTable[i] += 1;
            }
        }
    }

    var max = -1;
    for (var i = 0; i < employeesList.length; i++) {
        if (indexTable[i] > max) {
            max = i;
        }
    }

    return employeesList[max].firstName;
}

function noUniqueLastName(){
    var count = 0;
    var ok = true;
    var truthTable = [];
    for(var i = 0; i < employeesList.length; i++) {
        truthTable.push('ok'.toString());
    }

    for(var i = 0; i < employeesList.length ;  i++) {
        if(truthTable[i] == 'ok'.toString()) {
            for (var j = i + 1; j < employeesList.length; j++) {
                if (employeesList[i].lastName.localeCompare(employeesList[j].lastName) == 0) {
                    truthTable[j] = 'notOk';
                    ok = false;
                }
            }
            count++;
            truthTable[i] = 'notOk';
        }
    }
    return count;
}

function mostPhoneNumbers(){
    var list = [];
    for (var i = 0; i < 10; i++) {
        list[i] = 0;
    }

    for(var i = 0; i < employeesList.length; i++) {
        for (var j = 0; j < employeesList[i].phone.length; j++) {
            list[parseInt(employeesList[i].phone[j])] += 1;
        }
    }
    strAux = "";
    keysSorted = Object.keys(list).sort(function (a, b) {
        return list[b] - list[a];
    });
    for(var i = 0; i < 4; i++) {
        strAux += keysSorted[i].toString() + ", ";
    }
    strAux += keysSorted[i].toString();
    return strAux;
}

function averageSalary(){
    var average=0;
    var sum=0;
    for(var i in employeesList){
        sum+=parseFloat(employeesList[i].salary);
    }
    return average=sum/employeesList.length;
}





function compareFunction(key){
    return function (a,b){
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    }
}
function sorter(){
    var sortOption = document.getElementById('sortOption');
    var option = parseInt(sortOption.value);
    var key='';
    switch(option){
        case 1:
            key='firstName';
            break;
        case 2:
            key='lastName';
            break;
        case 3:
            key='phone';
            break;
        case 4:
            key='salary';
            brea;
    }
    if(key){
        employeesList.sort(compareFunction(key));
        showList();
    }
}


function filterList() {
    var filterWord = document.getElementById("filterBy").value;
    if (filterWord!="" || filterWord!='' || filterWord!=null) {
        employeesList = employeesList.filter(function (el) {
            return el.phone.contains(filterWord) ||
                el.firstName.contains(filterWord) ||
                el.lastName.contains(filterWord);
        });
        showList();
    } else {
        employeesList = originalList;
        showList();
    }
}

function filterListCss() {
    var filterWord = document.getElementById("filterBy").value;
    var table = document.getElementById("myTable");
    if (filterWord!="" || filterWord!='' || filterWord!=null) {
        for (var i = 0, row; row = table.rows[i]; i++) {
            var found = false;
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (col.innerHTML == filterWord) {
                    found = true;
                }
            }
            if (found == false) {
                row.style.visibility="hidden";
            }
        }
    }else{
        for ( i = 0, row; row = table.rows[i]; i++) {
            row.style.visibility="visible";
        }
    }
}



















