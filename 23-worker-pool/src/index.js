import _ from 'lodash';
import $ from 'jquery';
import bizcharts from 'bizcharts';
import {Axis, ChartView, ComponentModel, ComponentView, List,} from 'echarts';
console.log("lodash ==== ", _.join(['hello', "work", "pool"], "  "));
console.log("jquery ==== ",$);
console.log("bizcharts ==== ", bizcharts);
console.log("echarts ==== ", Axis, ChartView, ComponentModel, ComponentView, List,);

class Person {
    constructor(
        name="admin", 
        age=0, 
        location="beijing", 
        score=100,
    ){
        this.name = name;
        this.age = age;
        this.location = location;
        this.score = score;
    }


    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getAge() {
        return this.age;
    }

    setAge(age) {
        this.age = age
    }

    getLocation() {
        return this.location;
    }

    setLocation(location) {
        this.location = location
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

}


const person1 = new Person("zhangsan", 12, "shenzhen", 98);
console.log(person1.getName());
console.log(person1.getAge());
console.log(person1.getLocation());
person1.setScore(100);
console.log(person1.getScore());