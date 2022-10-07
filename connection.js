class Connection{
    static set(db) {
        Connection._db = db;
    }

    static get db(){
        return Connection._db;
    }
}

export {Connection};