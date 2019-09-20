import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], searchText?: string, searchFields: string[] = ['_description', 'description']): any[] {
    // IF NO LIST DATA
    if (!list || !list.length) { return []; }

    // IF NO SEARCHDATA
    if (!searchText) { return list; }

    // CONVERT TO LOWER CASE
    searchText = searchText.toLowerCase().trim();

    // Assuming entire array has same keys in its objects, get an array of keys.
    const ItemKeys = Object.keys(list[0]);
    if (ItemKeys.length <= 0) {
      return list;
    }

    // Traverse the array of keys and remove a key value pair with key as 'id'
    const searchKeys = ItemKeys.filter(v => {
      return searchFields.indexOf(v) > -1;
    });
    if (searchKeys.length <= 0) {
      return list;
    }

    // Logic to go through all the objects and find the objects whose value matches uppercased filter.
    list = (list.filter((v) => v && searchKeys.some(
      (k) => v[k] === undefined || v[k] === null ? false : v[k].toString().toLowerCase().indexOf(searchText) >= 0))
    );
    return list;
  }

}
