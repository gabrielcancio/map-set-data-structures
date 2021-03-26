import assert from 'assert';
import faker from 'faker';

function setAPI() {
  const MAX_ITEMS = 10;
  const EVEN_MULTIPLE = 2;

  const generateCar = (mainDb, replicationDb) => {
    for (let index = 0; index < MAX_ITEMS; index++) {
      const car = {
        name: faker.vehicle.model(),
        releaseYear: faker.date.past().getFullYear(),
        available: true,
        gasAvailable: true
      }

      mainDb.add(car);

      if(!replicationDb) continue;
      if(index % EVEN_MULTIPLE !== 0) continue;

      replicationDb.add(car);
    }

    return mainDb;
  }

  const carsDb1 = generateCar(new Set());
  const carsDb2 = generateCar(new Set(), carsDb1);

  assert.deepStrictEqual(carsDb2.size, MAX_ITEMS);
  assert.deepStrictEqual(carsDb1.size, MAX_ITEMS + (MAX_ITEMS / EVEN_MULTIPLE));

  const replications = new Set([...carsDb1].filter(car => carsDb2.has(car)));
  assert.deepStrictEqual(replications.size, (MAX_ITEMS / EVEN_MULTIPLE));

  // Unique elements from db1
  const uniqueFromDb1 = new Set([...carsDb1].filter(car => !carsDb2.has(car)));
  assert.deepStrictEqual(uniqueFromDb1.size, MAX_ITEMS);

  // Unique elements from db2
  const uniqueFromDb2 = new Set([...carsDb2].filter(car => !carsDb1.has(car)));
  assert.deepStrictEqual(uniqueFromDb2.size, (MAX_ITEMS / EVEN_MULTIPLE));

  // The Set structure do not admit duplicate values
  const allDatabseWithoutReplications = new Set([...carsDb1, ...carsDb2]); // Catching all unique values from two database
  assert.deepStrictEqual(allDatabseWithoutReplications.size, MAX_ITEMS * 2);

  for(const item of carsDb1) carsDb2.add(item);
  assert.deepStrictEqual(allDatabseWithoutReplications.size, MAX_ITEMS * 2);

  console.log('Replicated data', replications.size);
  console.log('unique items on db1 that is not included in db2', uniqueFromDb1.size);
  console.log('unique items on db2 that is not included in db1', uniqueFromDb1.size);
  console.log('unique items on all dbs', allDatabseWithoutReplications.size);
}

export default setAPI;