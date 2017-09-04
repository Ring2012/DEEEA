'use strict';

export default {
    port: 8306,//项目端口
    // dev环境
    db: {
        type: 'mysql',
        log_sql: true,
        log_connect: true,
        insecureAuth: true,
        adapter: {
            mysql: {
                host: 'qdm11245558.my3w.com',
                port: '3306',
                database: 'qdm11245558_db',
                user: 'qdm11245558',
                password: '13522786742',
                prefix: '',
                encoding: 'utf8'
            }
        }
    }

};