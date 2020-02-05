Vue.component('product', {
    props: {
        size: {
            size:Number,
            required: true
        }
    },
    template: `<div class="product">

            <div class="product-image">
                <img :src="image"> <!-- v-bind can be shortened as :src -->
            </div>
            
            <div class="product-info">
                <h2>{{brand}} {{ products }}</h2> 
                <p>{{sale}} this is from computed property</p>
                <p v-if = "store < 10">8 remaining</p>
                <p v-else-if = "store >= 10 && store <= 20">Almost sold out</p>
                <p v-else>20% discount for 2</p>
                <p :class="{inStock: !inStock}">Out of Stock</p>
                <ul>
                    <li v-for="(bt, index) in bootTypes" 
                    :key = "bt.amount"
                    :@mouseover="updateIndex(index)">{{bt.type}}</li>
                </ul>

                <product-details :details = "details"></product-details>
                
                <p>Size of the boots is {{size}}</p>
                <p>{{description}}</p>
                <p v-show = "storeEmpty"> Store is empty please return later!</p>

                <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{disabledButton: !inStock}">Add to Cart</button>
                <button @click="remove">Reduce Product</button>
                

                <button @click="addToCart">Add to Cart</button>

                <div v-for = "sb in styleBind" 
                    :key="sb.amount"
                    class = "color-box"
                    :style="{backgroundColor: sb.color}"> 
                    <p>{{sb.color}}</p>
                </div>
            </div>
            <div class="link">
                <a v-bind:href="moreBoots">More Boots</a>
            </div>
        </div>`,
        data(){
            return { 
                products: 'Boots',
                brand: 'seniStyle',
                description: 'These are the new style Boots!',
                image: './assets/boots.jpg',
                moreBoots: 'https://es.aliexpress.com/item/32684886523.html',
                onSale: true,
                inStock: false,
                selectedProduct: 0,
                store: 10,
                storeEmpty: true,
                bootTypes: [{type:"Leather", amount: 8}, {type:"Nike", amount: 6}, {type:"Cotton", amount: 0}],
                styleBind: [{color:"blue", amount: 8}, {color:"green", amount: 6}, {color:"brown", amount: 0}],
                details: ['80% cotton', '20% polyester', 'Gender-neutral']
            }
        },
        methods:{
            addToCart(){
               this.$emit('add-to-cart', this.bootTypes[this.selectedProduct].amount)
            },
            remove(){
                this.$emit('remove-from-cart', this.bootTypes[this.selectedProduct].amount)
            },
            updateIndex(index){
                this.selectedProduct = index
            }
        },
        computed:{
            sale(){
                if(this.onSale){
                    return this.brand + ' ' + this.products
                    }
            }
        }


})
Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `<ul>
              <li v-for="detail in details">{{detail}}</li>
            </ul>`
})
var app = new Vue({
    el: '#app',
    data: {
        size: 34,
        cart: [],
        styleObject: {
            fontSize: '13px',
            border: '1px solid brown',
            width: '80px'
        },
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        },
        removeProduct(id){
            for(var i = this.cart.length-1; i>=0; i--){
                if(this.cart[i] === id){
                    this.cart.splice(i, 1)
                }
        }
            }
    }
})
