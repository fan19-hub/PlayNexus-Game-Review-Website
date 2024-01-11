const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const secretKey = "12dfgiodag#rg^&2@";

// Create a MySQL connection:
const connection =
     mysql.createConnection({
       host: '127.0.0.1',
       user: 'root',
       password: 'ladys',
       database: 'nexusdata'
     });

// Connect to the MySQL database:
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Create an Express application:
const app = express();

// Use the required middleware:
app.use(bodyParser.json());
app.use(cors());


//-------Game Module-------//
// Create
app.post('/api/v1/games', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO games (GameName, DetailedDescription) VALUES (?, ?)';
  connection.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.send('Record created');
  });
});

// Read all
app.get('/api/v1/games', (req, res) => {
  const sql = 'SELECT * FROM games';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Read recommended games
app.get('/api/v1/recommend', (req, res) => {
  const { name, description } = req.body;
  // const sql = "select * from games natural join (select GameID, avg(Rating) as avgRating from games natural join reviews GROUP BY GameID) as q where SteamRecommendationCount>1000 and PriceFinal=0 and avgRating>7 and PlatformLinux=1;";
  // connection.query(sql, (err, results) => {
  //   if (err) throw err;
  //   res.json(results);
  // });
  const sql ="CALL generalRecommendation();"
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

//personal recommendations
app.get('/api/v1/personalrecommend', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.send(null);
    }
    const UserID = decoded.UserID;
    // const sql = "select * from (select * from games where PriceInitial>PriceFinal)AS T JOIN viewedgames ON (T.GameID=viewedgames.GameID) NATURAL JOIN Users WHERE UserID=? ORDER BY GameName LIMIT 4;";
    // if (err) throw err;
    // res.json(results1);
    // });
    const sql ="CALL personal_rec(?);"
    connection.query(sql, [UserID], (err, results1) => {
    if (err) throw err;
      res.json(results1[0]);
    });
  });
});


// Read one game
app.get('/api/v1/games/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM games WHERE GameID = ?';
  connection.query(sql, [ id], (err, results1) => {
    if (err) throw err;
    res.json(results1);
  });
});

// Update
app.put('/api/v1/games/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE games SET GameName = ?, DetailedDescription = ? WHERE GameID = ?';
  connection.query(sql, [name, description, id], (err, result) => {
    if (err) throw err;
    res.send('Record updated');
  });
});

// Delete
app.delete('/api/v1/games/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM games WHERE GameID = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Record deleted');
  });
});





//--------User Module----------//

//User signup
var userGenders=-1
app.post('/api/v1/signup', (req, res) => {
  const { userName, userPwd,userEmail, userGender,userAge,userLanguage} = req.body;
  if (userGender=="male"){
    userGenders=0;
  }
  else if (userGender=="female"){
    userGenders=1;
  }
  else{
    userGenders=2;
  }
  const sql = 'SELECT * FROM users WHERE Username = ?';

  // Check if the user exists
  connection.query(sql, [userName], (err,result) =>{
    if (err) throw err;
    if (result.length > 0){      
      // case1: repeated username
      res.send('The user name is already in use');
    }
    else{
      // case2: username can be used
      const sql = 'INSERT INTO users (Username, Password,Email,Gender,Age,UserLanguage) VALUES (?, ?,?,?,?,?)';
      connection.query(sql, [userName, userPwd,userEmail, userGenders,userAge,userLanguage], (err, result) => {
        if (err) throw err;
        res.send('Record created');
      })
    }

  });
});


//User Login
app.post('/api/v1/login', (req, res) => {
  const { userName, userPwd } = req.body;
  const sql = 'SELECT * FROM users WHERE Username = ? AND Password = ?';
  const sqlCheckPassword = 'SELECT * FROM users WHERE Username = ?';

  // Check if the user exists
  connection.query(sql, [userName,userPwd], (err,result) =>{
    if (err) throw err;
    if (result.length > 0){      
      const UserID=result[0].UserID;
      // case1: user login successfully
      const token = jwt.sign({UserID}, secretKey, { expiresIn: '60min' });
      res.json({ "key": token });
    }
    else{
      // case2: user entered wrong password
      connection.query(sqlCheckPassword, [userName], (err,result)=>{
        if (err) throw err;
        if (result.length > 0){
          res.json({ "msg": 'Entered password is wrong!'});
        }else{
          res.json({ "msg": 'No username found!'});
        }
      })
    }
  });

});



//User Check Login
app.get('/checklogin', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.json({"loggedin":0});
      }
      return res.json({"loggedin":1});
  });
});

