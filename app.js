var List = Vue.component('list', {
    template: '#product-list',
    data: function() {
        return {products: books};
    }
});

var Add = Vue.component('add', {
    template: '#add-product',
    data: function () {
        var booktemp = {
            key: "",
            name: "",
            description: "",
            price: 0
        };
        return {product: booktemp};
    },
    methods: {
        add: function() {
            console.log(books.length);
            console.log(books.length);
            addBook(this.product);
            router.push('/list');
        },
        cancel: function() {
            router.push('/list');
        }
    },
});

var View = Vue.component('view-product', {
    template: '#view-product',
    data: function() {
        return { product: books[getBook(this.$route.params.product_id)]
        };
    },
});

var Edit = Vue.component('edit', {
    template: '#edit-product',
    data: function() {
        var booklink = books[getBook(this.$route.params.product_id)];
        var booktemp = {
            key: booklink.key,
            name: booklink.name,
            description: booklink.description,
            price: booklink.price
        }
        return { product: booktemp }
    },
    methods: {
        update: function() {
            var product_key = this.$route.params.product_id
            var booklink = books[getBook(product_key)];
            editBook(product_key, booklink);
            router.push('/list');
        },
        cancel: function() {
            router.push('/list');
        }
    }
});


var Delete = Vue.component('delete', {
    template: '#delete-product',
    data: function() {
        return { product: books[getBook(this.$route.params.product_id)] };
    },
    methods: {
        deleteProduct: function () {
            var product_key = this.$route.params.product_id;
            delBook(product_key);
            router.push('/list');
        },
        cancel: function () {
            router.push('/list');
        }
    }
});

var router = new VueRouter({
    routes: [
        { path: '/list', component: List },
        { path: '/add', component: Add },
        { path: '/view/:product_id', component: View },
        { path: '/edit/:product_id', component: Edit },
        { path: '/delete/:product_id', component: Delete },
    ]
});

var vm = new Vue({
    el: '#app',
    router:router,
});

router.push('/list');