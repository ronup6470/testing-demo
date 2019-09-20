import { SearchPipe } from './search-pipe.pipe';

const FIELD_LIST = ['id', 'name'];

describe('SearchPipe', () => {
  const LIST = [
    { id: 1, name: 'admin Role' },
    { id: 2, name: 'user Role' },
    { id: 3, name: 'client Role' },
  ];
  const search = 'user';
  const pipe = new SearchPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if list provided is empty', () => {
    const initList = [];

    const filteredList = pipe.transform(initList, 'abc');

    expect(filteredList).toEqual(initList);
  });

  it('should return empty array if no list provided', () => {
    const initList = null;

    const filteredList = pipe.transform(initList, 'abc');

    expect(filteredList.length).toBe([].length);
  });

  it('should return initial array if no search text provided', () => {
    const initList = LIST;

    const filteredList = pipe.transform(initList, '');

    expect(filteredList).toEqual(initList);
  });

  it('should return list if list item is empty object', () => {
    const list = [{}, {}];

    const filteredList = pipe.transform(list, 'value1');

    expect(filteredList.length).toBe(list.length);
  });

  it('should return list if list item is not having searchKey', () => {
    const list = [
      { unknownKey1: 'value1', unknownKey2: 'value2', unknownKey3: 'value3' }
    ];

    const filteredList = pipe.transform(list, 'value1', FIELD_LIST);

    expect(filteredList.length).toBe(list.length);
  });

  it('should return empty array if no search result found for "ABC"', () => {
    const filteredList = pipe.transform(LIST, 'ABC', FIELD_LIST);

    expect(filteredList).toEqual([]);
  });

  it('should return filterd array if search result found for "user"', () => {
    const filteredList = pipe.transform(LIST, 'user', FIELD_LIST);
    let flag = false;

    filteredList.forEach(element => {
      if (JSON.stringify(element).toLowerCase().indexOf(search.toLowerCase()) >= 0) {
        flag = true;
      }
    });

    expect(flag).toBeTruthy();
  });

  it('should return null if list items having null value', () => {
    const list = [{ id: null, name: null }, { id1: null, name: null }, { unknownKey1: null }];

    const filteredList = pipe.transform(list, search, FIELD_LIST);

    expect(filteredList.length).toBeLessThanOrEqual(0);
  });
});
