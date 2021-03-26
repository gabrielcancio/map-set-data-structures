import assert from 'assert';

function mapAPI() {
  const itemObj = { name: 'gabrielcancio' };
  const itemMap = new Map([
    ['name', 'gabrielcancio']
  ]);

  // Validating the key birthDay in Object
  itemObj.birthDay = '14/12/2001';
  assert.deepStrictEqual(itemObj.birthDay, '14/12/2001');

  // Validating the key birthDay in Map
  itemMap.set('birthDay', '14/12/2001');
  assert.deepStrictEqual(itemMap.get('birthDay'),'14/12/2001');

  // Validating if the property birthDay exists
  assert.ok(itemObj.hasOwnProperty('birthDay'));
  assert.ok(itemMap.has('birthDay'));

  // Deleting the birthday key
  delete itemObj.birthDay;
  assert.ok(!itemObj.hasOwnProperty('birthDay'));

  itemMap.delete('birthDay');
  assert.ok(!itemMap.has('birthDay'));

  // Getting the length
  assert.deepStrictEqual(Object.keys(itemObj).length, 1);
  assert.deepStrictEqual(itemMap.size, 1);

  // Getting the entries
  assert.deepStrictEqual(Object.entries(itemObj), [['name', 'gabrielcancio']]);
  assert.deepStrictEqual([...itemMap], [['name', 'gabrielcancio']]);

  // Getting the the entries using for of
  for (const [key, value] of Object.entries(itemObj)) {
    assert.deepStrictEqual([key, value], ['name', 'gabrielcancio']);
  }

  for (const [key, value] of itemMap) {
    assert.deepStrictEqual([key, value], ['name', 'gabrielcancio']);
  }

  // Deleting all the keys
  Object.keys(itemObj).map(key => delete itemObj[key]);
  assert.deepStrictEqual(Object.keys(itemObj), []);

  itemMap.clear();
  assert.deepStrictEqual([...itemMap.keys()], []);


  // console.log(itemObj);
  // console.log(itemMap);
}

export default mapAPI;