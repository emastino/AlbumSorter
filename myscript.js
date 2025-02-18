


const list = document.querySelector('.sortable-list');
let draggingItem = null;
list.addEventListener('dragstart', (e) => {
    draggingItem = e.target;
    e.target.classList.add('dragging');
});


list.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.sortable-item')
        .forEach(item => item.classList.remove('over'));
    draggingItem = null;
});


list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingOverItem = getDragAfterElement(list, e.clientY);
    document.querySelectorAll('.sortable-item').forEach
        (item => item.classList.remove('over'));
    if (draggingOverItem) {
        draggingOverItem.classList.add('over');
        list.insertBefore(draggingItem, draggingOverItem);
    } else {
        list.appendChild(draggingItem); 
    }
});


function getDragAfterElement(container, y) {
    
    const draggableElements = [...container.querySelectorAll
        ('.sortable-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

        