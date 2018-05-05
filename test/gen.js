function co(GenFunc) {
    return function (cb) {
        var gen = GenFunc()
        next()
        function next(args) { // 传入args 只是为了将最后的执行结果传给cb
            if (gen.next) {
                var ret = gen.next(args) // 使用args
                if (ret.done) {
                    cb && cb(args)
                } else {
                    ret.value(next)
                }
            }
        }
    }
}
function delay(time) {
    return function (fn) {
        setTimeout(function () {
            fn(time) // time为回调参数
        }, time)
    }
}

co(function* () {
    var a
    a = yield delay(200) // a: 200
    a = yield delay(a + 100) // a: 300
    a = yield delay(a + 100) // a: 400
})(function (data) {
    console.log(data) // print 400, 最后的值被回调出来
})