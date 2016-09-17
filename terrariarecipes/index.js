document.addEventListener("DOMContentLoaded", function() {
  
  const selectSearchType = document.getElementById('searchType');
  const inputItemName = document.getElementById('itemName');
  const checkboxIsPerfect = document.getElementById('isPerfect');
  const recipesCount = document.querySelector('#recipesCount span');
  const recipes = document.getElementById('recipes');
  window.jsrender.templates({
    itemsRender: document.getElementById('itemsTmpl').innerHTML
  });
  const itemsRender = window.jsrender.render.itemsRender;
  
  function getMatcher(query) {
    if (checkboxIsPerfect.checked) {
      return function(s) {
        return s === query;
      };
    } else {
      return function(s) {
        return s.indexOf(query) != -1;
      };
    }
  }
  
  function searchByMaterial() {
    const query = inputItemName.value.toLowerCase();
    if (query === '') return [];
    const result = [];
    const matcher = getMatcher(query);
    for (const item of items) {
      for (const recipe of item.recipes) {
        if (recipe.materials) {
          for (const material in recipe._materials) {
            if (matcher(material)) {
              result.push(item);
              break;
            }
          }
        } else if (recipe.other) {
          if (matcher(recipe._other)) {
            result.push(item);
          }
        } else if (recipe._buy) {
          if (matcher('buy from the ' + recipe.buy)) {
            result.push(item);
          }
        }
      }
    }
    return result;
  }
  
  function searchByName() {
    const query = inputItemName.value.toLowerCase();
    if (query === '') return [];
    const result = [];
    const matcher = getMatcher(query);
    for (const item of items) {
      if (matcher(item._name)) {
        result.push(item);
      }
    }
    return result;
  }
  
  function searchByCategory() {
    const query = inputItemName.value.toLowerCase();
    if (query === '') return [];
    const result = [];
    const matcher = getMatcher(query);
    for (const item of items) {
      if (item.status && item.status.category) {
        for (const category of item.status.category) {
          if (matcher(category)) {
            result.push(item);
          }
        }
      }
    }
    return result;
  }
  
  function searchByFurniture() {
    const query = inputItemName.value.toLowerCase();
    if (query === '') return [];
    const result = [];
    const matcher = getMatcher(query);
    for (const item of items) {
      for (const recipe of item.recipes) {
        if (recipe.furnitures) {
          for (const furniture of recipe._furnitures) {
            if (matcher(furniture)) {
              result.push(item);
              break;
            }
          }
        }
      }
    }
    return result;
  }
  
  const searchers = {
    itemName: searchByName,
    material: searchByMaterial,
    category: searchByCategory,
    furniture: searchByFurniture
  };
  
  function search() {
    const items = searchers[selectSearchType.value]();
    recipes.innerHTML = itemsRender(items);
    recipesCount.innerText = items.length;
  }
  inputItemName.addEventListener('keyup', search);
  selectSearchType.addEventListener('change', search);
  checkboxIsPerfect.addEventListener('change', search);
  
  recipes.addEventListener('click', function(e) {
    if (e.target.tagName === 'U') {
      inputItemName.value = e.target.innerText;
      if (e.target.parentNode.className === 'item-categories') {
        selectSearchType.value = 'category';
      }
      search();
    }
  });
});