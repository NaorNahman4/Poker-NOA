const serverIP = process.env.REACT_APP_SERVER_IP;
const serverPort = process.env.REACT_APP_SERVER_PORT;
// export async function post , that remove the player from the table and revmove the player from players array in the table, 
export async function leaveTable(tableName, nickname) {
    const data = { "name" : tableName ,"nickname" : nickname};
    const res = await fetch(`http://${serverIP}:${serverPort}/tables/leaveTable`, {
      'method' : 'post',
      "headers" : {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(data)
    });
    // the server return only the status
    return await res.status;
}
// export async func 'get' to get the array of players on the table
export async function getPlayersOnTable(tableName) {
    const res = await fetch(`http://${serverIP}:${serverPort}/tables/getPlayersOnTable/` +tableName, {
      'method' : 'get',
      "headers" : {
        'Content-Type': 'application/json',
      },
    });
    let players = await res.json();
    return players;
}

