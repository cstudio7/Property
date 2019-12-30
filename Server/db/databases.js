// /* eslint-disable no-console */
// /* eslint-disable no-tabs */
import pool from '../config/pool';

const createProperty = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS property (
            id integer not null,
            owner int not null,
            status text not null,
            title text,
            description text,
            price numeric not null,
            purpose text,
            state text not null,
            city text not null,
            address text not null,
            type text not null,
            created_on text not null,
            image_url text not null,
            "owner_email" text not null,
            "owner_phone_number" text not null)`;

    pool.query(queryText)
        .then((res) => {
        })
        .catch((err) => {
            console.log(err);
        });
};
const createUsers = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS users (
			id bigserial not null,
			email text not null primary key,
			first_name text not null,
			last_name text not null,
			password text not null,
			"phone_number" text not null,
			state text,
			city text,
			address text not null,
			is_admin boolean not null)`;

    pool.query(queryText)
        .then((res) => {
        })
        .catch((err) => {
            console.log(err);
        });
};

const createFlags = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS flags (
            id bigserial not null,
            property_id int not null,
            created_on date not null,
            reason text not null,
            description text not null)`;

    pool.query(queryText)
        .then((res) => {
        })
        .catch((err) => {
            console.log(err);
        });
};


module.exports = {
    createFlags,
    createProperty,
    createUsers,
    // 

};
