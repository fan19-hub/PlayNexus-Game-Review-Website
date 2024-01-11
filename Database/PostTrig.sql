CREATE TRIGGER HistoryTrig
AFTER INSERT ON posts
FOR EACH ROW
BEGIN
   SET @count_post=(select count(PostID) from viewedgames where UserID=new.UserID);
   IF @count_post>=5 THEN
      UPDATE users
      SET active_user=1
      WHERE UserID=new.UserID;
   END IF;
END;