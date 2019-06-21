System.register(["jquery"], function (exports_1, context_1) {
    "use strict";
    var jquery_1, app;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }
        ],
        execute: function () {
            // Определим объект приложения 
            app = {};
            // добавим данные 
            app.data = [
                { 'id': 1, 'username': 'Dima', 'email': 'zdimon77@gmail.com' },
                { 'id': 2, 'username': 'Vova', 'email': 'vova@gmail.com' },
                { 'id': 3, 'username': 'Petro', 'email': 'petro@gmail.com' }
            ];
            // метод инициализации
            app.init = function () {
                this.user_list = jquery_1.default('#user_list');
                this.update();
            };
            //метод удаления пользователя
            app.delete_user = function (user_id) {
                console.log(this);
                var that = this;
                for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                    var user = _a[_i];
                    if (user.id == user_id) {
                        var idx = this.data.indexOf(user);
                        this.data.splice(idx, 1);
                        console.log(idx);
                        this.update();
                    }
                }
            };
            // метод прорисовки списка
            app.update = function () {
                var _this = this;
                this.user_list.empty();
                for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                    var user = _a[_i];
                    //добавим элементы в список
                    var el = "<li>" + user.username + ":" + user.email + "\n    <a id='" + user.id + "' href=\"#\">Delete</a>\n    </li>";
                    this.user_list.append(el);
                }
                // подвешиваем событие
                this.user_list.find("a").on('click', function (e) {
                    alert(jquery_1.default(e.target).attr('id'));
                    // тут будем удалять пользователя
                    _this.delete_user.call(_this, jquery_1.default(e.target).attr('id'));
                });
            };
            app.init();
        }
    };
});
