import * as SecureStore from 'expo-secure-store';
var BASE_URL = require('../helpers/ApiBaseUrl.tsx');
async function UserProfie(UserId) {
    let userToken = await SecureStore.getItemAsync('userToken');  
    return new Promise((Resolve, reject) => {
       
      const myHeaders = new Headers();
      myHeaders.append("Authorization", userToken);
      const formdata = new FormData();
      formdata.append("userId", UserId);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
      
      fetch(BASE_URL+"user.php?action=userDetail", requestOptions)
        .then((response) => response.text())
        .then((result) => Resolve(JSON.parse(result)))
        .catch((error) => reject(error));   
         
        })
      
 
}

module.exports  = {
  UserProfie:UserProfie
}
