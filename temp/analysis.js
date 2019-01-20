Vue.component('prices', {
    props: ['prices'],
    template: `
                <div>
                    <h2>Prices per night</h2>
                    <p>{{prices.pricePerNight}}</p>
                    <h2>Total stays</h2>
                    <p>{{prices.stays}}</p>
                </div>
            `
});

Vue.component('introduction', {
    props: ['introduction'],
    template: `
                <div>
                    <h2>Hotel introduction</h2>
                    <p>{{introduction}}</p>
                </div>
            `
});

Vue.component('hotel', {
    data: function(){
        return {
            introduction: "this hotel is very great, please come!!",
                prices: {
                    pricePerNight: 10000,
                    stays: 1
                },
            comments: ["good", "recommended!", "hotel is old"]
        }
    },
    methods: {
        oneMoreNight() {
            // this.prices.pricePerNight *= 0.9;
            this.prices.stays++;
        },
        updateIntroduction(){
            this.introduction += "..updated!";
        }
    },
    template: `
            <div>
                <introduction v-bind:introduction="introduction"></introduction>
                <prices class="prices" v-bind:prices="prices"></prices>
                <button v-on:click="oneMoreNight">Book one more night!</button>
                <button v-on:click="updateIntroduction">Update introduction</button>       
            </div>
            `
});

const vm = new Vue({
    el: '#app'
});