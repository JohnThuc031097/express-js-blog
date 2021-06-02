import moment from 'moment';

const sum = function (a, b) {
    return a + b;
};

const isEven = function (num) {
    return num % 2 == 0;
};

const json = function (context) {
    return JSON.stringify(context);
};

const compare = function (lvalue, operator, rvalue, options) {
    let operators, result;

    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }

    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = '===';
    }

    operators = {
        equals: function (l, r) {
            return l.equals(r);
        },
        '==': function (l, r) {
            return l == r;
        },
        '===': function (l, r) {
            return l === r;
        },
        '!=': function (l, r) {
            return l != r;
        },
        '!==': function (l, r) {
            return l !== r;
        },
        '<': function (l, r) {
            return l < r;
        },
        '>': function (l, r) {
            return l > r;
        },
        '<=': function (l, r) {
            return l <= r;
        },
        '>=': function (l, r) {
            return l >= r;
        },
        typeof: function (l, r) {
            return typeof l == r;
        },
    };

    if (!operators[operator]) {
        throw new Error(
            "Handlerbars Helper 'compare' doesn't know the operator " +
                operator,
        );
    }

    result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};

const formatDate = function (timestamp) {
    return moment(timestamp).format('DD-MM-yyyy hh:mm:ss');
};

const sortable = function (column, data) {
    let isActive = {
        asc: '',
        desc: '',
    };
    if (data.column === column) {
        isActive[data.type] = 'active';
    }
    return /*html*/ `
        <a href="?_sort&column=${column}&type=asc"
            class="material-icons-outlined ${isActive['asc']}">
            arrow_drop_up
        </a>
        <a href="?_sort&column=${column}&type=desc"
            class="material-icons-outlined ${isActive['desc']}">
            arrow_drop_down
        </a>
    `;
};

export default { sortable, sum, isEven, compare, formatDate, json };
