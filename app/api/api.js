import _ from "lodash";

//Check if base url exists 
if(!window.ISD_BASE_URL ||  window.ISD_BASE_URL == '') {
  window.ISD_BASE_URL = 'http://erpapp/';
}

//JSON string return an object contain objects, we need to covert them to array
export function convertObjectsToArray(objects) {
  let objectsArr = [];
  Object.keys(objects).forEach((objectId) => {
    objectsArr.push({
      id: objectId,
      ...objects[objectId]
    })
  });
  return objectsArr;
}
export function convertArrayObjectToObject(objectArr) {
  let objects = {};
  if(objectArr.length) {
    objectArr.forEach((object) => {
      objects[object.id] = object;
    })
  }
  return objects;
}
export function getDefaultAppProps(defaultJsonString) {  
  return {
   
  };
}
//Sort an array by property
export const sortArrayByProp = (prop, unsortArr) => {
  var sortedArray = unsortArr.sort((a, b) => {
    //Sort by prop
    if(a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
      return a[prop] - b[prop];
    }
    //Try to sort by id
    if(a.hasOwnProperty('id') && b.hasOwnProperty('id')) {
      return a['id'] - b['id'];
    }
    //Will not sort invalid format array
    return 0;
  });
  return sortedArray;
};
/**
 * Server Side React Table
 * @param {object} data 
 * @param {object} pageSize 
 * @param {object} page 
 * @param {object} sorted 
 * @param {object} filtered 
 */
export const requestData = (data, pageSize, page, sorted, filtered) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = data;
    
    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          return (row[nextFilter.id] + "").includes(nextFilter.value);
        });
      }, filteredData);
    }
    // You can also use the sorting in your request, but again, you are responsible for applying it.
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === "string"
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };
    return res;
};