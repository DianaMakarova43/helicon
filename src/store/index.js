import { createStore } from 'vuex'

export default createStore({
    state: {
        liters: {
            show: false,
            selected: '34 литра с ТЭНом',
            items: [
                {
                    name: '34 литра с ТЭНом',
                    img: './assets/images/ten-20.png',
                    price: 11000,
                    selected: true,
                },
                {
                    name: '50 литров с ТЭНом',
                    img: './assets/images/ten-50.png',
                    price: 23000,
                    selected: false
                }
            ]
        },
        dops: [
            {
                name: 'Набор для копчения',
                oldPrice: 7990,
                newPrice: 7990,
                img: './assets/images/dop_1-mini.png',
                postfix: 'kopch',
                selected: false
            },
            {
                name: 'Жестяные банки (10 шт.)',
                oldPrice: 7990,
                newPrice: 7990,
                img: './assets/images/dop_2-mini.png',
                postfix: 'banki',
                selected: false
            },
            {
                name: 'Защитные зажимы',
                oldPrice: 7990,
                newPrice: 7990,
                img: './assets/images/dop_3-mini.png',
                postfix: 'zajim',
                selected: false
            },
            {
                name: 'Насадка для самогоноварения',
                oldPrice: 7990,
                newPrice: 7990,
                img: './assets/images/dop_4-mini.png',
                postfix: 'nasad',
                selected: false
            },
        ],
        kredit: false,
        dialogVisible: false
    },
    getters: {
        totalPrice(state) {
            return state.liters.items.reduce((acc, item) => {
                if (item.selected) {
                    return item.price + acc
                }
                return acc
            }, 0) +
                state.dops.reduce((acc, item) => {
                    if (item.selected) {
                        return item.newPrice + acc
                    }
                    return acc
                }, 0)
        }
    },
    mutations: {
        selectedCheckbox(state, index) {
            state.dops[index].selected = !state.dops[index].selected;
        },
        buyByKredit(state) {
            state.kredit = !state.kredit;
        },
        selectedLiters(state, index) {
            state.liters.selected = state.liters.items[index].name;
            state.liters.show = !state.liters.show;
            for (let i = 0; i < state.liters.items.length; i++) {
                state.liters.items[i].selected = false
            }
            state.liters.items[index].selected = true
        }
    },
    actions: {
        selectedCheckbox({ commit }, index) {
            commit('selectedCheckbox', index);
        },
        totalPrice({ commit }, index) {
            commit('totalPrice', index);
        },
        buyByKredit({ commit }, index) {
            commit('buyByKredit', index)
        },
        selectedLiters({ commit }, index) {
            commit('selectedLiters', index);
        }
    },
    modules: {
    }
})
