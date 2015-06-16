define([
    'jquery',
    'handlebars'
], function($, Hbs) {

    // Common  Utilities

    (function() {

        $.fn.run = function(template, context) { // rendering partial template
            var target = $(this);
            //target.html(Hbs.partials[template](context || {}));
            target.html(Hbs.compile(Hbs.partials[template])(context || {}));
            return target;
        }


        Hbs.registerHelper("is", function(e) { // "is" Helper Fn
            function t(e, t, n) {
                switch (n) {
                    case "==":
                        return e == t;
                    case "===":
                        return e === t;
                    case "<":
                        return t > e;
                    case "<=":
                        return t >= e;
                    case ">":
                        return e > t;
                    case ">=":
                        return e >= t;
                    case "&&":
                        return e && t;
                    case "||":
                        return e || t;
                    case "!=":
                        return e != t;
                    case "!==":
                        return e !== t;
                    case "typeof":
                        return typeof e === t
                }
                return !1
            }
            var e = Array.prototype.slice.call(arguments),
                n = e.pop(),
                o, r, i;
            if (1 == e.length) return e[0] ? n.fn(this) : n.inverse(this);
            if (2 == e.length) return e[0] == e[1] ? n.fn(this) : n.inverse(this);
            for (o = e.shift(); e.length > 1;) i = e.shift(), r = e.shift(), o = t(o, r, i);
            return o ? n.fn(this) : n.inverse(this)
        });



    })($);

});