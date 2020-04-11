var mongoose = require("mongoose");
var Hospital = require("./models/hospital");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Apollo Hospital Delhi", 
        image: "https://i.ndtvimg.com/i/2016-06/delhi-apollo_650x400_61465032467.jpg",
        description: "The Apollo Institutes of Orthopaedics at Indraprastha Apollo Hospitals is at the forefront in offering the latest in orthopaedic treatments and surgical techniques. The centre performs surgical procedures which include the most current arthroscopic and reconstructive techniques – including major joint replacements including the hip resurfacing and shoulder surgeries, arthroscopies, laminectomies, the most delicate hand surgeries and much more. The most advanced medical equipment and a team of highly experienced surgeons is supported by the most advanced state-of-the-art technology. The Apollo Institutes of Orthopaedics at Indraprastha Apollo Hospitals Delhi is at the forefront of current Orthopaedics and offers the latest in orthopaedic treatments and surgical techniques. The center perform advanced surgical procedures which include the most current arthroscopic and reconstructive techniques – including major joint replacements, revision joint replacements."
    },
    {
        name: "Medanta Hospital Gurgaon", 
        image: "https://s3.eu-central-1.amazonaws.com/bookimed/clinic/5c87d3dc2ebe4.jpeg",
        description: "Medanta (The Medicity) is a multi-specialty medical institute based in Gurgaon in the National Capital Region of India. It was started in 2009, with cardiac surgeon, Naresh Trehan.[3] as its main director along with co founder Sunil Sachdeva and various others. The hospital has more than 1600 beds and has expanded its outreach to other cities including Lucknow, Indore and Ranchi. Lucknow is now getting its own 1000 bedded hospital.it provides the most current arthroscopic and reconstructive techniques – including major joint replacements, revision joint replacements."
    },
    {
        name: "AIIMS DELHI", 
        image: "https://ehealth.eletsonline.com/wp-content/uploads/2014/05/AIIMS.jpg",
        description: "AIIMS (New Delhi) was established in 1956 through an Act of Parliament and operates autonomously under the Ministry of Health and Family Welfare.AIIMS (New Delhi) is governed by the All India Institute of Medical Sciences Act, 1956.[2] AIIMS was established in New Delhi after then Prime Minister of India Pandit Jawaharlal Nehru's initial proposal to set up the institute in Calcutta was turned down by the then Chief Minister of West Bengal Bidhan Chandra Roy.[3] It was the vision of Rajkumari Amrit Kaur, the first Health Minister of India, to establish an institute of such nature in India. "

    }
]
 
function seedDB(){
   //Remove all campgrounds
   	Hospital.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed hospitals!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Hospital.create(seed, function(err, hospital){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a hospital");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is hospital",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    hospital.comments.push(comment);
                                    hospital.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 

}
 
module.exports = seedDB;








