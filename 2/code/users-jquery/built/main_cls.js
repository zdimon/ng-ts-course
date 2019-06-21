System.register(["jquery"], function (exports_1, context_1) {
    "use strict";
    var jquery_1, User, App, app;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }
        ],
        execute: function () {
            User = /** @class */ (function () {
                function User() {
                }
                return User;
            }());
            App = /** @class */ (function () {
                // инициализация
                function App() {
                    //начальные данные
                    this.users = [{
                            'username': 'Dima',
                            'email': 'zdimon77@gmail.com',
                            'id': 1
                        }];
                    this.user_list = jquery_1.default('#user_list');
                    this.update();
                }
                // прорисовка
                App.prototype.update = function () {
                    var _this = this;
                    this.user_list.empty();
                    for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
                        var user = _a[_i];
                        //добавим элементы в список
                        var el = "<li>" + user.username + ":" + user.email + "\n      <a id='" + user.id + "' href=\"#\">Delete</a>\n      </li>";
                        this.user_list.append(el);
                    }
                    // подвешиваем событие
                    this.user_list.find("a").on('click', function (e) {
                        // тут будем удалять пользователя
                        _this.delete_user(parseInt(jquery_1.default(e.target).attr('id')));
                    });
                };
                App.prototype.delete_user = function (user_id) {
                    for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
                        var user = _a[_i];
                        if (user.id == user_id) {
                            var idx = this.users.indexOf(user);
                            this.users.splice(idx, 1);
                            this.update();
                        }
                    }
                };
                return App;
            }());
            app = new App();
        }
    };
});
