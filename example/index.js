"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../dist/index"));
var data = {
    name: "john",
    email: "test@test.com",
    password: "code123",
    passwordConfirm: "code123",
    gender: "male",
    age: 25,
    hobby: "sports"
};
//
// let rules = {
//     name : "required", // rules for name
//     email: "require|email", // rules for email
//     age : "number|min[20]|max[30]", // rules for age
//     hobby: "required|minLength[2]" // rules for hobby
// }
// let rules = {
//     name : {
//         rules : "required", // rules for name
//         title : "my name" // change the key  "name" to "my name" for errormessage
//     }
// }
var rules = {
    name: {
        rules: "required",
        required: "required error message of name"
    },
    email: {
        rules: "require|email",
        title: "email2",
        email: "email form error message of email" // it does not care title value
    },
    age: {
        rules: "number|min[20]|max[29]",
        number: "number error message of age",
        min: "min error message of age",
        max: "max error message of age"
    },
    hobby: {
        rules: "required|minLength[2]",
        title: "my hobby",
        minLength: "minLength error message of hobby"
    }
};
var check = index_1.default(data, rules); // {result : true or false , message: error message }
if (check.result) {
    //success
}
else {
    //fail
    //console.log(check.message)
}
