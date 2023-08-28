export default function HotBox() {
    const hotBox = document.getElementById('hotBox');
    const addBoxBtn = document.createElement('button');
    addBoxBtn.textContent = '添加块查看热替换功能56';
    addBoxBtn.addEventListener('click', () => {
        const box = document.createElement('div');
        box.classList.add('square');
        hotBox.appendChild(box);
    });
    hotBox.appendChild(addBoxBtn);
}
