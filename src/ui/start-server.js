var extendRequire = require("isomorphic-loader/lib/extend-require");
extendRequire({startDelay: 500}).then(function () {
    require("./server");
}).catch(function (err) {
    console.log(err);
});