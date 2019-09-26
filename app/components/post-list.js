import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    ajax: service(),
    loading: true,
    posts: null,
    currentPage: null,
    init () {
        this._super(...arguments);
        this.getFirstPage();
    },
    getFirstPage () {
        return this.get('ajax').request('/posts?_start=0&_limit=10').then((result) => {
            console.log(result);
            this.set('posts', result);
        }).catch((err) => {
            console.log(err)
        });
    },
    getNextPage (currentPage) {
        return this.get('ajax').request('/posts?_start=0&_limit=10').then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err)
        });
    },
    getPrevPage (currentPage) {
        return this.get('ajax').request('/posts?_start=0&_limit=10').then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err)
        });
    },
    getUser (userId) {
        return this.get('ajax').request('/users/' + userId).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err)
        });
    }

});
