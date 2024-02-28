To build a CRUD (Create, Read, Update, Delete) app using React, Node.js, Express, and MySQL, follow these steps:
#1. Set up MySQL Database
To create a new database in MySQL for your movie review web app, you can follow these steps:

1. Open a command-line interface or a MySQL client (such as MySQL Workbench or phpMyAdmin) and connect to your MySQL server.

2. Once connected, you can execute the following SQL command to create a new database:

```sql
CREATE DATABASE NexusData;
```

3. After executing the command, you can verify that the database has been created by running the following command:

```sql
SHOW DATABASES;
```
4. 改密码 （原因请见 https://blog.csdn.net/kkkloveyou/article/details/91623834）
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ladys';
```
5. 插入示例数据
```sql
ALTER TABLE records MODIFY COLUMN id INT auto_increment;
INSERT INTO games
VALUES (1,"Minecraft","A sandbox game that allows players to build and explore virtual worlds "),(2,"Fortnite","A popular battle royale game where players fight to be the last person standing "),(3,"Grand Theft Auto V","An open-world action-adventure game that allows players to explore a fictional city and engage in various criminal activities."),(4,"The Legend of Zelda: Breath of the Wild","An action-adventure game set in an open world, where players control Link as he sets out to rescue Princess Zelda."),(5,"Overwatch","A team-based first-person shooter game where players work together to achieve objectives."),(6,"Call of Duty: Modern Warfare","A first-person shooter game that offers a realistic and immersive experience in modern warfare scenarios."),(7,"Super Mario Odyssey","A platform game featuring Mario as he embarks on a globe-trotting adventure to rescue Princess Peach."),(8,"FIFA 20","A soccer simulation game that allows players to control their favorite teams and compete in various tournaments."),(9,"The Witcher 3: Wild Hunt","An action role-playing game set in a vast open world, where players take on the role of Geralt of Rivia, a monster hunter."),(10,"League of Legends","A multiplayer online battle arena game where players control a champion and compete against other teams."),(11,"Pokemon Sword and Shield","Role-playing games where players embark on an adventure to become the champion of the Galar region."),(12,"Assassin's Creed Odyssey","An action role-playing game set in ancient Greece, where players control a mercenary and engage in various missions."),(13,"Red Dead Redemption 2","An open-world western action-adventure game set in the late 1800s, with players taking on the role of a outlaw."),(14,"Counter-Strike: Global Offensive","A multiplayer first-person shooter game where players compete in teams to complete objectives or eliminate opponents."),(15,"World of Warcraft","A massively multiplayer online role-playing game set in the fantasy world of Azeroth, with players completing quests and battling monsters."),(16,"Minecraft: Dungeons","A dungeon-crawling action-adventure game set in the Minecraft universe, with players battling through various levels."),(17,"Fortnite: Battle Royale","The battle royale mode of Fortnite, where players fight to be the last person or team standing."),(18,"Apex Legends","A free-to-play battle royale game where players team up to compete against other squads in a futuristic setting."),(19,"Super Smash Bros. Ultimate","A fighting game featuring characters from various Nintendo franchises, where players battle to knock opponents off the stage."),(20,"Animal Crossing: New Horizons","A life simulation game where players create their own island paradise and interact with anthropomorphic animal characters.")
```

#2. Set up the project:

- Create a new directory for your project.
- Open a terminal and navigate to the project directory.
- Initialize a new Node.js project by running the command: ``` npm init -y ```.
- Install the required dependencies by running the command:
```cmd
npm install express mysql2 body-parser sequelize cors
npm install nodemon --save-dev
npm install axios
npm install bootstrap
npm install react-bootstrap
npm install @fortawesome/react-fontawesome
npm install @fortawesome/free-solid-svg-icons
npm install react-router-dom
npm install react-router-player
npm install @mui/material @emotion/react @emotion/styled
npm install react-material-ui-carousel
npm install react-dropdown
```


#3. Set up the backend:
- Createa new folder called **NexusServer** and navigate to it.
- Create a new file named server.js in the project directory.
- Import the required modules at the top of the file:
```javascript

```
- Run this file with JavaScript Debugger plugin in VScode, then you can check the posted data on "http://localhost:5000/api/records"

#4. Set up the frontend:
   - Initialize a new React app by running the command: `npx create-react-app nexusapp.`.
   - Nevigate to the **nexusapp** folder
   - Run the following commands to install the dependencies
   ```cmd
   npm install axios
   npm install 
   ```
   - Open the `src/App.js` file and replace its contents with the following code:
     ```javascript
    import React from 'react'; 
    import { useState, useEffect } from 'react'         //This imports the useState and useEffect hooks from the React library.
    import axios from 'axios'

    const api=axios.create({
      baseURL:'http://localhost:5000/'});

    function App() {
      //const [state, setSate] =  useState(initial_value)
      //state is used to hold the values. like the variable
      //setState is a function to set the values of state
      const [records, setRecords] = useState([]);
      const [name, setName] = useState('');
      const [description, setDescription] = useState('');

      //Execute automatically when app starts
      useEffect(() => {
        fetchRecords();
      }, []);

      //Define CRUD functions
      const fetchRecords = async () => {
        const response = await api.get('/api/records');
        setRecords(response.data);
      };

      const createRecord = async () => {
        await api.post('/api/records', { name, description });
        fetchRecords(); //update records to the newest when the databse is changed
        setName('');    //empty the Name and Description
        setDescription('');
      };

      const updateRecord = async (id) => {
        await api.put(`/api/records/${id}`, { name, description });
        fetchRecords();
        setName('');
        setDescription('');
      };

      const deleteRecord = async (id) => {
        await api.delete(`/api/records/${id}`);
        fetchRecords();
      };

      //JSX for UI design
      return (
        <div>
          <h1>Nexus</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="Description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={createRecord}>Create</button>
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                {record.name} - {record.description}
                <button onClick={() => updateRecord(record.id)}>Update</button>
                <button onClick={() => deleteRecord(record.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default App;
     ```

4. Run the app:
   - Open a new terminal and navigate to the project directory.
   - Start the backend server by running the command: `npm run dev`.
   - Open another terminal and navigate to the `client` directory.
   - Start the frontend development server by running the command: `npm start`.
   - Access the app in your browser at `http://localhost:3000`.

With these steps, you have created a basic CRUD app using React, Node.js, Express, and MySQL. You can create, read, update, and delete records from the MySQL database through the frontend interface.



5. index.js

```javascript

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



```