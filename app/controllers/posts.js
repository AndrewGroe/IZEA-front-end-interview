import Controller from '@ember/controller';
import { inject as service } from '@ember/service'

export default Controller.extend({
    ajax: service(),
    actions: {
        getNextPage () {
            return this.get('ajax').request('/posts?_start=0&_limit=10').then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err)
            });
        },
        getPrevPage () {
            return this.get('ajax').request('/posts?_start=0&_limit=10').then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err)
            });
        }
    }
});
