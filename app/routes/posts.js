import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
    ajax: service(),
    model () {
        return this.get('ajax').request('/posts?_start=0&_limit=10').then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err)
        });
    }
});
