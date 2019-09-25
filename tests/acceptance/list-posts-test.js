import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | list posts', function (hooks) {
  setupApplicationTest(hooks);

  // Test homepage redirect
  test('should show posts as home page', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/posts', 'should redirect automatically');
  });


});
