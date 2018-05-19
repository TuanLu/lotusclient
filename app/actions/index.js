import actionTypes from 'ACTION_TYPES'

export const startApp = (defaultProps) => ({type: actionTypes.START_APP, defaultProps})
/**
 * Active container, row, column or any elements
 * @param {object} activeData 
 */
export const activeElement = activeData => {
  return {
    type: actionTypes.ACTIVE_ELEMENT,
    activeData
  }
}
export const fectchObjects = (objects) => {
  return {
    type: actionTypes.FETCH_OBJECTS,
    objects
  }
}
export const fectchDesignarea = (design) => {
  return {
    type: actionTypes.FETCH_DESIGNAREA,
    design
  }
}
export const updateObject = (objectId, updateData) => {
  return {
    type: actionTypes.UPDATE_OBJECT,
    objectId,
    updateData
  }
}
export const updateAllObjects = (updateData) => {
  return {
    type: actionTypes.UPDATE_ALL_OBJECTS,
    updateData
  }
}
export const updateDesign = (updateData) => {
  return {
    type: actionTypes.UPDATE_DESIGN,
    updateData
  }
}
export const updateUI = (updateData) => {
  return {
    type: actionTypes.UPDATE_UI,
    updateData
  }
}
export const updateBackgroundDesign = (updateData) => {
  return {
    type: actionTypes.UPDATE_BACKGROUND_DESIGN,
    updateData
  }
}
export const startRemoveObject = objectId => {
  return {
    type: actionTypes.START_REMOVE_OBJECT,
    objectId
  }
}
export const removeObject = (objectId) => {
  return {
    type: actionTypes.REMOVE_OBJECT,
    objectId
  }
}
export const addObject = (object, columnId) => {
  return {
    type: actionTypes.ADD_OBJECT,
    object,
    columnId
  }
}
export const switchMode = mode => {
  return {
    type: actionTypes.SWITCH_MODE,
    mode
  }
}
export const toggleSave = (open) => {
  return {
    type: actionTypes.TOGGLE_SAVE,
    open
  }
}
export const toggleTemplate = (open) => {
  return {
    type: actionTypes.TOGGLE_TEMPLATES,
    open
  }
}
export const showLoadingBar = show => {
  return {
    type: actionTypes.TOGGLE_LOADING_BAR,
    show: show
  }
}
export const toggleSnackbar = (open, message) => {
  return {
    type: actionTypes.TOGGLE_SNACKBAR,
    open,
    message
  }
}
export const toggleAlert = (open, message) => {
  return {
    type: actionTypes.TOGGLE_ALERT,
    open,
    message
  }
}
export const showColorpicker = (show, colorType, color) => {
  return {
    type: actionTypes.SHOW_COLORPICKER,
    show,
    colorType,
    color
  }
}
export const changeTemplate = (objects, backgroundDesign) => {
  return {
    type: actionTypes.CHANGE_TEMPLATE,
    objects,
    backgroundDesign
  }
}
/**
 * 
 * @param {object} rowData 
 */
export const addNewRow = (rowData, fromRowId) => {
  return {
    type: actionTypes.NEW_ROW,
    rowData,
    fromRowId
  }
}
/**
 * 
 * @param {object} data
 */
export const moveElementToColumn = (data) => {
  return {
    type: actionTypes.MOVE_OBJECT_TO_COLUMN,
    data
  }
}

/**
 * Drag and reorder object
 * @param {object} sortData 
 */

export const sortObject = sortData => ({
  type: actionTypes.SORT_OBJECT,
  sortData
});
/**
 * 
 * @param {object} elementInfo 
 * @param {object} updateData 
 */
export const updateBackgroundStyle = (elementInfo, updateData) => ({
  type: actionTypes.UPDATE_BACKGROUND_STYLE,
  elementInfo,
  updateData
});
/**
 * @param {string} objectId 
 */
export const duplicateObject = (objectId, newObjectId) => ({
  type: actionTypes.DUPLICATE_OBJECT,
  objectId,
  newObjectId
});
/**
 * User can re-order row in a container
 * @param {object} sortData 
 */
export const sortRow = sortData => ({
  type: actionTypes.SORT_ROW,
  sortData
});
export const removeRow = (rowId, containerId) => {
  return {
    type: actionTypes.REMOVE_ROW,
    rowId,
    containerId
  }
}
/**
 * Update column style, column setting
 * @param {string} columnId 
 * @param {object} updateData 
 */
export const updateColumn = (columnId, updateData, property) => ({
  type: actionTypes.UPDATE_COLUMN,
  columnId,
  updateData,
  property
})
/**
 * update row properties
 * @param {string} rowId 
 * @param {object} updateData 
 */
export const updateRow = (rowId, updateData) => ({
  type: actionTypes.UPDATE_ROW,
  rowId,
  updateData
})
/**
 * 
 * @param {string} id 
 * @param {string} spacingType => row || container
 * @param {string} position => top || bottom
 * @param {number} height 
 */
