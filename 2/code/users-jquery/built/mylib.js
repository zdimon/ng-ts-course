System.register(["jquery"], function (exports_1, context_1) {
    "use strict";
    var jquery_1;
    var __moduleName = context_1 && context_1.id;
    function say() {
        var myvar = jquery_1.default("#myinput").val();
        console.log("hello " + myvar);
    }
    exports_1("say", say);
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }
        ],
        execute: function () {
            jquery_1.default("#mybtn").on('click', say);
        }
    };
});
