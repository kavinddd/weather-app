
export default function createElementWithClassName(type, className) {
    const newElement = document.createElement(type);
    newElement.className = className;
    return newElement;
}