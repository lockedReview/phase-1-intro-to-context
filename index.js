// Your code here

function createEmployeeRecord(array){
   const employee = {};
    employee.firstName = array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    
   
    employee.timeInEvents= [];
    employee.timeOutEvents = []; 
    
    console.log(employee)
    return employee
}

function createEmployeeRecords(array){
   let employeeRecords=[];
   

   array.forEach((x)=>{
    const employee = createEmployeeRecord(x);
    employeeRecords.push(employee);
   })

   console.log(employeeRecords)
   return employeeRecords
   
}

function createTimeInEvent(empRecord,stamp){
    const dateTimeString = stamp;
    const dateTimeArray = dateTimeString.split(" ");

    const employeeTimeInObj = {
        type: "TimeIn",
        hour: parseInt(dateTimeArray[1]),
        date: dateTimeArray[0]
    };

  empRecord.timeInEvents.push(employeeTimeInObj);

  console.log(empRecord);

  return empRecord;

}

function createTimeOutEvent(empRecord, stamp){
    const dateTimeString = stamp;
    const dateTimeArray = dateTimeString.split(" ");

    const employeeTimeOutObj = {
        type: "TimeOut",
        hour: parseInt(dateTimeArray[1]),
        date: dateTimeArray[0]
    };

  empRecord.timeOutEvents.push(employeeTimeOutObj);  
  console.log(empRecord);
  return empRecord;

}

function hoursWorkedOnDate(empRecord, date) {
    const timeInEvent = empRecord.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = empRecord.timeOutEvents.find((event) => event.date === date);
    
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
  
    const record = (timeOutHour - timeInHour)/100 ;
  
    return record;
}

function wagesEarnedOnDate(employee, date) {
    const record = hoursWorkedOnDate(employee, date);
    const pay = employee.payPerHour;
  
    const wagesEarned = record * pay;
    return wagesEarned;
}
  
function allWagesFor(employee) {
    const employeeTimeIn = employee.timeInEvents;
    const employeeTimeOut = employee.timeOutEvents;
    const wages = [];
  
    for (const event of employeeTimeIn) {
      const wagesEarned = wagesEarnedOnDate(employee, event.date);
      wages.push(wagesEarned);
    }
    const wagesOwed = wages.reduce((total, wage) => total + wage, 0);
    return wagesOwed
}

function calculatePayroll(records) {
    const totalWages = [];
  
    records.forEach((employee) => {
      const wagesOwed = allWagesFor(employee);
      totalWages.push(wagesOwed);
    });
  
    const totalPayroll = totalWages.reduce((total, wage) => total + wage, 0);
    return totalPayroll;
  
}

