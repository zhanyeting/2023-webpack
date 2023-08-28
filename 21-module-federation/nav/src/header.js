function Header() {
    const h1Ele = document.createElement("h1");
    h1Ele.textContent = "这是公共头部";
    h1Ele.style.cssText = "background: gray;"
    return h1Ele;
}

export default Header;