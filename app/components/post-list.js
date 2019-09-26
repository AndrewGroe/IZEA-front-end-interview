import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    ajax: service(),
    posts: null,
    user: null,
    currentPage: null,
    selectedPost: null,
    loading: true,
    modal: false,

    init () {
        this._super(...arguments);
        this.getFirstPage();
    },

    getFirstPage () {
        return this.get('ajax').request('/posts?_start=0&_limit=10').then((result) => {
            console.log(result);
            this.set('posts', result);
            this.set('currentPage', 0);
        }).catch((err) => {
            console.log(err)
        });
    },
    actions: {
        getNextPage () {
            if (this.currentPage < 9) {
                const start = (this.currentPage + 1) * 10;
                console.log(start);
                return this.get('ajax').request('/posts?_start=' + start + '&_limit=10').then((result) => {
                    console.log(result);
                    this.set('posts', result);
                    this.set('currentPage', this.currentPage + 1);
                }).catch((err) => {
                    console.log(err);
                });

            }
        },
        getPrevPage () {
            if (this.currentPage > 0) {
                const start = (this.currentPage - 1) * 10;
                console.log(start);
                return this.get('ajax').request('/posts?_start=' + start + '&_limit=10').then((result) => {
                    console.log(result);
                    this.set('posts', result);
                    this.set('currentPage', this.currentPage - 1);
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        getUser (index) {
            this.set('selectedPost', this.posts[index]);
            return this.get('ajax').request('/users/' + this.selectedPost.userId).then((result) => {
                console.log(result);
                this.set('user', result);
                this.set('modal', true);
            }).catch((err) => {
                console.log(err);
            });
        },
        toggleModal () {
            this.set('modal', !this.modal)
        }
    }

});