//User Read
app.get('/user', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
  
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.send('Unauthorized');
        }
  
      // 此时decoded中包含用户信息
      const UserID = decoded.UserID;
      const sql = 'SELECT * FROM users WHERE UserID = ?';
      connection.query(sql, [UserID], (err, results) => {
        if (err) throw err;
        res.json(results);
      });
    });
});







//-------History Module-------//
// Viewed Games
app.get('/api/v1/usergame', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.send(null);
    }

  // 此时decoded中包含用户信息
  const UserID = decoded.UserID;
  const sql = 'SELECT * FROM games natural join viewedgames natural join users WHERE UserID =? ORDER BY Timestamp DESC LIMIT 10';
  connection.query(sql, [UserID], (err, results1) => {
  if (err) throw err;
    res.json(results1);
  });
  });
});
//search suggestions
app.get('/api/v1/search_suggestion', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const searchTerm = req.body.toLowerCase();

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.send(null);
    }
  const UserID = decoded.UserID;
  const sql = "select distinct GameName from viewedgames NATURAL JOIN games where UserID=(select UserID from users where UserID=?);";
  connection.query(sql, [UserID], (err, suggestions) => {
  if (err) throw err;

    const matchedSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(searchTerm).slice(0, 5)   //use the first 5 games
    );
  
    res.json({ suggestions: matchedSuggestions });
  });

});
});

// viewed games part
// 1. Get Viewedgames of user id 
app.get('/viewedgames/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM ViewedGames WHERE UserID = ?';
  connection.query(sql, [id], (err, result) => {
   if (err) throw err;
   if (result.length > 0) {
    res.send(result);
   } else {
    res.send('No viewed history for user');
   }
  });
 });
 



//update viewed games history 
app.post('/api/v1/updateHistory', (req, res) => {
  const token = req.body.headers.Authorization.split(' ')[1];
  const GameID=req.body.GameID;
  jwt.verify(token, secretKey, (err, decoded) => {
   if (err) {
    return res.send(null);
   }
 
  // 此时decoded中包含用户信息
  const userID = decoded.UserID;
  const sql2="SELECT * FROM viewedgames WHERE UserID=? AND GameID=?"
  connection.query(sql2, [userID,GameID], (err,result) =>{
    if (err) throw err;

    
    if (result.length > 0){
      const sql = 'UPDATE viewedgames SET Timestamp = NOW() WHERE UserID=? AND GameID=?';
      connection.query(sql, [userID,GameID], (err, result) => {
      if (err) throw err;
      res.send('Record updated');
    });}
    else{
  const sql = "INSERT INTO viewedgames (UserID, GameID, Timestamp) VALUES (?, ?, NOW());";
  connection.query(sql, [userID, GameID], (err, results1) => {
  if (err) throw err;
    res.json(results1);
  });}
  });
});
});


  
//-------Post Module-------//
//get popular posts
app.get('/api/v1/post', (req, res) => {
  const sql = 'SELECT * FROM posts natural join users ORDER BY Likes DESC LIMIT 50';
  connection.query(sql,  (err, results1) => {
  if (err) throw err;
    res.json(results1);
  });
});
  
//Get latest posts
app.get('/api/v1/post2', (req, res) => {
  const sql = 'SELECT * FROM posts natural join users ORDER BY time DESC LIMIT 100';
  connection.query(sql,  (err, results1) => {
    if (err) throw err;
      res.json(results1);
    });
    
  });

//Update likes
app.post('/api/v1/savelike', ( req,res) =>{
    const{postId, numlike}=req.body;
    const sql = 'UPDATE posts SET Likes = ? WHERE PostID = ?';
    connection.query(sql, [numlike, postId], (err, result) => {
      if (err) throw err;
      res.send('Record updated');
    });
  })

//Get my posts
app.get('/api/v1/postmytotal', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
  
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.send('Unauthorized');
        }
  
    const UserID = decoded.UserID;
    const sql = 'SELECT * FROM posts WHERE UserID=? ORDER BY time DESC';
    connection.query(sql,[UserID],  (err, results1) => {
      if (err) throw err;
        res.json(results1);
      });
    });
    
});
//get profile info
app.get('/api/v1/profile', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.send('Unauthorized');
      }

  const UserID = decoded.UserID;
  const sql = 'SELECT * FROM users WHERE UserID=?';
  connection.query(sql,[UserID],  (err, results1) => {
    if (err) throw err;
      res.json(results1);
    });
  });
  
});
//Create a new post
app.post('/api/v1/mepost', (req, res) => {
    const token = req.body.headers.Authorization.split(' ')[1];
    const content=req.body.content;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.send(null);
      }
    const userID = decoded.UserID;
    const sql = 'INSERT INTO posts (UserID,PostContent, Likes,time) VALUES (?,?,0, NOW())';
    connection.query(sql, [userID, content], (err, result) => {
      if (err) throw err;
      res.send('Record created');
    });
    });
});
  




