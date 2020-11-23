# check-validation


**- Check validation of Object**               
**- Please let me know issues to my github. if you find bugs :)**               
**- Please let me know some weird text and error message. My english is not good**               
**- Thank you Enjoy!**               

<br>



<br>

# installing

<br>

**npm:**
```
npm install check-validation
```
**yarn:**
```
yarn add check-validation
```


<br>

# import 
```JavaScript
import validation from "check-validation" 

import { default, validate } from "check-validation" 

var validation = require("check-validation")
```
<br>



# Usage

- Example Data
```JavaScript
const data = {
    name: "john",
    email: "test@test.com",
    password: "code123",
    passwordConfirm: "code123",
    gender: "male",
    age: 25,
    hobby: "sports"
}
```
<br>
<br>

- Simple

```JavaScript
 let rules = {
     name : "required", // rules for name
     email: "require|email", // rules for email
     age : "number|min[20]|max[30]", // rules for age
     hobby: "required|minLength[2]", // rules for hobby
     password: "required|match[passwordConfirm]", // rules for password
}

const check = validation(data, rules) // {result : true or false , message: error message }

if (check.result) {
    //success
} else {
    //fail
    //console.log(check.message)
}
```

<br>
<br>

- For Custom Error Message

  \- if use title inner name object and then change the Subject
  
  \- it must be use with rules
  
```javascript
 let rules = {
     name : {
         rules : "required", // rules for name
         title : "my name" // change the key  "name" to "my name" for error message
     }
}
```

<br>
<br>

- Full Custom Error Message

    \- if use API names with rules an inner object it will be changing full Error Message
    
    \- Api name works with priority than title 
    
```javascript
let rules = {
    name: {
        rules: "required", // rules for name
        required: "required error message of name"
    },
    email: {
        rules: "required|email", // rules for email
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
        title : "code",
        match : "match error message of password"
    }
}
```

<br>
<br>

- For Korean

    \- 세번째 파라미터에 ko 스트링을 넣을시에 에러메세지를 한글로 받아 볼 수 있음
     
    \- 타이틀값에 단어만 넣으면 "을/를", "이/가" 는 자동으로 붙음
    
    \- phone api 사용시 한국 휴대전화번호 형식을 체크함
     
```javascript
let rules = {
    name: {
        rules: "required", // rules for name
        title : "이름" // 오류 예) 이름을 입력 바랍니다 
    },
    email: {
        rules: "required|email", // rules for email
        title: "나의 이메일", // 오류 예) 나의 이메일이 형식에 맞지 않습니다
    }
} 
const check = validation(data, rules, "ko")

if (check.result) {
    //success
} else {
    //fail
    //console.log(check.message)
}
```

<br>
<br>


#API

|name & usage|description|
|:----------------|:----------------|
|required| check blank, null, undefined|
|||
|email| check email format|
|||
|number| check number|
|||
|phone| check cell phone format (in Korea)|
|||
|korean| check Korean|
|||
|english| check English|
|||
|englishNumber| check English and Number|
|||
|match[otherValueInObject]| check match with other value|
|||
|min[number]| minimum value |
|||
|max[number]| maximum value |
|||
|length[number]| lengths of string|
|||
|minLength[number]| minimum lengths of string|
|||
|maxLength[number]| maximum lengths of string|
|||