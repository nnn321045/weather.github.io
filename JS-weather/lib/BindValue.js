function BindValue(obj, key, callback) {
    let val = obj[key];
    Object.defineProperty(obj, key, {
        get: function() {
            return val;
        },
        set: function(value) {
            val = value;
            callback(val);
        }
    });
}