const express = require('express');
const Posts = require('../../models/pamudu/posts');
const collection = require('../../models/pamudu/userSchema');
const Dash = require('../../models/pamudu/dashSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({extended: true}))
router.use(cors())
const nodemailer = require('nodemailer');

const JWT_SECRET = "hdhjsahdahdjhaj123()aauauaayayka13414959487laksfjafkaf"



//save posts

router.post('/post/save',(req,res)=>{

    let newPost = new Posts(req.body);

    newPost.save((err) =>{

        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({

            success:"Posts saved successfully"
        });
    });


});


//get posts

router.get('/posts',(req,res) =>{
    Posts.find().exec((err,posts) =>{
        if(err){
            return res.status(400).json({
                error:err
            });


        }

        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//get a specific post

router.get("/post/:id",(req,res) =>{

    let postId = req.params.id;

    Posts.findById(postId,(err,post) =>{

        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success:true,
            post
        });
    });
});

//update routes

router.put('/post/update/:id',(req,res)=>{

    
    
    Posts.findByIdAndUpdate(req.params.id,
        {
            $set:req.body
        },
        (err,post) =>{

            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully",
                
            });
        }
    );
});

//delete post

router.delete('/post/delete/:id', (req,res)=>{

    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{

        if(err) return res.status(400).json({

            message:"Delete unsuccessful", err
        });

        return res.json({
            messege:"Delete Successful",deletedPost
        });
    });
});

  //TaskCount

  router.get('/post/count/:id', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const count = await Posts.countDocuments({id: userId });
      res.json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

//Login
router.post("/",async(req,res) =>{
    const{email,password}=req.body;

    const user = await collection.findOne({email});

    if(!user){
        return res.send({error: "User not exist"});
    }

    if(await bcrypt.compare(password,user.password)){

        const token=jwt.sign({email: user.email},JWT_SECRET, {
            expiresIn: "1h",
        });

        if(res.status(201)){
            return res.json({status: "ok", data: token});
            
        }else{

            return res.json({error: "error"})
        }
    }

    res.json({status: "error",error:"Invalid Password"});
    
});

 //registration
 router.post("/register", async (req, res) => {
    const { email, password, user, userType,telephone,address,firstname,lastname } = req.body;
  
    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        const oldUser = await collection.findOne({email});

        if(oldUser){
            return res.send({error: "User exist"})
        }
      await collection.create({ email, user, password:encryptedPassword ,userType ,telephone,address,firstname,lastname});
      res.send({ status: "ok" });
    } catch (e) {
      res.send({ status: "error" });
    }
  });

// Profile Details and Attendance
router.post("/userData", async (req, res) => {
    const { token } = req.body;
  
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
  
      console.log(user);
      if (user === "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const useremail = user.email;
  
      collection.findOne({ email: useremail }).then((data) => {
        res.send({ status: "ok", data: data });
      }).catch((error) => {
        res.send({ status: "error", data: error });
      });
  
    } catch (error) {
      console.error(error);
      res.send({ status: "error", data: error });
    }
  });
  
  // Mark Attendance
  router.post("/markAttendance", async (req, res) => {
    const { token, date } = req.body;
  
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
  
      console.log(user);
      if (user === "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const useremail = user.email;
  
      const data = await collection.findOneAndUpdate(
        { email: useremail },
        { $addToSet: { attendance: date } },
        { new: true }
      );
  
      res.send({ status: "ok", data: data.attendance });
  
    } catch (error) {
      console.error(error);
      res.send({ status: "error", data: error });
    }
  });
  
  router.get("/allUsersAttendance", async (req, res) => {
    try {
      const users = await collection.find({}, { email: 1, attendance: 1, _id: 0 });
      res.send({ status: "ok", data: users });
    } catch (error) {
      console.error(error);
      res.send({ status: "error", data: error });
    }
  });
  

  // Edit user data
router.put("/userData/edit", async (req, res) => {
    const { token, newData } = req.body;
    try {
      // Verify token
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
  
      if (user === "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const useremail = user.email;
      // Find user data and update it
      collection.findOneAndUpdate(
        
        { email: useremail },
        { $set: newData },
        { returnOriginal: false } // Return updated document
      )
        .then((updatedData) => {
          res.send({ status: "ok", data: updatedData });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) {
      console.log(error);
      res.send({ status: "error", data: error.message });
    }
  });

  router.put("/userData/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
      // Find user data and verify old password
      const userData = await collection.findOne({ _id: ObjectId(id) });
      const isPasswordValid = await bcrypt.compare(oldPassword, userData.password);
  
      if (!isPasswordValid) {
        return res.send({ status: "error", data: "Old password is incorrect" });
      }
  
      // Update the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updatedData = await collection.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { password: hashedPassword } },
        { returnOriginal: false } // Return updated document
      );
  
      res.send({ status: "ok", data: updatedData });
    } catch (error) {
      console.log(error);
      res.send({ status: "error", data: error.message });
    }
  });
  

  

// Emp Details
router.get('/accounts',(req,res) =>{
    collection.find().exec((err,userSchema) =>{
        if(err){
            return res.status(400).json({
                error:err
            });


        }

        return res.status(200).json({
            success:true,
            userDetails:userSchema
        });
    });
});

