const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())

const Articale = require("./models/articale")




app.listen(3000,()=>{

console.log('server is runnig on port 3000')

})

console.log('server is runnig on port 3000')





// const { MongoClient } = require('mongodb');

// // Try adding the database name at the end, like /myLocalDB
// const uri = "mongodb://127.0.0.1:27017/database1";

// const client = new MongoClient(uri, {
//   family: 4, // Forces IPv4
//   serverSelectionTimeoutMS: 2000 // Fails fast so you don't wait forever
// });

// const ConnectDB = async () => {
//   try {
//     console.log("Connecting to local MongoDB...");
//     await client.connect();
//     console.log("✅ Database Connected locally!");
//   } catch (e) {
//     console.log("❌ Local Connection Error:", e.message);
//   } finally {
//     // Optional: client.close(); 
//   }
// };

//ConnectDB();
const uri = "mongodb://127.0.0.1:27017/database1";

mongoose.connect(uri)
  .then(() => console.log("✅ Mongoose Connected to database1"))
  .catch((err) => console.log("❌ Connection Error:", err));

app.post('/gussname', (req, res) => {
    const name = req.body.Myname;

   // const name = req.body.Myname;
    console.log(req.body.Myname)

    // A little "Puzzle Logic" to make guesses based on name length
    const nameLength = name.length;
    
    // Logic for guessing age (Example: length * 5)
    const guessedAge = nameLength * 4; 
    
    // Logic for guessing country based on first letter
    const firstLetter = name.charAt(0).toUpperCase();
    let guessedCountry = "a mysterious land";
    if (firstLetter < 'M') {
        guessedCountry = "the Northern Hemisphere";
    } else {
        guessedCountry = "the Southern Hemisphere";
    }

    // Sending the puzzle response
    res.json({
        greeting: `Your name is ${name}`,
        logic_guess: `I guess you are from ${guessedCountry}`,
        puzzle_age: `Your age is likely around ${guessedAge}`,
        hobby_reveal: `And your favorite sport is ${nameLength > 5 ? 'Football' : 'Tennis'}`
    });
});


app.get('/QRYParmADD',(req,res)=>{
   console.log(req.body);
   //res.send('The Result Of Adding Two Number Is ${req.body.num1 + req.body.num1 }');
  res.send(`This the total number of ${Number(req.query.NUM1) +Number( req.query.NUM2)}`);
})


app.get('/BodyParmADD',(req,res)=>{
   console.log(req.body);
   //res.send('The Result Of Adding Two Number Is ${req.body.num1 + req.body.num1 }');
  res.send(`This the total number of ${req.body.num1 + req.body.num2}`);
})

app.get('/ParmADD/:NUM1/:NUM2',(req,res)=>{
   console.log(req.body);
   //res.send('The Result Of Adding Two Number Is ${req.body.num1 + req.body.num1 }');
  res.send(`This the total number of ${ Number(req.params.NUM1 )+ Number (req.params.NUM2)}`);
})

app.get('/show',(req,res)=>{
   
  let numbers ="";
  for(let  i=0;i<100 ; i++){
      numbers += i + "-" ;


  }

   res.render("Num.ejs",{ 
                          "Myname": "Ahmed" ,
                          "Number": numbers
                         }
                        )
})


app.post('/Articale', async (req, res) => {
    try {
        const NewArticale = new Articale(); 
        NewArticale.title = req.body.title;  
        NewArticale.body  = req.body.body;  
        NewArticale.numberOflikes = req.body.numberOflikes; 

        // FIX: Added () to .save()
        await NewArticale.save(); 
        
        res.status(201).send("The New Artical Saved Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving article");
    }
});

app.get('/getArticale/:Artical_ID', async (req, res) => {
    try {
        const id = req.params.Artical_ID;

        // 1. Call findById directly on the Model (Articale)
        const foundArticle = await Articale.findById(id);

        // 2. Check if the article actually exists
        if (!foundArticle) {
            return res.status(404).send("Article not found");
        }

        // 3. Send the found data back as JSON
        res.json(foundArticle);

    } catch (error) {
        console.error(error);
        // This usually triggers if the ID format is invalid
        res.status(500).send("Error retrieving article: " + error.message);
    }
});



app.get('/DelArticale/:Artical_ID', async (req, res) => {
    try {
        const id = req.params.Artical_ID;

        // 1. Call findById directly on the Model (Articale)
        const foundArticle = await Articale.findByIdAndDelete(id);

        // 2. Check if the article actually exists
        if (!foundArticle) {
            return res.status(404).send("Article not found");
        }

        // 3. Send the found data back as JSON
        res.json(foundArticle);

    } catch (error) {
        console.error(error);
        // This usually triggers if the ID format is invalid
        res.status(500).send("Error retrieving article: " + error.message);
    }
});




app.get('/showArticale', async (req, res) => {
    try {
        const id = req.params.Artical_ID;

        // 1. Call findById directly on the Model (Articale)
        const foundArticle = await Articale.find();

        // 2. Check if the article actually exists
        if (!foundArticle) {
            return res.status(404).send("Article not found");
        }
         res.render("ShowArticales.ejs",{
            AllArticales : foundArticle

         })
        // 3. Send the found data back as JSON
        //res.json(foundArticle);

    } catch (error) {
        console.error(error);
        // This usually triggers if the ID format is invalid
        res.status(500).send("Error retrieving article: " + error.message);
    }
});