//--------Search Module----------//

//Advanced 搜索
//支持价格，语言和平台过滤
//输入参数:
//        term ---- 搜索游戏名称
//        min_price ---- 最小价格
//        max_price ---- 最大价格
//        platformWindows ---- 1 代表支持windows
//        platformLinux ---- 1 代表支持linux
//        platformMac ---- 1 代表支持mac
//        purchase_enable  ---- 1 代表筛选存在购买链接的
//        [别用]support_language  ---- 语言
//        orderbyprice ---- 0 代表按价格降序，1 代表按价格升序
//        orderbyrecom ---- 0 代表按recommendation降序， 1 代表升序
//        [别用]xxx  orderbydate ---- 0 代表按时间降序，1 代表按时间升序 xxx 这个类型是varchar，按时间排序被舍弃
//        [注意]两个order一起用会导致报错，建议规避一下
app.post('/ad_search', (req, res) => {
  const searchTerm = `%${req.body.term}%`; 
  const minPrice = parseFloat(req.body.min_price) || 0;
  const maxPrice = parseFloat(req.body.max_price) || Number.MAX_SAFE_INTEGER;
  const platformLinux = req.body.platformLinux ;
  const platformMac = req.body.platformMac ;
  const platformWindows = req.body.platformWindows ;
  const purchaseEnable = req.body.purchase_enable ;
  const supportLanguage = `%${req.body.support_language}%`;
  const orderbyprice = req.body.orderbyprice;
  const orderbyrecom = req.body.orderbyrecom;

  // Start with the base query
  let sql = `SELECT * FROM games WHERE GameName LIKE "${searchTerm}"`;

  // Add price filtering only if min_price or max_price are provided
  if (req.body.min_price || req.body.max_price) {
    sql += ` AND PriceFinal >= ${minPrice}  AND PriceFinal <= ${maxPrice}`;
  }

  // Add platform filtering only if any platform-related parameter is provided
  if (req.body.platformLinux || req.body.platformMac || req.body.platformWindows) {
    sql += ` AND (PlatformLinux = ${platformLinux} OR ${platformLinux} = 0) AND (PlatformMac = ${platformMac} OR ${platformMac} = 0) AND (PlatformWindows = ${platformWindows} OR ${platformWindows} = 0)`;
  }

  // Add purchase enable filtering
  if (req.body.purchase_enable) {
    sql += ' AND PurchaseLink IS NOT NULL AND PurchaseLink <> " " AND PurchaseLink <> ""';
  }

  // Add language filtering using FIND_IN_SET
  if (req.body.support_language) {
    sql += ` AND SupportedLanguages LIKE "${supportLanguage}"`;
  }


  // Add sorting options if orderbyprice is provided
  if (orderbyprice) {
    sql += ' ORDER BY PriceFinal ASC';
  }

  // Add sorting options if orderbyrecom is provided
  if (orderbyrecom) {
    sql += ' ORDER BY SteamRecommendationCount ASC';
  }

  // Execute the query
  connection.query(sql, (err, result1) => {
    if (err) {
      console.error('Error executing MySQL query:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result1.length > 0) {
      res.json(result1);
    } else {
      res.json({ "msg": 'No result found for ' + searchTerm });
    }
  });
});


//-----Reviews Module------//
// Read all reviews
app.get('/api/v1/reviews/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM reviews natural join users WHERE GameID = ? ORDER BY time DESC' ;
  // const sql = 'SELECT * FROM reviews natural join users WHERE GameID = ?' ;
  connection.query(sql, [ id], (err, results1) => {
    if (err) throw err;
    res.json(results1);
  });
});

app.post("/api/v1/reviews",(req,res) =>{
  const token = req.body.headers.Authorization.split(' ')[1];
  const content=req.body.reviewBody;
  const GameID=req.body.GameID;
  const rating=req.body.userrating;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.send("Please login first!");
    }

  // 此时decoded中包含用户信息
  const userID = decoded.UserID;
  const sql = 'INSERT INTO reviews (Rating,ReviewComment, GameID,UserID,time) VALUES (?,?,?,?, NOW())';
  connection.query(sql, [rating,content,GameID,userID], (err, result) => {
    if (err) throw err;
    res.send('Posted successfully!');
  });
});
});


//GET THE GAME'S AVE RATING
app.get('/api/v1/averating/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT AVG(Rating) AS avgrate FROM reviews WHERE GameID=?';
  connection.query(sql, [ id], (err, results1) => {
    if (err) throw err;
    res.json(results1);
  });
});


//Start the server:
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});




// connection.query("delete from newtable;", [UserID], (err, results1) => {
//   if (err) console(1);
// });