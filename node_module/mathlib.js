module.exports = function () {
    
    return {
        add: function (num1, num2) {
            return num1 + num2;
        },
        multiply: function (num1, num2) {
            return num1 * num2;
        },
        square: function (num) {
            return num * num;
        },
        random: function (max, min) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        bubbleSort: function (arr) {

            for (var i = 0; i < arr.length - 1; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) {
                        var temp = arr[j];
                        arr[j] =arr[i];
                        arr[i] = temp;
                    }

                }
            }
            return arr
        },
        quickSort: function(arr){
          var left = arr[0]
          var right = arr[arr.length-1]
          var paviot = arr[0]
            

        }
    }
};