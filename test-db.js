const { Client } = require('pg');

const connectionString = "postgresql://postgres.gkyybhphauhwedcudeyt:Cuyes98435341@aws-0-us-west-2.pooler.supabase.com:5432/postgres";

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()
    .then(() => {
        console.log('SUCCESS: Connected successfully!');
        client.end();
    })
    .catch(err => {
        console.error('ERROR: Connection failed!');
        console.error('Code:', err.code);
        console.error('Message:', err.message);
        process.exit(1);
    });
