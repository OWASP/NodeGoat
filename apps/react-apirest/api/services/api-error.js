class ApiError extends Error {
    /**
     * 
     * @param {string} message 
     * @param {number} status 
     */
    constructor(message, status) {
        super(message);
        this.status = status;
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
        }
    }
}

module.exports = ApiError;
