export function setupClick(element, elements) {
  let link = 'https://apple.com/';

  element.setAttribute('href', link);

  const setLink = (newLink) => {
    link = newLink
    element.setAttribute('href', link);
  };

  elements.forEach(elem => {
    elem.addEventListener('change', (event) => {
      let item = event.target.value;
      setLink(item);
      elem.checked = event.target.value === link
    });
  });
}