//get a Emp Details

router.get("/accounts/:id",(req,res) =>{

    let empId = req.params.id;

    collection.findById(empId,(err,post) =>{

        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success:true,
            post
        });
    });
});


//update Emp Details

router.put('/accounts/update/:id',(req,res)=>{

    
    
    collection.findByIdAndUpdate(req.params.id,
        {
            $set:req.body
        },
        (err,post) =>{

            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully",
                
            });
        }
    );
});

//delete Emp Details

router.delete('/accounts/delete/:id', (req,res)=>{

    collection.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{

        if(err) return res.status(400).json({

            message:"Delete unsuccessful", err
        });

        return res.json({
            messege:"Delete Successful",deletedPost
        });
    });
});

//save Emp Details

router.post('/accounts/save',(req,res)=>{

    let newPost = new collection(req.body);

    newPost.save((err) =>{

        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({

            success:"Posts saved successfully"
        });
    });


});

//EmpCount

router.get('/accounts/count/:id', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const count = await collection.countDocuments({id: userId });
      res.json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  //get a User Profile

router.get("/accounts/:id",(req,res) =>{

    let empId = req.params.id;

    collection.findById(empId,(err,post) =>{

        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success:true,
            post
        });
    });
});

  //TaskCount

router.get('/posts/count/:id', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const count = await Posts.countDocuments({id: userId });
      res.json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  

//save posts

router.post('/emp/save',(req,res)=>{

    let newPost = new Dash(req.body);

    newPost.save((err) =>{

        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({

            success:"Posts saved successfully"
        });
    });


});


//get posts

router.get('/emp',(req,res) =>{
    Dash.find().exec((err,dashSchema) =>{
        if(err){
            return res.status(400).json({
                error:err
            });


        }

        return res.status(200).json({
            success:true,
            existingPosts:dashSchema
        });
    });
});

//get a specific post

router.get("/emp/:id",(req,res) =>{

    let empId = req.params.id;

    Dash.findById(empId,(err,post) =>{

        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success:true,
            post
        });
    });
});

//update routes

router.put('/emp/update/:id',(req,res)=>{

    
    
    Dash.findByIdAndUpdate(req.params.id,
        {
            $set:req.body
        },
        (err,post) =>{

            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully",
                
            });
        }
    );
});

//delete post

router.delete('/emp/delete/:id', (req,res)=>{

    Dash.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{

        if(err) return res.status(400).json({

            message:"Delete unsuccessful", err
        });

        return res.json({
            messege:"Delete Successful",deletedPost
        });
    });
});
//Pagination

router.get("/paginatedUsers",async(req,res)=>{
const allUser= await collection.find({})
const page=parseInt (req.query.page)
const limit = parseInt (req.query.limit)

const startIndex=(page-1)*limit
const lastIndex=(page)*limit

const results={}
results.totalUser=allUser.length;
results.pageCount=Math.ceil(allUser.length/limit);

if(lastIndex<allUser.length){

    results.next={
        page:page+1,
    }
}

if(startIndex>0){

    results.prev={
        page:page-1,
        
    
    }

}
results.result =allUser.slice(startIndex,lastIndex);
res.json(results)
}
)


router.post("/upload-image",async(req,res)=>{

    const {base64} =req.body;

    try {

       await collection.create({image: base64})

        res.send({Status: "ok"})
 
    } catch (error) {

        res.send({Status: "error", data:error});
        
    }
})

router.get("/get-image",async(req,res)=>{

    try {

        await collection.find({}).then(data => {

            res.send({Status: "ok",data: data})
        })
       
 
    } catch (error) {

       
        
    }
})

router.get('/users', async (req, res) => {
    const report = await getUsersReport();
    if (report.success) {
      res.status(200).json(report);
    } else {
      res.status(500).json(report);
    }
  });


  const getUsersReport = async () => {
    try {
      const users = await collection.find();
      return {
        success: true,
        users: users.map(user => {
          return {
            user: user.user,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            telephone: user.telephone,
            userType: user.userType,
            qualifications: user.qualifications,
            workExperience: user.workExperience,
            paymentmethod: user.paymentmethod,
            nameoncard: user.nameoncard,
            cardnumber: user.cardnumber,
            expiredata: user.expiredata,
            cvv: user.cvv
          };
        })
      };
    } catch (err) {
      return {
        success: false,
        error: err.message
      };
    }
  };
  
  // API Endpoint for sending feedback
router.post('/api/send-feedback', (req, res) => {
  const { username, phoneNumber, email, subject, message } = req.body;

  if (!username || !phoneNumber || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'SendGrid', etc.
    auth: {
      user: 'kpamudu@gmail.com',
      pass: 'qbmzcxbafuadekhh',
    },
  });

  // Mail options
  const mailOptions = {
    from: email, // Use the email entered in the input box as the sender
    to: 'kpamudu@gmail.com',
    subject: `Feedback from ${username}`,
    text: `Phone Number: ${phoneNumber}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email. Please try again later.' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: `Thank you dear ${username}, Your message has been sent successfully!` });
    }
  });
});


module.exports = router;