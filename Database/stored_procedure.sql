-- Active: 1698698459318@@127.0.0.1@3306@nexusdata
DROP PROCEDURE generalRecommendation;
CREATE DEFINER=`root`@`localhost` PROCEDURE `generalRecommendation`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE currGameID INT;
    DECLARE currPriceFinal INT;
    DECLARE currPlatformLinux INT;
    DECLARE currSteamRecommendationCount INT;
    DECLARE gamecur CURSOR FOR (SELECT DISTINCT GameID, PriceFinal, PlatformLinux, SteamRecommendationCount FROM games);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    DROP TABLE IF EXISTS generalRecommend;

    CREATE TABLE generalRecommend(
        GameID INT NOT NULL PRIMARY KEY,
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
        PlatformMac BOOLEAN,
        avgRating FLOAT
    );

    OPEN gamecur;

    REPEAT
        FETCH gamecur INTO currGameID, currPriceFinal, currPlatformLinux, currSteamRecommendationCount;
            IF currPriceFinal = 0 and currPlatformLinux=1 and currSteamRecommendationCount>1000 THEN
                INSERT INTO generalRecommend
                (SELECT * 
                FROM games
                NATURAL JOIN (
                    SELECT GameID, AVG(Rating) AS avgRating
                    FROM games
                    NATURAL JOIN reviews
                    GROUP BY GameID
                ) AS q
                WHERE 
                    avgRating > 7
                    AND GameID = currGameID);
            END IF;
    UNTIL done
    END REPEAT;

    CLOSE gamecur;
END;



-- Active: 1695491126352@@127.0.0.1@3306@nexusdata
DROP PROCEDURE personal_rec;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personal_rec`(IN userid INT)
BEGIN
  DECLARE id INT;
  DECLARE img TEXT;
  DECLARE name VARCHAR(255);
  DECLARE price1 decimal(10,2);
  DECLARE price2 decimal(10,2);
  DECLARE rec INT;
  DECLARE finished INTEGER DEFAULT 0;
  DECLARE cursor1 CURSOR FOR 
    SELECT games.GameID, PosterImage, GameName, PriceInitial, PriceFinal, SteamRecommendationCount
    FROM games JOIN viewedgames ON games.GameID = viewedgames.GameID WHERE UserID=userid
    ORDER BY GameName;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;
  DROP TABLE IF EXISTS NewTable;
  CREATE TABLE IF NOT EXISTS NewTable (
    GameID INT,
    PosterImage TEXT,
    GameName VARCHAR(255)
  );
  OPEN cursor1;
  WHILE NOT finished DO
    FETCH NEXT FROM cursor1 INTO id, img, name,price1,price2,rec;
    IF price1>price2 AND rec>=10 THEN INSERT INTO NewTable (GameID, PosterImage,GameName) VALUES (id, img,name);
    END IF;       
  END WHILE;
  CLOSE cursor1;
  SELECT DISTINCT * FROM NewTable LIMIT 3;
END;