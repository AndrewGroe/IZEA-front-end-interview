/* eslint-disable no-console */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object'

export default Component.extend({
    ajax: service(),
    posts: null,
    user: null,
    selectedPost: null,
    loading: true,
    modal: false,
    currentPage: null,
    fixedPage: computed('currentPage', function () {
        return this.currentPage + 1;
    }),

    init () {
        this._super(...arguments);
        this.getFirstPage();
    },

    getFirstPage () {
        this.set('loading', true);
        return this.get('ajax').request('/posts?_start=0&_limit=10').then((result) => {
            console.log(result);
            this.set('posts', result);
            this.set('currentPage', 0);
            this.set('loading', false);
        }).catch((err) => {
            console.log(err)
        });
    },
    actions: {
        getNextPage () {
            if (this.currentPage < 9) {
                this.set('loading', true);
                const start = (this.currentPage + 1) * 10;
                console.log(start);
                return this.get('ajax').request('/posts?_start=' + start + '&_limit=10').then((result) => {
                    console.log(result);
                    this.set('posts', result);
                    this.set('currentPage', this.currentPage + 1);
                    this.set('loading', false);
                }).catch((err) => {
                    console.log(err);
                });

            }
        },
        getPrevPage () {
            if (this.currentPage > 0) {
                this.set('loading', true);
                const start = (this.currentPage - 1) * 10;
                console.log(start);
                return this.get('ajax').request('/posts?_start=' + start + '&_limit=10').then((result) => {
                    console.log(result);
                    this.set('posts', result);
                    this.set('currentPage', this.currentPage - 1);
                    this.set('loading', false);
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        getUser (index) {
            this.set('loading', true);
            this.set('selectedPost', this.posts[index]);
            return this.get('ajax').request('/users/' + this.selectedPost.userId).then((result) => {
                console.log(result);
                this.set('user', result);
                this.set('modal', true);
                this.set('loading', false);
            }).catch((err) => {
                console.log(err);
            });
        },
        toggleModal () {
            this.set('modal', !this.modal)
        }
    }

});
