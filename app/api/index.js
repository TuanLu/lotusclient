
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
  return {};
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