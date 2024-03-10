import React from 'react';

function Menu({ items, onItemClick }) {
    return (
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="py-1 px-4 hover:bg-gray-300 cursor-pointer" onClick={() => onItemClick(item)}>
                    {item.label}
                </li>
            ))}
        </ul>
    );
}

export default Menu;
