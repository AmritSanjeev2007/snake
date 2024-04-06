export function generateGrid(m,n)
{
    const gridParent = document.getElementById('grid');
    for(let i=0; i<m*n; i++)
    {
        gridParent.appendChild(document.createElement('div')).id = i.toString();
    }

    /** @type {HTMLElement} */
    let root = document.querySelector(':root');
    root.style.setProperty('--columns', m.toString());
}