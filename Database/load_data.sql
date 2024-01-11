
CREATE TABLE Users (
  UserID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Username VARCHAR(20),
  Password VARCHAR(30),
  Email VARCHAR(30),
  Gender INT,
  Age INT,
  UserLanguage VARCHAR(50)
);
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/UserData.csv"
INTO TABLE Users
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
;
CREATE TABLE games (
  GameID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Title VARCHAR(255),
  DetailedDescription TEXT,
  SupportedLanguages TEXT,
  ReleaseDate VARCHAR(20),
  BackgroundImage TEXT,
  PosterImage TEXT,
  Trailer VARCHAR(255),
  PurchaseLink TEXT,
  PriceInitial DECIMAL(10,2),
  PriceFinal DECIMAL(10,2),
  EmbeddingVectors INT,
  SteamRecommendationCount INT,
  PlatformWindows BOOLEAN,
  PlatformLinux BOOLEAN,
  PlatformMac BOOLEAN
);
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/games.csv"
INTO TABLE Games
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
CREATE TABLE Posts(  
    PostID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    PostContent VARCHAR(255),
    Likes INT
);
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/post_data.csv"
INTO TABLE Posts
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
;
CREATE TABLE ViewedGames (
  ViewedID INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
  UserID INT,
  GameID INT,
  Timestamp DATETIME COMMENT 'Create Time',
  FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
  FOREIGN KEY (GameID) REFERENCES Games(GameID) ON DELETE CASCADE
);


LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.1/Uploads/ViewedGames.csv"
INTO TABLE ViewedGames
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
;

