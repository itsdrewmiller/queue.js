(function () {
    this.Queue = function (refreshSize) {

        refreshSize = refreshSize || 100000;
        var innerArray = [];
        var offset = 0;

        this.enqueue = function (val) {
            innerArray.push(val);
            if (offset > refreshSize) { this.clean(); }
        };

        this.cheat = function (val) {
            if (offset > 0) {
                offset--;
                innerArray[offset] = val;
            } else {
                innerArray.splice(0, 0, val);
            }
            if (offset > refreshSize) { this.clean(); }
        };

        this.dequeue = function () {
            var returnValue;
            while (returnValue === undefined && offset < innerArray.length) {
                offset++;
                returnValue = innerArray[offset - 1];
                innerArray[offset - 1] = undefined;
            }
            return returnValue;
        };

        this.peek = function (i) {
            return innerArray[offset + i];
        };

        this.length = function () {
            return innerArray.length - offset;
        };

        this.removeAt = function (i) {
            innerArray[offset + i] = undefined;
        };

        this.all = function (process) {
            for (var i = offset; i < innerArray.length; i++) {
                process(innerArray[i], i - offset);
            }
        };

        this.clean = function () {
            var newArray = [];
            for (var i = offset; i < innerArray.length; i++) {
                if (innerArray[i] !== undefined) { newArray.push(innerArray[i]); }
            }
            innerArray = newArray;
            offset = 0;
        };

        this.sort = function (sortFunc) {
            this.clean();
            innerArray.sort(sortFunc);
        };
    };
})();
