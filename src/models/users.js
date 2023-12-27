import instance from '../instance.js';

const {table} = instance.defined;
const {helper, knex} = instance;


/**
 * @typedef {Object} User
 * @property {number} userId
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} phoneNumber
 * @property {string} refreshToken
 * @property {number} role
 * @property {number} status
 * @property {string} role
 */

class Users {
    constructor(user) {
        if(user.userId) {
            this.userId = user.userId;
        }

        if(user.email) {
            this.email = user.email;
        }

        if(user.username) {
            this.username = user.username;
        }

        if(user.password) {
            this.password = user.password;
        }

        if(user.firstName) {
            this.firstName = user.firstName;
        }

        if(user.lastName) {
            this.lastName = user.lastName;
        }

        if(user.phoneNumber) {
            this.phoneNumber = user.phoneNumber;
        }

        if(user.refreshToken) {
            this.refreshToken = user.refreshToken;
        }

        if(user.role) {
            this.role = user.role;
        }

        if(user.status) {
            this.status = user.status;
        }
    }

    set(dataUpdate) {
        const exclude = ['userId'];
        helper.set(dataUpdate, this, exclude);
    }

    create() {
        const returnColumn = ['userId'];
        return knex(table.users).returning(returnColumn).insert(this);
    }

    
    async get() {
        let sql = knex(table.users);

        if(this.userId) {
            sql.where('userId', this.userId);
        }

        if(this.email) {
            sql.where('email', this.email);
        }

        if(this.username) {
            sql.where('username', this.username);
        }

        return await sql;
    }

    
    async exists() {
        let sql = knex(table.users);

        if(this.userId) {
            sql.where('userId', this.userId);
        }

        if(this.email) {
            sql.where('email', this.email);
        }

        if(this.username) {
            sql.orWhere('username', this.username);
        }

        const result = await sql;
        if(result && result.length > 0) {
            return true;
        }

        return false;
    }

    save(payload) {
        payload.updatedAt = helper.defaultNow();
        return knex(table.users).where('userId', this.userId).update(payload);
    }
}

export default Users;
