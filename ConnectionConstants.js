// MongoDB Cluster Username: brianfeddes
// MongoDB Cluster Password: NetflixPassword


const uri = "mongodb+srv://brianfeddes:NetflixPassword@netflixdatabase.m4ijrna.mongodb.net/MediaDatabase?retryWrites=true&w=majority"		

const databaseName = "NetflixDatabase"
const allMediaCollectionName = "AllMediaCollection"
const amazonCollectionName = "AmazonCollection"
const disneyCollectionName = "DisneyCollection"
const huluCollectionName = "HuluCollection"
const netflixCollectionName = "NetflixCollection"

module.exports = { uri, databaseName, allMediaCollectionName, amazonCollectionName, disneyCollectionName, huluCollectionName, netflixCollectionName };
