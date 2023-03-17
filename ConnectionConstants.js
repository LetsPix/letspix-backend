// MongoDB Cluster Username: brianfeddes
// MongoDB Cluster Password: NetflixPassword

const uri = "mongodb+srv://brianfeddes:NetflixPassword@netflixdatabase.m4ijrna.mongodb.net/?retryWrites=true&w=majority"	
// Example uri:
// const uri = "mongodb+srv://testMongoDBUserName:8L4kkR8KszHZTI7S@cluster0.fei8p8f.mongodb.net/?retryWrites=true&w=majority"	

const databaseName = "NetflixDatabase"
const collectionName = "NetflixCollection"

module.exports = { uri, databaseName, collectionName };
