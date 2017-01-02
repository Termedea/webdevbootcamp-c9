function average(testScores){
    var sum = 0;
    
    if(Array.isArray(testScores)){
        
        //accumulator pattern
        testScores.forEach(function(score){
           sum +=  score;
        });
        
        var avg = sum/testScores.length;
        
        return Math.round(avg);
    }
    
    return "no grades to process";
}


var scores = [90, 98, 89, 100, 100, 86, 94]
console.log(average(scores)); //should return 94

var scores2 = "not an array"
console.log(average(scores2)); //should return "no grades to process"

var scores3 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49]
console.log(average(scores3)); //should return 68