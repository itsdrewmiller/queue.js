(function () {
    this.Queue = function () {

        var innerArray = [];
        var index = 0;

        this.enqueue = function (val) {
            innerArray.push(val);
        };

        this.cheat = function (val) {
            if (index > 0) {
                index--;
                innerArray[index] = val;
            } else {
                innerArray.splice(0, 0, val);
            }

        };

        this.dequeue = function () {
            var returnValue;
            while (returnValue === undefined && index < innerArray.length) {
                index++;
                returnValue = innerArray[index - 1];
                innerArray[index - 1] = undefined;
            }
            return returnValue;
        };

        this.peek = function (i) {
            return innerArray[index + i];
        };

        this.length = function () {
            return innerArray.length - index;
        };

        this.removeAt = function (i) {
            innerArray[index + i] = undefined;
        };

        this.all = function (process) {
            for (var i = index; i < innerArray.length; i++) {
                process(innerArray[i], i - index);
            }
            this.clean();
        };

        this.clean = function () {
            var newArray = [];
            for (var i = index; i < innerArray.length; i++) {
                if (innerArray[i] !== undefined) { newArray.push(innerArray[i]); }
            }
            innerArray = newArray;
            index = 0;
        };

        this.sort = function (sortFunc) {
            this.clean();
            innerArray.sort(sortFunc);
        };
    };
})();
