# mixNebula
<a href=https://aa-soundcloud-project-2022.herokuapp.com/> Live Link </a>

## Setup
To start the app up after cloning it from https://github.com/AlanDeleon88/SoundCloud.git, you need to install the dependencies first. Go into the project_src/backend
and run `npm install` in the console, then go to project_src/frontend and  run `npm install`.

The next step is to setup all the environment variables in the backend. 
1. Create a .env file in project_src/backend make sure to follow the .envexample in the folder.
2. Setup the sequelize database by running
  - `dotenv npx sequelize db:migrate`
  - `dotenv npx sequelize db:seed:all`
3. In the console, run `npm start` to start the backend server.
4. Change to the project_src/frontend folder and run `npm start` to start the react application.

## About mixNebula
This application features the use of React/Redux libraries for the frontend, and the backend is built off of express.js and postgressSQL. This SoundCloud clone allows a
user to browse the sites songs and albums, and create an account and post mock songs and albums. A user also has the ability to edit their posts. All posts and edits are
validated by the backend server to ensure only valid data is passed in.

![splash](https://user-images.githubusercontent.com/92609467/189494259-80d865ab-dfb9-4bbf-9eb1-34e5c365fec0.png)

## Splash page
The splash page has a simple layout which allow users to either login or signup. It shows an upload song option, but a user will be asked to login or signup 
if they want to post any songs or albums. Below the navigation bar, is a list of the sites currently featured songs. When a user clicks on them they will be
redirected to a page with the info of the clicked song along with its album. When the song is click, the redux store makes a thunk action to grab data from the
backend and put it in its stores to then be rendered by react.
When a user signs in, the page is dynamically rendered to replace the login and sign up buttons with a profile button.

## Uploading songs and albums
### Uploading an album
In order for a user to upload a mock song or album, they can either click the 'Upload Songs and Albums' button on the splash page, or they can click on their profile button
and hit 'My Albums' to start uploading. The user will be redirected to their albums page. To add a new album simply click the '+' button to add an album.
![uploading an album](https://user-images.githubusercontent.com/92609467/189494656-ea15b040-6f47-4e1f-aee1-d8ee97787e5a.png)
A window will pop and ask the user for the details of the album. Once the form is filled and submitted, the application will send the data to the backend for validation
and if the data checks out, the backend server and redux stores will be updated with the new data.

![add_album_modal](https://user-images.githubusercontent.com/92609467/189494965-101a0ca9-1d47-4931-a435-345eeea9ebad.png)


### Uploading a song
To upload a song, the user will navigate to their albums page by clicking on the `My Albums` button in the profile drop down menu. Once in their album list,
the user can click on an album they want to add a song to. Once on the album page, they can click on the '+' button to add a song. Just like uploading an album,
when the form is submitted, the data wil be validated by the backend. Once validated, the stores and backend server will be updated with the new data.

## Editing and Deleting albums/songs
If an album or song belongs to the user that is currently logged in, they have the ability to either edit or delete their album/song.
This SoundCloud clone uses react and its ability for conditional rendering to prevent edit and delete buttons to appear if the user does not have permission.
In addition to the conditional rendering, the backend also adds the extra layer of protection by validating whether the song or album belongs to the current user, and 
will reject any changes if the data does not belong to the user.

current user's Album:

![image](https://user-images.githubusercontent.com/92609467/189495072-2c51cf29-f504-48fc-8207-dc0f5c0df013.png)

another user's Album:

![image](https://user-images.githubusercontent.com/92609467/189495113-21c7c401-5405-4f47-8d1f-e1a5d044e676.png)

## What I've Learned
Although this application still needs a lot of work, I feel like I have gained a lot of experience on what app development feels like. I learned that 
developing is a long term endeavor that requires a lot of planning and revision. It was very satisfying seeing all the skills we have been building up till now
come together. I definitely know that I still have a long way to go as a developer, but taking this first step means a lot to me. I will definitly come back to this
after I've leveled up my css skills to give it more refined album/songs list and give the site more functionality like adding / viewing comments for songs.




