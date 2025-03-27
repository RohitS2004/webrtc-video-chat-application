# Live video and chatting application
- This is a simple React application to demostrate live video calling and live messaging with the help of WebRTC protocol and associated APIs.

# Why use WebRTC?
- Although there are ways to do live video streaming e.g. we can use WebSockets to transfer the MediaStream from one peer to another peer, but it comes with a disadvantage which is higher latency and dependency on the server for transferring the MediaStream. But in the case of WebRTC there is no need for a server to transmit the MediaStream from one peer to another instead the MediaStream will be transmitted directly without middle men.

# How to run the application?
- Clone the repository in your local computer
- Make sure you have Nodejs installed in your computer
- There are two seperate folders: frontend and backend
- Go in the frontend folder
- Run bun install or npm install
- After all the dependencies are added successfully then run bun run dev or npm run dev
- Now go to the backend folder
- Make sure you have typescript installed in your computer globally
- Run the command npm install
- After all the dependencies are added successfully, execute the command npm run dev

# What does the Application offer?
- Be able to live video call with other person
- Send real time messages to the person

