/**
 * @class DB the database
 * @description this is the interface between the IndexDB library and the application
 */

class DB{

    constructor(){
        this._db = null;
        this.init();
    }

    /**
     * @description this function intialise the databse oject 
     */
    init(){
        this._db = idb.open("currenco", 1, (upgradeDB) => {
            upgradeDB.createObjectStore("keyval");
        })
    }

    /**
     * @description the API that let us communicate easily with the database
     */
    interface(){
        this.init();
        let self = this;
        return {
            // get a speficific key from the database
            get(key){
                return self._db.then((db) =>{
                    return db.transaction("keyval").objectStore("keyval").get(key);
                })
            },
            // set a specific key to the database
            set(key, val){
                return self._db.then((db)=>{
                    const tx = db.transaction("keyval", "readwrite");
                    tx.objectStore("keyval").put(val, key);
                    return tx.complete;
                })
            },
            // delete an element 
            delete(key){
                return self._db.then((db) =>{
                    const tx  = db.transaction("keyval", "readwrite");
                    tx.objectStore("keyval").delete(key);
                    return tx.complete;
                })
            },
            // clear the database
            clear(){
                return self._db.then((db) =>{
                    const tx = db.transaction("keyval", "readwrite");
                    tx.objectStore("keyval").clear();
                    return tx.complete;
                })
            },
            // gets store keys
            keys(){
                return self._db.then((db)=>{
                    const tx = db.transaction("keyval");
                    const keys = [];
                    const store = tx.objectStore("keyval");
                    (store.iterateKeyCursor || cursor.iterateCursor).call(store, cursor =>{
                        if(!cursor) return;
                        keys.push(cursor.key);
                        cursor.continue();
                    });
                    return tx.complete.then(()=>keys);  
                })
            }
        }
    }

    static localStorage(){
        return {
            set(key, value){
               return window.localStorage.setItem(key, JSON.stringify(value));
            },
            get(key){
                return JSON.parse(window.localStorage.getItem(key));
            }
        }
    }
}