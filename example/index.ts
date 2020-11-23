import validation from "../dist/index"

const data = {
    name: "john",
    email: "test@test.com",
    password: "code123",
    passwordConfirm: "code123",
    gender: "male",
    age: 25,
    hobby: "sports"
}
//
// let rules = {
//     name : "required", // rules for name
//     email: "require|email", // rules for email
//     age : "number|min[20]|max[30]", // rules for age
//     hobby: "required|minLength[2]", // rules for hobby
//     password : "required|match[passwordConfirm]"
// }


// let rules = {
//     name : {
//         rules : "required", // rules for name
//         title : "my name" // change the key  "name" to "my name" for errormessage
//     }
// }

let rules = {
    name: {
        rules: "required", // rules for name
        required: "required error message of name"
    },
    email: {
        rules: "require|email", // rules for email
        title: "email2", // change the key name "email" to "email2" for error message
        email: "email form error message of email" // it does not care title value
    },
    age: {
        rules: "number|min[20]|max[29]", // rules for age
        number: "number error message of age",
        min: "min error message of age",
        max: "max error message of age"
    },
    hobby: {
        rules: "required|minLength[2]", // rules for hobby
        title: "my hobby",
        minLength: "minLength error message of hobby"
    },
    password : {
        rules : "required|match[passwordConfirm]", // rules for password
        title : "pass word",
        match : "match error message of password"
    }
}

const check = validation(data, rules) // {result : true or false , message: error message }

if (check.result) {
    //success
} else {
    //fail
    //console.log(check.message)
}