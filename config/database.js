const mysql = require("mysql2")
const {dbHost, dbName, dbPort, dbUser, dbPassword} = require(".")

const connection = mysql.createConnection({
    host:dbHost,
    port:dbPort,
    user:dbUser,
    password:dbPassword,
    database:dbName
})

function query(sql, data){
    return new Promise((resolve, reject) =>{
        connection.query(sql, data, (error, result)=>{
            if(error){
                console.log(error)
                if(error.errno === 1062){
                    //split permite dividir los caracteres, divido el string, divido con comillas
                    const errorData = error.sqlMessage.split("'")
                    const value = errorData[1]
                    //se divide lo de la posicion 3 por punto, de la posicion 1 de esa separacion de ., 
                    //se divide en _ y se toma lo que esta en la posicion 0
                    const field = errorData[3].split(".")[1].split("_")[0]

                    const message = `The ${field} "${value}" is already in use.`
                    reject(message)
                }
                reject(error.sqlMessage)
            }else{
                resolve(result)
            }
        })
    })
}

async function edit(user, id){
    try{
        await query (`UPDATE users SET ? WHERE id=?`, [user,id])
        return {user, success: true}
    }catch(error){
        return {error, success: false}
    }
}

async function insert(tableName, data){
    try{
        const result = await query (`INSERT INTO ${tableName}(??) VALUES(?)`, [Object.keys(data), Object.values(data)])
        //devuelve el id
        return {success:true, id: result.insertId}
    }catch(error){
        return {error, success: false}
    }
}

async function remove(tableName, data){
   try{
       await query (`DELETE FROM ${tableName} WHERE id=?`, [data])
       return {data, success: true}
   }catch(error){
       return {error, success: false}
   }
}

module.exports = {query, insert, remove, edit}