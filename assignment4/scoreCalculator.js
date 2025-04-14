function sumGrades(...args) {
    let total = 0;
    
    for (const arg of args) {
      if (Array.isArray(arg)) {
        for (const grade of arg) {
          validateGrade(grade);
          total += Number(grade);
        }
      } else {
        validateGrade(arg);
        total += Number(arg);
      }
    }
    
    return total;
  }
  
  
  function validateGrade(grade) {
    if (grade === null || grade === undefined || isNaN(Number(grade))) {
      throw new Error(`Invalid grade value: ${grade}`);
    }
  }
  
  // Example usage:
  console.log(sumGrades(90, 85, 95));            
  console.log(sumGrades([90, 85, 95]));            
  console.log(sumGrades([90, 85], 95, [75, 80])); 
  console.log(sumGrades("90", "85", "95"));          