import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | post-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it shows post titles', async function (assert) {
    let posts = [{
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
    }];
    this.set('posts', posts)
    await render(hbs`<PostList />`);

    assert.equal(this.element.querySelector('.post-title').textContent.trim(), posts[0].title, 'Post title is shown');
  });

  test('it shows a modal with post & user data', async function (assert) {
    let selectedPost = {
      body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      userId: 1,
    };
    let user = {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona"
      },
      address: {
        city: "Gwenborough"
      }
    };
    this.set('selectedPost', selectedPost);
    this.set('user', user);

    await render(hbs`<PostList />`);
    assert.notOk(this.element.querySelector('.user-info'), 'Modal is hidden before click');
    await click('.btn-expand');

    assert.ok(this.element.querySelector('.user-info'), 'Shows user info in modal');
    assert.equal(this.element.querySelector('.modal-post-title').textContent.trim(), selectedPost.title, 'Shows correct post in modal');
  });

  test('it paginates', async function (assert) {
    let firstPage = [{
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
    }];
    this.set('posts', firstPage);
    await render(hbs`<PostList />`);
    assert.equal(this.element.querySelector('.post-title').textContent.trim(), firstPage[0].title, 'First Page shows correct posts');
    await click('.btn-next-page');
    let secondPage = [{
      title: "et ea vero quia laudantium autem"
    }];
    this.set('posts', secondPage);
    assert.equal(this.element.querySelector('.post-title').textContent.trim(), secondPage[0].title, 'Second Page shows correct posts');
  })
});
