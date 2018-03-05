
/**
* Get changes
* @param {Object} original
* @param {Object} updated
*/
export function getChanges(original, updated = {}) {
  const toCreate = [];
  const toDelete = [];
  const toUpdate = [];

  // Create new object for tracking
  // what needs to get deleted
  const clonedOriginal =  Object.assign({}, original);

  for (const [key, value] of Object.entries(updated)) {

    // If item is in original list
    if (original.hasOwnProperty(key)) {

      // Remove item from clonsed original list
      delete clonedOriginal[key]

      // If item that was in original list
      // is not the same as the original
      if (key !== value) {

        // Add to list of things to be updated
        toUpdate.push({ key, value });
      }

    // If item is not original list
    } else {

      // Add to list of things to be created
      toCreate.push({ key, value });
    }
  }

  // For every item left in cloned original list
  // after deleting all updated list items
  // found in origina list
  for (const [key, value] of Object.entries(clonedOriginal)) {

    // Add to list of things to be deleted
    toDelete.push({ key, value });
  }

  return { toCreate, toDelete, toUpdate };
}

