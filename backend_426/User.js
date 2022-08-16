//data will go into users
const user_data = require('data-store')({ path: process.cwd() + '/user_data/users.json' });
const axios = require('axios').default;

class User {

    constructor(id, email, password, preferences){
        this.id = id;
        this.email = email;
        this.password = password;
        this.preferences = preferences;
    }

};

User.getAllIDs = () => {
    //js top level function, give it an object
    //it will retireve all properties as an arr
    return Object.keys(user_data.data).map((id => {return parseInt(id);}));

    //Return an array of all user ids.

};

User.findByID = (id) => {
    let udata = user_data.get(id);
    if (udata != null) {
        return new User(udata.id, udata.email);
    }
    return null;
}

User.next_id=User.getAllIDs().reduce((max, next_id) => {
    if (max , next_id){
        return next_id;
    }
    return max;
}, -1) + 1;

User.create = (email, password, preferences) => {
    //finding max id, add 1 to it to get new id
   let id = User.next_id;
   User.next_id +=1;
   let user = new User(id, email, password, preferences);
   user_data.set(user.id.toString(), user);
   return user;
}

User.addPreferences = (preferences, id) => {
        let u = User.findByID(id);
        u.preferences = preferences;
}

module.exports = User;