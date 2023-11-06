const myQuerySelector = (selector) => {
  selector = selector.trim().split(" ");
  const subSelectors = [];
  for (let i = 1; i < selector.length; i++) {
    const element = selector[i];
    subSelectors.push(element);
  }
  return myActualQuerySelector(document.body, selector[0], subSelectors, []);
};

const myActualQuerySelector = (
  element,
  mainSelector,
  subSelectors,
  elements
) => {
  for (let i = 0; i < subSelectors.length; i++) {
    const subSelector = subSelectors[i];
    if (element.tagName.toLowerCase() === subSelector) {
      elements.push(element);
    }
  }
  if (!element.children.length) return elements;

  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    if (isChildOfMainSelector(child, mainSelector)) {
        myActualQuerySelector(
            child,
            mainSelector,
            subSelectors,
            elements
          );
    }
  }

  return elements;
};

const isChildOfMainSelector = (child, mainSelector) => {
    while(child.tagName.toLowerCase() !== 'body') {
        if (child.tagName.toLowerCase() === mainSelector) {
            return true;
        }
        child = child.parentElement;
    }
    return false;
} 

console.log(myQuerySelector("div p b ul"));
