export function HomeList(num) {
    let str = "<ul>";
    for (let i=1; i<num; i++){
        str += "<li>item"+i+"</li>";
    }
    str += "</ul>";
    return str;
} 