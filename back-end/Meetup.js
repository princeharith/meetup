const meetup_data = require('data-store')({ path: process.cwd() + '/meetup_data/meetups.json' });
const axios = require('axios').default;

class Meetup {

    constructor(id, address1, address2, meettype, stars, price){
        this.id = id;
        this.address1 = address1;
        this.address2 = address2;
        this.meettype = meettype;
        this.stars = stars;
        this.price = price;
    }

};

Meetup.getAllIDs = () => {
    //js top level function, give it an object
    //it will retireve all properties as an arr
    return Object.keys(meetup_data.data).map((id => {return parseInt(id);}));

    //Return an array of all user ids.

};
Meetup.findByID = (id) => {
    let mdata = meetup_data.get(id);
    if (mdata != null) {
        return new Meetup(mdata.id, mdata.address1, mdata.address2, mdata.meettype, mdata.stars, mdata.price);
    }
    return null;
}

Meetup.next_id=Meetup.getAllIDs().reduce((max, next_id) => {
    if (max , next_id){
        return next_id;
    }
    return max;
}, -1) + 1;

Meetup.create = (address1, address2, meettype, stars, price) => {
    //finding max id, add 1 to it to get new id
    console.log("in meetup function")
    let id = Meetup.next_id;
    Meetup.next_id +=1;
    let meetup = new Meetup(id, address1, address2, meettype, stars, price);
    meetup_data.set(meetup.id.toString(), meetup);

    return meetup;
}

module.exports = Meetup;