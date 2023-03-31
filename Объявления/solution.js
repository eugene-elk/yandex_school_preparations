/**@typedef {import("./solution").RenderWaterfall} RenderWaterfall*/

/**@type {(arr: number[]) => number} */
const findBestColumnIndex = (arr) => {
    let minIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[minIndex]) {
            minIndex = i;
        }
    }
    console.warn("minIndex:", minIndex);
    /*
    arr.forEach((item, index) => {
        if (item < ) minIndex = index;
    });
    */
    return minIndex;
};

/**@type {RenderWaterfall} */
function renderWaterfall(rootNode, columnCount = 3, gap = 20) {

    rootNode.style.display = 'flex';
    rootNode.style.justifyContent = 'space-between';

    const styleTag = document.createElement('style');
    const css = `
        .column :not(:last-child) {
            margin-bottom: ${gap}px;
        }
    `;
    styleTag.appendChild(document.createTextNode(css));
    document.body.appendChild(styleTag);

    const allGapsWidth = gap * (columnCount - 1);
    const columnWidth = (rootNode.offsetWidth - allGapsWidth) / columnCount; 

    const letters = Array.from(rootNode.children); 
    rootNode.innerHTML = '';

    /**@type {HTMLDivElement[]} */
    const columnsElements = new Array(columnCount).fill().map(() => {
        const columnElement = document.createElement('div');
        columnElement.className = 'column';
        columnElement.style.width = `${columnWidth}px`;
        columnElement.style.height = 'max-content';
        
        rootNode.appendChild(columnElement);

        return columnElement;
    });

    console.warn("columnsElements:", columnsElements);

    // Массив высоты колонок
    let columnsHeight = new Array(columnCount).fill(0);
    console.warn("columnsHeight:", columnsHeight);

    while(letters.length) {
        let idx = findBestColumnIndex(columnsHeight);
        columnsElements[idx].appendChild(letters.shift()); 
        console.warn(idx, "begore adding height:", columnsHeight[idx]);
        columnsHeight[idx] = columnsElements[idx].clientHeight;
        console.warn("New height of", idx, ":", columnsElements[idx].offsetHeight);

        console.warn(idx, "after adding height:", columnsHeight[idx]);
        console.warn("columnsHeight:", columnsHeight);
    }
}