export const updateFakeSpacing = (id, spacingType, position, height) => ({
  type: actionTypes.UPDATE_FAKESPACING,
  id,
  spacingType, 
  position,
  height
});
export const switchResponsiveMode = mode => ({
  type: actionTypes.SWITCH_RESPONSIVE_MODE,
  mode
});
/**
 * 
 * @param {object} column 
 * @param {string} rowId 
 */
export const addNewColumn = (column, rowId) => ({
  type: actionTypes.NEW_COLUMN,
  column,
  rowId
});
export const removeColumn = (columnId, rowId) => ({
  type: actionTypes.REMOVE_COLUMN,
  columnId,
  rowId
})
/**
 * @param {string} containerId 
 * @param {object} updateData 
 */
export const updateContainer = (containerId, updateData) => ({
  type: actionTypes.UPDATE_CONTAINER,
  containerId,
  updateData
})
/**
 * @param {object} containerData
 * @param {string} fromContainerId
 */
export const  addNewContainer = (containerData, fromContainerId) => ({
  type: actionTypes.NEW_CONTAINER,
  containerData,
  fromContainerId
});

export const removeContainer = containerId => ({
  type: actionTypes.REMOVE_CONTAINER,
  containerId
})
/**
 * User can re-order column in a row
 * @param {object} sortData 
 */
export const sortColumn = sortData => ({
  type: actionTypes.SORT_COLUMN,
  sortData
});
/**
 * @param {columnId} string
 * @param {rowId} string
 * @param {uiInfo} ui resizable object
 */
export const resizeColumn = (columnId, rowId, updateData) => ({
  type: actionTypes.RESIZE_COLUMN,
  columnId,
  rowId, 
  updateData
})
/**
 * @param {columId} string
 * @param {rowId} string
 * @param {extraInfo} object
 */
export const duplicateColumn = (columnId, rowId, extraInfo) => ({
  type: actionTypes.DUPLICATE_COLUMN,
  columnId,
  rowId,
  extraInfo
})
/**
 * @param {importData} object
 */
export const importDesign = (importData) => ({
  type: actionTypes.IMPORT_DESIGN,
  importData
})
/**
 * @param {string} objectId 
 * @param {object} menuData 
 */
export const addMenuItem = (objectId, menuData) => ({
  type: actionTypes.ADD_MENU_ITEM,
  menuData,
  objectId
})
/**
 * @param {string} objectId 
 * @param {object} menuData 
 */
export const removeMenuItem = (objectId, menuData) => ({
  type: actionTypes.REMOVE_MENU_ITEM,
  menuData,
  objectId
})
/**
 * 
 * @param {string} property //containers, rows, columns, elements
 * @param {string} id 
 * @param {object} updateData 
 */
export const updateStateData = (property, id, updateData) => ({
  type: actionTypes.UPDATE_STATE_DATA,
  id, 
  updateData,
  property
});
/**
 * Resize window action in view MODE, auto change the fontSize of text or button
 */
export const resizeWindow = (windowWidth) => ({
  type: actionTypes.RESIZE_WINDOW,
  windowWidth
});
/**
 * 
 * @param {string} productModal, productList
 * @param {object} updateData 
 */
export const updateProductData = (updateData) => ({
  type: actionTypes.UPDATE_PRODUCT_STATE,
  updateData,
});
/**
 * 
 * @param {boolean} confirm 
 */
export const saveDesignNow = (confirm) => ({
  type: actionTypes.SAVE_DESIGN_NOW,
  confirm
});
/**
 * 
 * @param {string} postModal, postList
 * @param {object} updateData 
 */
export const updateBlogData = (updateData) => ({
  type: actionTypes.UPDATE_BLOG_STATE,
  updateData,
});
/**
 * @param {string} fromContainerId 
 * @param {object} containerData 
 */
export const tryImportContainer = (fromContainerId, containerData) => ({
  type: actionTypes.IMPORT_CONTAINER,
  containerData,
  fromContainerId
});
/**
 * @param {string} fromContainerId 
 * @param {string} direction 
 */
export const moveContainerUpOrDown = (fromContainerId, direction) => ({
  type: actionTypes.MOVE_CONTAINER_UP,
  fromContainerId,
  direction
});
/**
 * @param {string} rowId 
 * @param {string} columnId 
 * @param {string} direction 
 */
export const changeColumnOrder = (rowId, columnId, direction) => ({
  type: actionTypes.CHANGE_COLUMN_ORDER,
  rowId,
  columnId,
  direction
});
/**
 * @param {string} columnId 
 * @param {string} id 
 * @param {string} direction 
 */
export const changeElementOrder = (columnId, id, direction) => ({
  type: actionTypes.CHANGE_ELEMENT_ORDER,
  columnId,
  id,
  direction
});
/**
 * 
 * @param {string} code 
 */
export const switchLanguage = code => ({
  type: actionTypes.SWITCH_LANGUAGE,
  code
})